import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";
   import editIcon from '../Assets/images/edit-icon.png';


import SchoolStep1 from '../components/createSchoolStep1'
import SchoolStep2 from '../components/createSchoolStep2'
import SetUpSchoolPage from './SetUpSchoolPage'
import HomePage from './HomePage'
import Nest from '../components/nest'


class CreateSchoolPage extends Component {
  render(){
      return(
          <Router >
            <div className="wrap">                
                    <Switch>
                        <Route path="/set-up-school" component={SetUpSchoolPage} />
                        <Route path="/create-school/step2" component={SchoolStep2} />
                        <Route path="/create-school" component={SchoolStep1} />
                    </Switch>
            </div>
          </Router>
      )
  }
}

export default CreateSchoolPage;