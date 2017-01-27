import React, { Component } from 'react'
import './calendar.scss'

var date = new Date()

class Calendar extends Component {
  constructor() {
    super()
    this.state = {
        year: date.getFullYear(),
        month: date.getMonth(),
        selectedYear: date.getFullYear(),
        selectedMonth: date.getMonth(),
        selectedDate: date.getDate(),
        selectedDt: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        startDay: 1,
        weekNumbers: false,
        minDate:  null,
        disablePast: true,
        dayNames: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        dayNamesFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthNamesFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        firstOfMonth: null,
        daysInMonth: null,
        count: 0
      }


    this.calc = this.calc.bind(this)
    this.getPrev = this.getPrev.bind(this)
    this.getNext = this.getNext.bind(this)
    this.selectDate = this.selectDate.bind(this)
    this.displayCalendar = this.displayCalendar.bind(this)
    this.editDataField    = this.editDataField.bind(this)
  }

  calc(year, month) {
    if (this.state.selectedElement) {
        if (this.state.selectedMonth != month || this.state.selectedYear != year) {
            this.state.selectedElement.classList.remove('r-selected')
        } else {
            this.state.selectedElement.classList.add('r-selected')
        }
    }
    return {
        firstOfMonth: new Date(year, month, 1),
        daysInMonth: new Date(year, month + 1, 0).getDate()
    }
  }

  componentWillMount() {
      this.setState(this.calc.call(null, this.state.year, this.state.month))
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.onSelect && prevState.selectedDt != this.state.selectedDt) {
        this.props.onSelect.call(this.getDOMNode(), this.state)
    }
  }
  getPrev() {
      var state = {}
      if (this.state.month > 0) {
          state.month = this.state.month - 1
          state.year = this.state.year
      } else {
          state.month = 11
          state.year = this.state.year - 1
      }
      Object.assign(state, this.calc.call(null, state.year, state.month))
      this.setState(state)
  }
  getNext() {
      var state = {}
      if (this.state.month < 11) {
          state.month = this.state.month + 1
          state.year = this.state.year
      } else {
          state.month = 0
          state.year = this.state.year + 1
      }
      Object.assign(state, this.calc.call(null, state.year, state.month))
      this.setState(state)
  }
  selectDate(year, month, date, element) {
      if (this.state.selectedElement) {
          this.state.selectedElement.classList.remove('r-selected')
      }
      this.setState({count: 0})
      element.target.classList.add('r-selected')
      this.setState({
          selectedYear: year,
          selectedMonth: month,
          selectedDate: date,
          selectedDt: new Date(year, month, date),
          selectedElement: element.target,
      })
      this.refs.calendar.style.display = 'none'
  }

  displayCalendar(e) {
      if (this.state.count == 1) {
        this.refs.calendar.style.display = 'none'
        this.setState({count: 0})
      }
      else {
        this.refs.calendar.style.display = 'block'
        this.setState({count: 1})
      }

  }
  editDataField(e) {
    this.setState({currentDate: e.target.value})
  }





  render() {

    return(
      <div className="schedule__time--date">
      <input
        value={this.state.monthNames[this.state.selectedMonth] + ' ' + this.state.selectedDate}
        className='date'
        id='currentDate'
        onBlur={this.props.changeStyle}
        onFocus={this.props.changeStyle}
        onChange={this.editDataField}
        onClick={this.displayCalendar}
        readOnly="readonly"
      />
        <p>{this.state.dayNamesFull[this.state.selectedDt.getDay()]}</p>
        <div className="calendar" id="calendar" ref="calendar">
          <div className="r-calendar" >
              <div className="r-inner">
                  <Header monthNames={this.state.monthNamesFull} month={this.state.month} year={this.state.year} onPrev={this.getPrev} onNext={this.getNext} />
                  <WeekDays dayNames={this.state.dayNames} startDay={this.state.startDay} weekNumbers={this.state.weekNumbers} />
                  <MonthDates month={this.state.month} year={this.state.year} daysInMonth={this.state.daysInMonth} firstOfMonth={this.state.firstOfMonth} startDay={this.state.startDay} onSelect={this.selectDate} weekNumbers={this.state.weekNumbers} disablePast={this.state.disablePast} minDate={this.state.minDate} />
              </div>
          </div>
        </div>
      </div>
    )
  }
}





const Header = (props) => (
  <div className="r-row r-head">
      <div className="r-cell r-prev" onClick={props.onPrev.bind(this)} role="button" tabIndex="0"></div>
      <div className="r-cell r-title">{props.monthNames[props.month]}&nbsp;{props.year}</div>
      <div className="r-cell r-next" onClick={props.onNext.bind(this)} role="button" tabIndex="0"></div>
  </div>
)

const WeekDays = (props) => {
  let haystack = Array.apply(null, {length: 7}).map(Number.call, Number)
  return (
    <div className="r-row r-weekdays">
        {(() => {
            if (props.weekNumbers) {
                return (
                    <div className="r-cell r-weeknum">wn</div>
                )
            }
        })()}
        {haystack.map(function (item, i) {
            return (
                <div className="r-cell">{props.dayNames[(props.startDay + i) % 7]}</div>
            )
        })}
    </div>
  )
}




var MonthDates = React.createClass({
    statics: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate(),
        today: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    },
    render: function () {
        var haystack, day, d, current, onClick,
            isDate, className,
            weekStack = Array.apply(null, {length: 7}).map(Number.call, Number),
            that = this,
            startDay = this.props.firstOfMonth.getUTCDay(),
            first = this.props.firstOfMonth.getDay(),
            janOne = new Date(that.props.year, 0, 1),
            rows = 5;

        if ((startDay == 5 && this.props.daysInMonth == 31) || (startDay == 6 && this.props.daysInMonth > 29)) {
            rows = 6;
        }

        className = rows === 6 ? 'r-dates' : 'r-dates r-fix'
        haystack = Array.apply(null, {length: rows}).map(Number.call, Number)
        day = this.props.startDay + 1 - first
        while (day > 1) {
            day -= 7
        }
        day -= 1
        return (
            <div className={className}>
            {haystack.map(function (item, i) {
                d = day + i * 7;
                return (
                    <div className="r-row">
                    {(() => {
                        if (that.props.weekNumbers) {
                            var wn = Math.ceil((((new Date(that.props.year, that.props.month, d) - janOne) / 86400000) + janOne.getDay() + 1) / 7);
                            return (
                                <div className="r-cell r-weeknum">{wn}</div>
                            )
                        }
                    })()}
                    {weekStack.map(function (item, i) {
                        d += 1;
                        isDate = d > 0 && d <= that.props.daysInMonth

                        if (isDate) {
                            current = new Date(that.props.year, that.props.month, d)
                            className = current != that.constructor.today ? 'r-cell r-date' : 'r-cell r-date r-today'
                            if (that.props.disablePast && current < that.constructor.today) {
                                className += ' r-past'
                            } else if (that.props.minDate !== null && current < that.props.minDate) {
                                className += ' r-past'
                            }

                            if (/r-past/.test(className)) {
                                return (
                                    <div className={className} role="button" tabIndex="0">{d}</div>
                                )
                            }

                            return (
                                <div className={className} role="button" tabIndex="0" onClick={that.props.onSelect.bind(that, that.props.year, that.props.month, d)}>{d}</div>
                            )
                        }

                        return (
                            <div className="r-cell"></div>
                        )
                    })}
                    </div>
                )
            })}
            </div>
        )
    }
})

export default Calendar
