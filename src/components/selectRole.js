import React, {Component, useContext } from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext'

import loginIcon from '../Assets/images/login-icon.png';

// class SelectRole extends Component {
//   render(){
//       return(
//         <div className="container">
//             <img src={loginIcon} className="page-icon" alt="login icon"/>
//             <div className="spacer-vertical"></div>
//             <h1>Select your role</h1>
//             <div className="spacer-vertical"></div>
//            <div className="row">
//                <div className="col-sm-4">
//                    <div className="just-margin">
//                     <Link to="admin-login"><h2>Admin</h2></Link>
//                    </div>
//                </div>
//                <div className="col-sm-4">
//                    <div className="just-margin">
//                     <Link to="professor-login"><h2>Professor</h2></Link>
//                    </div>
//                </div>
//                <div className="col-sm-4">
//                    <div className="just-margin">
//                     <Link to="/student-login"><h2>Student</h2></Link>
//                    </div>
//                </div>
//            </div>
//     </div>
//       )
//   }
// }

// export default SelectRole;



const SelectRole = () => {
    // const { schoolName, schoolID } = useContext(AuthContext);
    return (
        <div className="container">
                <img src={loginIcon} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical"></div>
                <h1>Select your role</h1>
                <div className="spacer-vertical"></div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="just-margin">
                        <Link to="admin-login"><h2>Admin</h2></Link>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="just-margin">
                        <Link to="professor-login"><h2>Professor</h2></Link>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="just-margin">
                        <Link to="/student-login"><h2>Student</h2></Link>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  export default SelectRole;
