import React, { useState, useContext } from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom"

import { AuthContext } from '../contexts/AuthContext'

import axios from 'axios'
import loginIcon from '../Assets/images/login-icon.png'


const AdminLogin = () => {
    const { user, authToggle} = useContext(AuthContext)
    const [schoolName, setSchoolName] = useState('')
    const [schoolID, setSchoolID] = useState('')
    const [schoolData, setSchoolData] = useState({schoolName: '', schoolID: ''})

    const handleSubmit = (e) =>{

        e.preventDefault()
        
        setSchoolData(schoolData)
        
        // axios.post(DBname, {name})
        axios.post('http://localhost:3000/users', {schoolData})
        .then(res =>{
            console.log('response: ', res)
            
            
        })
        axios.get('http://localhost:3000/users')
        .then(res =>{
            console.log('get all data: ', res);
            console.log('res from api: ', res.data.id);
        })
    }
    return ( 
        <div className="container">
                <img src={loginIcon} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical"></div>
                <h1>Administration login</h1>
                <form onClick={handleSubmit}>
                <div className="spacer-vertical"></div>
                    <div className="input-wrapper">
                        <span className="input-label">Name</span>
                        <input type="email" className="" id="basic-url" value={schoolName} aria-describedby="basic-addon3" onChange={(e) => setSchoolName(e.target.value)} />
                    </div>
                    
                    <div className="spacer-vertical"></div>
                    <div className="input-wrapper">
                        <span className="input-label">ID</span>
                        <input type="password" className="" value={schoolID} onChange={(e) => setSchoolID(e.target.value)}/>
                    </div>
                    <div className="input-wrapper">
                        <div className="input-wrapper-bottom">
                            <Link to="/create-school">Create your school</Link><Link to="/forgot-pw">Forgot Password</Link>
                        </div>
                    </div>
                    <div className="spacer-vertical"></div>
                    <div className="">
                        <Link to="/create-school"><button className="btn">Submit</button></Link>
                        
                    </div>
                </form>
        </div>
  );
  }
   
  export default AdminLogin;


  // class AdminLogin extends Component {
//     state={
//         schoolName: '',
//         schoolID: ''
//     };

//     handleChangeName = e =>{
//         e.preventDefault()
//         this.setState({name: e.target.value})
//     }
//     handleChangeKey = e =>{
//         e.preventDefault()
//         this.setState({key: e.target.value})
//     }
    
//     handleSubmit = e =>{
//         e.preventDefault()
//         const schoolObj ={
//             name: this.state.name,
//             key: this.state.key
//         }
//         // axios.post(DBname, {name})
//         axios.post('http://localhost:3000/users', {schoolObj})
//         .then(res =>{
//             console.log('response: ', res)
            
            
//         })
//         axios.get('http://localhost:3000/users')
//         .then(res =>{
//             console.log('get all data: ', res);
//             console.log('res from api: ', res.data.id);
//         })
//     }
//   render(){
//       return(
//         <div className="container">
//             <img src={loginIcon} className="page-icon" alt="login icon"/>
//             <div className="spacer-vertical"></div>
//             <h1>Administration login</h1>
//             <form>
//             <div className="spacer-vertical"></div>
//                 <div className="input-wrapper">
//                     <span className="input-label">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
//                     <input type="email" className="" id="basic-url" aria-describedby="basic-addon3" />
//                 </div>
                
//                 <div className="spacer-vertical"></div>
//                 <div className="input-wrapper">
//                     <span className="input-label">Password</span>
//                     <input type="password" className="" />
//                 </div>
//                 <div className="input-wrapper">
//                     <div className="input-wrapper-bottom">
//                         <Link to="/create-school">Create your school</Link><Link to="/forgot-pw">Forgot Password</Link>
//                     </div>
//                 </div>
//                 <div className="spacer-vertical"></div>
//                 <div className="">
//                     <button className="btn">Submit</button>
//                 </div>
//             </form>
//     </div>
//       )
//   }
// }

// export default AdminLogin;