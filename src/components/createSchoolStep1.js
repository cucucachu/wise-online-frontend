import React, { Component, Fragment } from 'react'
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";

class SchoolStep1 extends Component {
  render(){
      return(
        <Fragment>
            <h1>Create Your Shool</h1>

            <form>
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">School name</span>
                    <input type="text" className="" id="basic-url" aria-describedby="basic-addon3" />
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">School key&nbsp;&nbsp;</span>
                    <input type="text" className="" />
                </div>
 
                <div className="spacer-vertical"></div>
                <div className="">
                <Link to="/create-school/step2"><button className="btn">Next</button></Link>
                </div>
            </form>
        </Fragment>
      )
  }
}

export default SchoolStep1;