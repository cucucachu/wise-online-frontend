import React, { Component, Fragment } from 'react'
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";

class SchoolStep2 extends Component {
  render(){
      return(
        <Fragment>
            <h1>Create Your Shool Step2</h1>

            <form>
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="email" className="" id="basic-url" aria-describedby="basic-addon3" />
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Password</span>
                    <input type="password" className="" />
                </div>
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Password</span>
                    <input type="password" className="" />
                </div>
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Password</span>
                    <input type="password" className="" />
                </div>
                <div className="input-wrapper">
                    <div className="input-wrapper-bottom">
                    <Link to="/create-school">Create your school</Link><Link to="/forgot-pw">Forgot Password</Link>
                    </div>
                </div>
                <div className="spacer-vertical"></div>
                <div className="">
                    <button className="btn">Submit button</button>
                </div>
            </form>
        </Fragment>
      )
  }
}

export default SchoolStep2;