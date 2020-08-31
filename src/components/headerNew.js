import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import chevronIcon from '../Assets/images/chevron-left.svg';

class HeaderNew extends Component {
    constructor(props) {
        super(props);

        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    handleGoBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    async handleLogout() {
        this.props.history.push("/");
        return this.props.handleLogout();
    }

    render() {

        return ( 
            <header>
                  <div className="logo"></div>
                  { this.props.history.location.pathname === '/' || 
                    this.props.history.location.pathname === '/admin/download' ||
                    this.props.history.location.pathname === '/professor/course' ||
                    this.props.history.location.pathname === '/student/dashboard'
                   ? '' : (<button onClick={this.handleGoBack} className="btn-backlink"><img src={chevronIcon} className="icon-xs" alt="chevron icon"/>&nbsp;Go back </button>)}
          
    
                  {
                    (() => {
                        if (this.props.isLoggedIn) {
                            return (
                                <p className="nav-pos">
                                    <span className="hide-mobile">
                                        { this.props.username === undefined ?  'Logged in as ' + this.props.schoolName  : 'Logged in as ' + this.props.username} 
                                    </span>
                                    <button className="btn-s" onClick={this.handleLogout} >Log out</button>
                                </p> 
                            )
                        }
                    })()
                  }
                    
              </header>
         );

    }
}
 
export default withRouter(HeaderNew);