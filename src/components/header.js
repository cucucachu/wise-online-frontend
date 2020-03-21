import React, {Component} from 'react';
import { AuthContext } from '../contexts/AuthContext'

class Header extends Component {
  static contextType = AuthContext
  render(){
    const { isAuthenticated, username, userID} = this.context
      return(
          <header>
              <div className="logo"></div>
              <nav className="">
      {isAuthenticated ? 
      (<p className="nav-pos">You are logged in as {username} </p> ):
      ''}
                <ul>

                    {/* <a href="#" ><li>Home</li></a>
                    <a href="#" ><li>Admin Login</li></a> */}
                </ul>
              </nav>
                
          </header>
      )
  }
}

export default Header;
