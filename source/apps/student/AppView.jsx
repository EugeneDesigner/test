import React, {Component} from 'react'
import './styles.scss'


export default class AppView extends Component {
    constructor() {
      super()
      this.setVisible = this.setVisible.bind(this)


    }


    setVisible(e) {
      document.getElementById('pop').style.opacity = 1
      document.getElementById('pop').className += ' fadeInDownBig'
      document.getElementById('window').style.display = 'block'
    }
    render() {
        const {content} = this.props;
        return (
            <div>
              <div id="window"></div>
                <button name="lesson" className="intro-button" onClick={this.setVisible}>Find Student</button>
                  <div className="pop_new" id="pop">
                    {content}
                  </div>
            </div>
        )
    }
}
