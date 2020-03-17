import React, {Component} from 'react';
import editIcon from '../Assets/images/edit-icon.png';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";

import SchoolStep1 from '../components/createSchoolStep1'
import SchoolStep2 from '../components/createSchoolStep2'


class CreateSchoolPage extends Component {
  render(){
      return(
          <Router >
            <div className="wrap">
                <div className="page-header"></div>
                <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
                    <Switch>
                        <Route path="/create-school/step2" component={SchoolStep2} />
                        <Route path="/create-school" component={SchoolStep1} />
                    </Switch>
                </div>
            </div>
          </Router>
      )
  }
}

export default CreateSchoolPage;