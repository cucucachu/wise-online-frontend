import React, {Component} from 'react';
import loginIcon from '../Assets/images/login-icon.png';

class HomePage extends Component {
  render(){
      return(
          <div className="wrap">
              <div className="page-header"></div>
              <div className="container">
                <img src={loginIcon} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical"></div>
                <h1>Administration login</h1>
                <form>
                    <div className="spacer-vertical"></div>
                    {/* <label for="basic-url">Your vanity URL</label> */}
                    <div className="input-wrapper">
                        <span className="input-label">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <input type="text" className="" id="basic-url" aria-describedby="basic-addon3" />
                    </div>
                    
                    <div className="spacer-vertical"></div>
                    <div className="input-wrapper">
                        <span className="input-label">Password</span>
                        <input type="password" className="" />
                    </div>
                    <div className="input-wrapper">
                        <div className="input-wrapper-bottom">
                            <a href="#">Create your school</a><a href="#">Forgot Password</a>
                        </div>
                    </div>
                    <div className="spacer-vertical"></div>
                    <div className="">
                        <button className="btn">Submit</button>
                    </div>
                </form>
                    
              </div>
              
          </div>
      )
  }
}

export default HomePage;