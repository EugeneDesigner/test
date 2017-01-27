import React, {Component}  from 'react'
import FontAwesome from 'react-fontawesome'

import studentCollectionService from '../../services/StudentCollectionService'
import studentService           from '../../services/studentService'


function getState() {
  const loading = studentCollectionService.isLoading()
  const data    = studentCollectionService.getCollectionData()
  return {
    data,
    loading
  }
}


export default class StudentView extends Component {
  constructor() {
    super()
    this.state = {
      previousItem: '',
      previousHeader: '',
      student: '',
      email: ''
    }
    this.setState(getState())
    this.addStudent   = this.addStudent.bind(this)
    this.showSubItem  = this.showSubItem.bind(this)
    this.bindEvents   = this.bindEvents.bind(this)
    this.unbindEvents = this.unbindEvents.bind(this)
    this.onChangeCollection = this.onChangeCollection.bind(this)
    this._appendData   = this._appendData.bind(this)
    this.findName    = this.findName.bind(this)
    this.deleteInput = this.deleteInput.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)

  }
  componentDidMount() {
    this.setState({
      previousItem: document.getElementById('create-student'),
      previousHeader: document.querySelectorAll('.create')[0]
    })
    this.bindEvents()
    this._appendData()

  }
  componentWillUnmount() {
       this.unbindEvents()
  }
  bindEvents() {
    studentCollectionService.onChange(this.onChangeCollection)
  }
  unbindEvents() {
     studentCollectionService.offChange(this.onChangeCollection)
  }
  onChangeCollection() {
    this.setState(getState())
  }


  _appendData() {
    studentCollectionService.appendData().then(
      null,
      () => {
        console.log('error')
      }
    )
  }
  showSubItem(e) {
    let item = e.target
    let currentItem = document.getElementById(item.className + '-student')
    if (currentItem != this.state.previousItem) {
      this.state.previousItem.style.display = 'none'
      this.state.previousHeader.style.borderBottom = 'none'
      this.state.previousHeader.style.color = '#6F757B'
      item.style.borderBottom = '2px solid #33B3BE'
      item.style.color= 'black'
      currentItem.style.display = 'block'

      this.setState({
        previousItem: currentItem,
        previousHeader: item
      })
    }

  }

  returnBack() {
    window.location = '/'
  }
  deleteInput(e) {
    if (e.keyCode === 8) {
      this.setState({
        data: this.state.initData || []
      })
    }
  }
  findName(e) {
    let search = e.target.value.toLowerCase()
    if (!this.state.initData) {
      this.setState({
        initData: this.state.data
      })
    }
    let filtered = []
    this.state.data.filter((profile) => {
      if (profile.name.toLowerCase().indexOf(search) !== -1) {
        filtered.push(profile)
      }})
    if (!search) {
      this.setState({data: this.state.initData})
      } else {
        this.setState({data: filtered})
    }
  }

  handleFormChange(e) {
    if (e.target.id === 'student') {
      this.setState({name: e.target.value})
    } else {
      this.setState({email: e.target.value})
    }
  }
  addStudent(e) {
    e.preventDefault()
    let view = this
    studentService.setAttr('name', this.state.name)
    studentService.setAttr('email', this.state.email)
    studentService.save().then(
      () => {
        this._appendData()
      },
      () => {
        console.log('Could not save the input')
      }
    )
  }


  render() {
    return (
        <section>
          <div className="student__navigation">
            <span onClick={this.returnBack}><FontAwesome name="angle-left"/></span>
            <div onClick={this.showSubItem} className='select'>Select Student</div>
            <div onClick={this.showSubItem} className='create'>Add new Student</div>
          </div>

          <article id="select-student">
            <input
              className="select-student__search"
              type="text"
              onChange={this.findName}
              placeholder="&#xF002; Search Students"
              onKeyDown={this.deleteInput}/>
            <ul className="select-student__list">
                {this.state.data && this.state.data.length > 0 ? this.state.data.map((profile) => (
                  <li key={profile.id}>
                    <div className="photo"><img src={profile.image}/></div>
                    <p>{profile.name}</p>
                    <div className="status">{profile.invited ? 'Invited' : profile.hours}</div>
                </li>)) : <li>No students were found</li>}
            </ul>
          </article>



          <article id="create-student">
            <p>On Preply, you can invite new students and schedule lessons with them for free. </p>
            <form onSubmit={this.addStudent}>
              <div className="create-student__input">
                <label htmlFor="student">Student's name <div></div></label>
                <input type="text" value={this.state.name} onChange={this.handleFormChange} name="student" id="student"/>
              </div>
              <p>If you wish for the student to get notified about scheduled lessons and changes, type in their email:</p>
              <div className="create-student__input">
                <label htmlFor="email">Student's email </label>
                <input id="email" value={this.state.email} onChange={this.handleFormChange} type="email" name="email"/>
              </div>
              <div className="create-student__button form__button">
              <button type="submit">Add new student</button>
              </div>
            </form>

          </article>

        </section>
    )
}

}
