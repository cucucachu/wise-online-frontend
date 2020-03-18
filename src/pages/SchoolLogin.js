import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    IndexRoute,
    Link
   } from "react-router-dom";

//components
import AdminLogin from '../components/adminLogin'

//pages
import CreateSchoolPage from './CreateSchoolPage'
import SetUpSchoolPage from './SetUpSchoolPage';


class SchoolLoginPage extends Component {
  render(){
      return(
          <Router>
          <div className="wrap">
              <div className="page-header"></div>
              <Switch>
                    <Route path="/create-school" component={CreateSchoolPage} />
                    <Route path="/set-up-school" component={SetUpSchoolPage} />
                    <Route exact path="/" component={AdminLogin} />   
              </Switch>              
          </div>
          </Router>
      )
  }
}

export default SchoolLoginPage;