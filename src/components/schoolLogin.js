import React, {Component, useContext, useState} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";

import loginIcon from '../Assets/images/login-icon.png';
import { AuthContext } from '../contexts/AuthContext'

import { adminLogin } from '../store/axios'


class SchoolLogin extends Component {
    // static contextType = AuthContext
    state={
        email: '',
        key: ''
    };

    handleChangeName = e =>{
        this.setState({email: e.target.value})
    }
    handleChangeKey = e =>{
        console.log('onchange: ', e.target.value);
        
        this.setState({key: e.target.value})
    }
    
    handleSubmit = e =>{
        e.preventDefault()
        
        console.log('state: ', this.state);
        // const userAdmin = adminLogin({email: this.state.name, password: this.state.key});
        const userAdmin = adminLogin(this.state.email, this.state.key)
        
    }
  render(){
        // const { email, password } = this.context
      return(
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
            <h1>School login</h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Name</span>
                    <input type="email" className="" id="basic-url"  aria-describedby="basic-addon3" name="email" value={this.state.email} onChange={this.handleChangeName.bind(this)} />
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Key</span>
                    <input type="password" className="" name="key" onChange={this.handleChangeKey.bind(this)} value={this.state.key}/>
                </div>
                <div className="input-wrapper">
                    <div className="input-wrapper-bottom">
                        <Link to="/create-school">Create your school</Link><Link to="/forgot-pw">Forgot Password</Link>
                    </div>
                </div>
                <div className="spacer-vertical"></div>
                <div className="">
                    {/* <Link to="/select-role"> */}
                        <input type="submit" className="btn" value="Next" />
                    {/* </Link> */}
                </div>
            </form>
    </div>
      )
  }
}

export default SchoolLogin;




// const SchoolLogin = () => {
//     const { email, password, authToggle } = useContext(AuthContext)
//     const [emailForm, setEmailForm] = useState('')
//     // const handleChangeName = e =>{
//     //     setUserAdmin({email: e.target.value})
//     // }
//     const handleChangeKey = e =>{
//         console.log('onchange: ', e.target.value);
        
//         setUserAdmin({key: e.target.value})
//     }
    
//     const handleSubmit = e =>{
//         e.preventDefault()
        
//         console.log('userAdmin: ', userAdmin.email);
//         // const userAdmin = adminLogin({email: this.state.name, password: this.state.key});
//         const userAdmin = adminLogin(userAdmin.email, userAdmin.key)
        
//     }
//     return ( 
//         <div className="container">
//             <img src={loginIcon} className="page-icon" alt="login icon"/>
//             <div className="spacer-vertical"></div>
//             <h1>School login</h1>
//             <form onSubmit={handleSubmit}>
//             <div className="spacer-vertical"></div>
//                 <div className="input-wrapper">
//                     <span className="input-label">Name</span>
//                     <input type="email" className="" id="basic-url"  aria-describedby="basic-addon3" name="email" value={userAdmin.email} onChange={(e) => setUserAdmin.email(e.target.value)} />
//                 </div>
                
//                 <div className="spacer-vertical"></div>
//                 <div className="input-wrapper">
//                     <span className="input-label">Key</span>
//                     <input type="password" className="" name="key" onChange={handleChangeKey} value={userAdmin.key}/>
//                 </div>
//                 <div className="input-wrapper">
//                     <div className="input-wrapper-bottom">
//                         <Link to="/create-school">Create your school</Link><Link to="/forgot-pw">Forgot Password</Link>
//                     </div>
//                 </div>
//                 <div className="spacer-vertical"></div>
//                 <div className="">
//                     {/* <Link to="/select-role"> */}
//                         <input type="submit" className="btn" value="Next" />
//                     {/* </Link> */}
//                 </div>
//             </form>
//     </div>
//      );
// }
 
// export default SchoolLogin;