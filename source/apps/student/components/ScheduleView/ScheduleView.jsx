import React, {Component}  from 'react'
import FontAwesome from 'react-fontawesome'
import Calendar from './Calendar/Calendar'



export default class ScheduleView extends Component {
      constructor() {
        super()

        this.state = {
          hour: new Date().getHours(),
          minutes: new Date().getMinutes(),
          timeRange: '',
          todayMonth: new Date().getMonth(),
          todayDate: new Date().getDate(),
          timeFrom: '',
          timeTo: '',
          monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

        }
        this.gotoNewPage = this.gotoNewPage.bind(this)
        this.editDataField = this.editDataField.bind(this)
        this.changeStyle   = this.changeStyle.bind(this)
        this.getTime       = this.getTime.bind(this)
        this.timePoint     = this.timePoint.bind(this)
        this.setNewTime    = this.setNewTime.bind(this)
        this.timeTo        = this.timeTo.bind(this)
        this.countRange    = this.countRange.bind(this)
        this.scheduleLesson= this.scheduleLesson.bind(this)

      }

      componentDidMount() {
        this.timePoint()
      }

      gotoNewPage() {
          window.location = '#student'
      }

      changeStyle(e) {
        if (e.type == 'focus') {
          console.log('lol')
          if (e.target.className == 'time') {
            setTimeout(() => {return this.refs.time.style.display = 'block'}, 200)
            if (e.target.id == 'from') {
              this.refs.time.style.right = '30.5%'
              this.refs.time.id = 'from_list'
              this.setState({timeRange: this.getTime(this.state.hour, this.state.minutes, 95)})


            } else {
              this.refs.time.style.right = '10.5%'
              this.refs.time.id = 'to_list'
              this.setState({timeRange: this.getTime(this.state.hour+1, this.state.minutes, 95)})

            }
          }
          e.target.className += ' changing'

        } else {
          setTimeout(() => {return this.refs.time.style.display = 'none'}, 200)
          e.target.className = e.target.className.split(' ')[0]

        }
      }

      getTime(hour, minutes, range=4) {
        let time = []
        let basenumber = 0
        if (document.getElementById('currentDate') != null) {
          if (document.getElementById('currentDate').value === this.state.monthNames[this.state.todayMonth] + ' ' + this.state.todayDate) {
            let numbers = [0, 15, 30, 45]
            for (let i in numbers) {
              if (minutes === numbers[i]) {
                basenumber = numbers[i]
                break
              } else if (minutes < numbers[i]) {
                basenumber = numbers[i]
                break
              } else if (minutes > numbers[i] && i == 3) {
                basenumber = 0
                if (hour == 23) {
                  hour = 0
                } else {
                  hour++
                }
                break
              }
              if (basenumber == 0) {
                range = (24 - hour) * 4
                console.log(range)
              } else {
                range = (24 - hour) * (4 - basenumber/15)

              }
            }
          } else {
            hour = 0
            minutes = 0
            range = 95
          }
        }


        for (let i = 0; i <= range; i++) {
          if (basenumber == 0) {
            let numb = hour + ':' + '00'
            time.push({time: numb})
          } else if (hour == 0) {
            let numb = '00' + ':' + basenumber
            time.push({time: numb})
          } else {
            let numb = hour + ':' + basenumber
            time.push({time: numb})
          }

          basenumber+=15
          if (basenumber == 60) {
            basenumber = 0
            hour += 1
            if (hour > 23) {
              hour = 0
            }
          }
        }

      return time
      }
      timePoint() {
        let timeGap = this.getTime(this.state.hour, this.state.minutes, 5)

        this.setState({timeFrom: timeGap[0].time})
        this.setState({timeTo: timeGap[4].time})
      }
      timeTo(from = this.state.timeFrom, to=this.state.timeTo) {
          let timeTo = to.split(':')
          let timeFrom = from.split(':')
          let finishHour = Number(timeTo[0])
          let finishMinute = Number(timeTo[1])
          let startHour = Number(timeFrom[0])
          let startMinute = Number(timeFrom[1])
          console.log(finishHour, startHour, finishMinute, startMinute)
          if (finishHour - startHour <= 1) {
            if (finishMinute - startMinute <= 0 ) {
              this.setState({timeTo: startHour+1 + ':' + timeFrom[1]})
              console.log('lel')
            } else if (startMinute - finishMinute < 0 && finishMinute >= startMinute) {
              if (finishHour == startHour) {
                this.setState({timeTo: startHour+1 + ':' + timeFrom[1]})
              } else if (finishHour - startHour == 1){
                this.setState({timeTo: startHour+1 + ':' + timeTo[1]})
              }

            }
            else {
              this.setState({timeTo: to})
            }
          } else {
            this.setState({timeTo: to})

                    }
      }

      setNewTime(e) {
        if (e.target.parentElement.id == 'from_list') {
          this.timeTo(e.target.innerHTML, this.state.timeTo)
          this.setState({timeFrom: e.target.innerHTML})

        } else {
          this.timeTo(this.state.timeFrom, e.target.innerHTML)

        }
        this.refs.time.style.display = 'none'

      }

      editDataField() {
      }


      scheduleLesson(e) {
          console.log(this.state.student)
          document.getElementById('pop').style.opacity = 0
      }

      countRange() {
        return Number(this.state.timeTo.split(':')[0]) - Number(this.state.timeFrom.split(':')[0])
      }

      render() {

        return (
            <section className="schedule">
                <ul className='countTime' ref="time">{this.state.timeRange ? this.state.timeRange.map((item, key) => {
                  return (<li onClick={this.setNewTime} key={key}>{item.time}</li>)
                }) : null
                }</ul>

                <div className="schedule__title">
                  <p>Schedule lesson</p>

                  <span className="schedule__icon"><FontAwesome name="times"/></span>
                </div>
                <div className="schedule__time">
                  <ul>
                    <li>
                      <div className="schedule__time--clock"><FontAwesome name="clock-o"/></div>
                      <Calendar changeStyle={this.changeStyle} editDataField={this.editDataField}/>
                    </li>
                    <li>
                      <div className="schedule__time--period">

                        <div>
                        <input
                          value={this.state.timeFrom}
                          className='time'
                          id = 'from'
                          onBlur={this.changeStyle}
                          onFocus={this.changeStyle}
                          onChange={this.editDataField}
                          readOnly="readonly"/>
                          <FontAwesome name="arrow-right"/>
                        <input
                          value={this.state.timeTo}
                          className='time'
                          id = 'to'
                          onBlur={this.changeStyle}
                          onFocus={this.changeStyle}
                          onChange={this.editDataField}
                          readOnly="readonly"/>
                        </div>
                        <input value={ this.countRange() == 1 ? this.countRange() + ' hour' : this.countRange() + ' hours'}
                               onChange={this.editDataField}
                               className='period'
                               readOnly="readonly"/>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="schedule__student">
                  <div className="schedule__student--user"><FontAwesome name="user"/></div>
                  {this.state.student && this.state.student.active == 'true' ? <div className="schedule__student--profile"><img className="schedule__student--image" src={this.state.student.image}/>
                  <p>{this.state.student.name}</p> </div> : 'Select Student'}

                  <span onClick={this.gotoNewPage} className='schedule__icon'><FontAwesome name="angle-right"/></span>
                </div>
                <div className="schedule__lesson">
                  <div>
                    <label>
                    <input type="radio" name="lesson-type" id="online"/>
                    <span className="label-text">Online Lesson</span></label>
                  </div>
                  <div>
                  <label>
                  <input type="radio" name="lesson-type" id="offline" />
                  <span className="label-text">Offline Lesson</span></label>
                  </div>
                </div>
                <div className={this.state.student && this.state.student.active ? "form__button active" : "form__button disabled"}>
                  <button onClick={this.scheduleLesson} disabled={!(this.state.student && this.state.student.active)}>Schedule lesson</button>
                </div>

            </section>
        )
    }
}
