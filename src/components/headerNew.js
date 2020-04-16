import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
// import { AuthContext } from '../contexts/AuthContext'
import { logout } from '../store/axios'

import chevronIcon from '../Assets/images/chevron-left.svg'

const HeaderNew = (props) => {
    const [schoolName, setSchoolName] = useState('')
    const [username, setUsername] = useState('')

    const handleLogout = () =>{
        sessionStorage.clear()
        logout()
        props.history.push("/");
    }
    const handleGoBack = (e) =>{
        e.preventDefault()
        props.history.goBack()
    }
    const historyPath = props.history.location.pathname

    useEffect(() => {
        // Update the document title using the browser API
        setSchoolName(sessionStorage.getItem('schoolName'))
        setUsername(sessionStorage.getItem('username'))
        console.log('schooname: ', schoolName);
        
      });

    return ( 
        <header>
              <div className="logo"></div>
              { historyPath === '/' || 
                historyPath === '/admin/download' ||
                historyPath === '/create-school' ||
                historyPath === '/professor/course' ||
                historyPath === '/student/dashboard'
               ? '' : (<button onClick={handleGoBack} className="btn-backlink"><img src={chevronIcon} className="icon-xs" alt="chevron icon"/>&nbsp;Go back </button>)}
      
              <nav className="">
      { schoolName ? 
      (<p className="nav-pos"><span className="hide-mobile">{ username === '' ?  'Logged in as ' + schoolName  : 'Logged in as ' + username} </span><button className="btn-s" onClick={handleLogout} >Log out</button></p> ):
      ''}
              </nav>
                
          </header>
     );
}
 
export default withRouter(HeaderNew);

// class Header extends Component {
//   constructor( props ) {
//     super( props );
// }
//   state={
//     redirect: false,
//     schoolName: sessionStorage.getItem('schoolName'),
//     username: sessionStorage.getItem('username')
//   }
//   handleLogout = () =>{
//     const { authToggle, isAuthenticated } = this.context
    
//     if(isAuthenticated){
//       authToggle()
//     }
//     sessionStorage.clear();
//     logout()
  
//     this.props.history.push("/");
//   }

//   handleGoBack = (e) =>{
//     e.preventDefault()
//     this.props.history.goBack();
//   }

//   render(){
//       return(
//           <header>
//               <div className="logo"></div>
//               { historyPath === '/' || 
//                 historyPath === '/admin/download' ||
//                 historyPath === '/create-school' ||
//                 historyPath === '/professor/course' ||
//                 historyPath === '/student/dashboard'
//                ? '' : (<button onClick={this.handleGoBack.bind(this)} className="btn-backlink"><img src={chevronIcon} className="icon-xs" alt="chevron icon"/>&nbsp;Go back </button>)}
      
//               <nav className="">
//       { this.state.schoolName ? 
//       (<p className="nav-pos"><span className="hide-mobile">{ this.state.username === '' ?  'Logged in as ' + this.state.schoolName  : 'Logged in as ' + 	 this.state.username} </span><button className="btn-s" onClick={this.handleLogout.bind(this)} >Log out</button></p> ):
//       ''}
//               </nav>
                
//           </header>
//       )
//   }
// }

// export default withRouter(Header)
