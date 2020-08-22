import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { logout } from '../store/axios';

import chevronIcon from '../Assets/images/chevron-left.svg';

const HeaderNew = (props) => {
    const [schoolName, setSchoolName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState('');

    const handleLogout = () =>{
        sessionStorage.clear();
        logout();
        props.history.push("/");
    }

    const handleGoBack = (e) =>{
        e.preventDefault();
        props.history.goBack();
    }

    const historyPath = props.history.location.pathname;

    useEffect(() => {
        setSchoolName(sessionStorage.getItem('schoolName'));
        setUsername(sessionStorage.getItem('username'));
        setIsLoggedIn(sessionStorage.getItem('isLoggedIn'));
    }, []);

    return ( 
        <header>
              <div className="logo"></div>
              { historyPath === '/' || 
                historyPath === '/admin/download' ||
                historyPath === '/professor/course' ||
                historyPath === '/student/dashboard'
               ? '' : (<button onClick={handleGoBack} className="btn-backlink"><img src={chevronIcon} className="icon-xs" alt="chevron icon"/>&nbsp;Go back </button>)}
      
              <nav className="">
                { isLoggedIn ? 
                (<p className="nav-pos"><span className="hide-mobile">{ username === 'undefined' ?  'Logged in as ' + schoolName  : 'Logged in as ' + username} </span><button className="btn-s" onClick={handleLogout} >Log out</button></p> ):
                ''}
              </nav>
                
          </header>
     );
}
 
export default withRouter(HeaderNew);