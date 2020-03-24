import React, {Component, useContext, useState} from 'react'
import { 
    Link,
    } from "react-router-dom";


import loginIcon from '../Assets/images/login-icon.png'
import { AuthContext } from '../contexts/AuthContext'

import { adminLogin } from '../store/axios'
   
   
class AdminLogin extends Component {
    static contextType = AuthContext
    state={
        email: '',
        key: '',
        display: 'none',
        message:'',
        showHide: {display: 'none'}
    };

    handleChangeName = e =>{
        this.setState({email: e.target.value})
    }
    handleChangeKey = e =>{
        console.log('onchange: ', e.target.value)
        
        this.setState({key: e.target.value})
    }
    
    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }

    handleSubmit = async e =>{
        e.preventDefault()
        const { loggedinUser, authToggle, isAuthenticated } = this.context

        try {
            const emailLowerCase = this.state.email.toLowerCase()
            
            const response = await adminLogin(emailLowerCase, this.state.key)
            const userAdmin = response.data;

            if (response.status === 200) {
                loggedinUser(userAdmin.id, userAdmin.school.name, userAdmin.school.id)
                authToggle() 
                this.props.history.push('/admin/download')
                console.log('userAdmin: ', userAdmin)
            }
            else {
                this.setState({message: 'Invalid email or password. Please try again.'})
                this.showError()
            }
        }
        catch (error) {
            this.setState({message: 'Opps, something went wrong. Please try again.'})
            this.showError()
        }

        //currently Promise pending due to DB connection 
        

        //for test
        // if(userAdmin){
        //     loggedinUser('School A', 'some id retunred')
            
            
        //     authToggle() 
        //     console.log('isAuthenticated from adminlogin: ', isAuthenticated);
        //     this.props.history.push('/create-school')
        // }

        //error message TBD
        // if(userAdmin.status === 400){
        //     this.setState({message: userAdmin.message})
        //     this.showError()
        // }else{
        //     loggedinUser(userAdmin.school.name, userAdmin.school.id)
        //     authToggle() 
        //     this.props.history.push('/create-school')
        // }
        
        return 
        
        //message sent by backend
        //     message : 'Logged In as Admin with User ID: ',
        //     id : id,
        //     school: {
        //         id: 111,
        //         name: 'school.name',
        //     }
        
    }

    render(){
        
        return(
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
            <h1>Administration login</h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="spacer-vertical"></div>
                
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                    <span className="input-label">Email</span>
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

export default AdminLogin;



// import { AuthContext } from '../contexts/AuthContext'

// import axios from 'axios'
// import loginIcon from '../Assets/images/login-icon.png'


// const AdminLogin = () => {
//     const { user, authToggle} = useContext(AuthContext)
//     const [schoolName, setSchoolName] = useState('')
//     const [schoolID, setSchoolID] = useState('')
//     const [schoolData, setSchoolData] = useState({schoolName: '', schoolID: ''})

//     const handleSubmit = (e) =>{

//         e.preventDefault()
        
//         setSchoolData(schoolData)
        
//         // axios.post(DBname, {name})
//         axios.post('http://localhost:3000/users', {schoolData})
//         .then(res =>{
//             console.log('response: ', res)
            
            
//         })
//         axios.get('http://localhost:3000/users')
//         .then(res =>{
//             console.log('get all data: ', res);
//             console.log('res from api: ', res.data.id);
//         })
//     }
//     return ( 
//         <div className="container">
//                 <img src={loginIcon} className="page-icon" alt="login icon"/>
//                 <div className="spacer-vertical"></div>
//                 <h1>Administration login</h1>
//                 <form onClick={handleSubmit}>
//                 <div className="spacer-vertical"></div>
//                     <div className="input-wrapper">
//                         <span className="input-label">Name</span>
//                         <input type="email" className="" id="basic-url" value={schoolName} aria-describedby="basic-addon3" onChange={(e) => setSchoolName(e.target.value)} />
//                     </div>
                    
//                     <div className="spacer-vertical"></div>
//                     <div className="input-wrapper">
//                         <span className="input-label">ID</span>
//                         <input type="password" className="" value={schoolID} onChange={(e) => setSchoolID(e.target.value)}/>
//                     </div>
//                     <div className="input-wrapper">
//                         <div className="input-wrapper-bottom">
//                             <Link to="/create-school">Create your school</Link><Link to="/forgot-pw">Forgot Password</Link>
//                         </div>
//                     </div>
//                     <div className="spacer-vertical"></div>
//                     <div className="">
//                         <Link to="/create-school"><button className="btn">Submit</button></Link>
                        
//                     </div>
//                 </form>
//         </div>
//   );
//   }
   
//   export default AdminLogin;

