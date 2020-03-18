import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route
   } from "react-router-dom";

//components
import AdminLogin from '../components/adminLogin'
import StudentLogin from '../components/studentLogin'
import ProfessorLogin from '../components/professorLogin'
import SchoolLogin from '../components/schoolLogin'
import ProfessorCourse from '../components/professorCourse'
import StudentDashboard from '../components/studentDashboard'
import StudentClass from '../components/studentClass'
import StudentClassAtt from '../components/studentClassAtt'

import SelectRole from '../components/selectRole'
import Nest from '../components/nest'

//pages
import CreateSchoolPage from './CreateSchoolPage'
import SetUpSchoolPage from './SetUpSchoolPage';


class HomePage extends Component {
  render(){
      return(
          <Router>
          <div className="wrap">
              <div className="page-header"></div>
              <Switch>
                    <Route path="/create-school" component={CreateSchoolPage} />
                    <Route path="/set-up-school" component={SetUpSchoolPage} />
                    <Route path="/select-role" component={SelectRole} />
                    <Route path="/admin-login" component={AdminLogin} />
                    <Route path="/professor-login" component={ProfessorLogin} />
                    <Route path="/professor-course" component={ProfessorCourse} />
                    <Route path="/student-login" component={StudentLogin} />
                    <Route path="/student/dashboard" component={StudentDashboard} />
                    <Route path="/student/classes" component={StudentClass} />
                    <Route path="/student/class/attendance" component={StudentClassAtt} />
                    <Route exact path="/" component={SchoolLogin} />   
              </Switch>              
          </div>
          </Router>
      )
  }
}

export default HomePage;