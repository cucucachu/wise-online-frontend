import React, {Component} from 'react';
import { Link } from "react-router-dom";

import studentDashIcon from '../Assets/images/student-dash-icon.png';
import tickIcon from '../Assets/images/tick-icon-white.svg'
import editIcon from '../Assets/images/edit-icon-white.svg'

import { i18n } from 'web-translate';

// import { AuthContext } from '../contexts/AuthContext'

class StudentDashboard extends Component {
    // static contextType = AuthContext
  
    // componentDidMount() {
    //     this.timer = setInterval(
    //         () => this.checkCookie(),
    //         300000
    //     );
    //     }
    // componentWillUnmount() {
    //     clearInterval(this.timer);
    //     }
    // checkCookie(){
    //     const { cookies } = this.context
        
    //     if(cookies === undefined){
    //         this.props.history.push('/student-login')
    //     }else{return}
    // }
  render(){
      return(
        <div className="container prevent-text">
            <img src={studentDashIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical" />
            <h1>{i18n("Are you going to a class, or taking a test?")}</h1>
            <form>
                <div className="spacer-vertical" />
                <Link to="/student/class/attend">
                    <button className="btn">
                        <img src={tickIcon} alt="attend class icon" className="icon-sm" />&nbsp;{i18n("Attend class")}
                    </button>
                </Link>
                
                <div className="spacer-vertical" />
                <Link to="/student/tests">
                    <button className="btn">
                        <img src={editIcon} alt="take a test icon" className="icon-sm" />&nbsp;{i18n("Take a test")}
                    </button>
                </Link>

                <div className="spacer-vertical" />
                <Link to="/student/demo/proctor">
                    <button className="btn">
                        <img src={editIcon} alt="take a test icon" className="icon-sm" />&nbsp;{i18n("Take a demo test")}
                    </button>
                </Link>
                
            </form>
    </div>
      )
  }
}

export default StudentDashboard;


