import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
   } from "react-router-dom";

//components
import AdminLogin from '../components/adminLogin'
import StudentLogin from '../components/studentLogin'
import ProfessorLogin from '../components/professorLogin'
// import SchoolLogin from '../components/schoolLogin'
import ProfessorCourse from '../components/professorCourse'
import StudentDashboard from '../components/studentDashboard'
import StudentClass from '../components/studentClass'
import StudentClassAtt from '../components/studentClassAtt'
import AdminDownload from '../components/adminDownload'
import SchoolStep1 from '../components/createSchoolStep1'
import SchoolStep2 from '../components/createSchoolStep2'
import SelectRole from '../components/selectRole'

//pages
import SetUpSchoolPage from '../components/SetUpSchoolPage'
import StudentTest from '../components/studentTest'
import ProfessorClaim from '../components/professorClaim'

//contexts
import { AuthContext } from '../contexts/AuthContext'
import { adminLogin } from '../store/axios';

import Header from '../components/header'


class HomePage extends Component {
static contextType = AuthContext
  render(){
      const { isAuthenticated } = this.context
      return(
          <Router>
            <Header />
            <div className="wrap">
                <div className="page-header"></div>

                <Switch>
                       {/* admin */}
                        <Route path="/set-up-school" component={SetUpSchoolPage} />
                        <Route path="/create-school/step2" component={SchoolStep2} />
                        <Route path="/create-school" component={SchoolStep1} />
                        <Route path="/admin/download" component={AdminDownload} />
                        <Route path="/set-up-school" component={SetUpSchoolPage} />
                        <Route path="/admin-login" component={AdminLogin} />

                        {/* professor */}
                        <Route path="/professor-login" component={ProfessorLogin} />
                        <Route path="/professor/course" component={ProfessorCourse} />
                        <Route path="/professor/claim-account" component={ProfessorClaim} />

                        {/* student */}
                        <Route path="/student-login" component={StudentLogin} />
                        <Route path="/student/dashboard" component={StudentDashboard} />
                        <Route path="/student/classes" component={StudentClass} />
                        <Route path="/student/tests" component={StudentTest} />
                        <Route path="/student/class/attend" component={StudentClassAtt} />

                        {/* landingpage */}
                        <Route exact path='/' component={SelectRole} />
                </Switch>   
            </div>
          </Router>
      )
  }
}

export default HomePage;