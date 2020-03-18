import React, { Component, Fragment } from 'react'
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";

class SetUpSchool extends Component {
  render(){
      return(
        <Fragment>
            <h1>Set up your shool</h1>
            <p>Information must match the provided template </p>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 box-shadow">

                    </div>
                    <div className="col-sm-6 box-shadow">

                    </div>
                </div>
            </div>

            <form>
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Email</span>
                    <input type="email" className="" id="basic-url" aria-describedby="basic-addon3" />
                </div>
                
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">Confirm Email</span>
                    <input type="password" className="" />
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <div className="input-label">Password</div>
                    <input type="password" className="" />
                </div>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">Confirm Password</span>
                    <input type="password" className="" />
                </div>
                <div className="spacer-vertical"></div>
                <div className="">
                    <Link to='/create-school/step3'><button className="btn">Create</button></Link>
                </div>
            </form>
        </Fragment>
      )
  }
}

export default SetUpSchool;