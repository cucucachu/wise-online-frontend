import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";
import axios from 'axios'

import loginIcon from '../Assets/images/login-icon.png';

class SchoolLogin extends Component {
    state={
        name: '',
        key: ''
    };

    handleChangeName = e =>{
        e.preventDefault()
        this.setState({name: e.target.value})
    }
    handleChangeKey = e =>{
        e.preventDefault()
        this.setState({key: e.target.value})
    }
    
    handleSubmit = e =>{
        e.preventDefault()
        const schoolObj ={
            name: this.state.name,
            key: this.state.key
        }
        // axios.post(DBname, {name})
        axios.post('http://localhost:3000/users', {schoolObj})
        .then(res =>{
            console.log('response: ', res)
            
            
        })
        axios.get('http://localhost:3000/users')
        .then(res =>{
            console.log('get all data: ', res);
            console.log('res from api: ', res.data.id);
        })
    }
  render(){
      return(
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
            <h1>School login</h1>
            <form onClick={this.handleSubmit}>
            <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Name</span>
                    <input type="email" className="" id="basic-url" value={this.state.name} aria-describedby="basic-addon3" name="name" onChange={this.handleChangeName} />
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Key</span>
                    <input type="password" className="" name="key" value={this.state.key} onChange={this.handleChangeKey} />
                </div>
                <div className="input-wrapper">
                    <div className="input-wrapper-bottom">
                        <Link to="/create-school">Create your school</Link><Link to="/forgot-pw">Forgot Password</Link>
                    </div>
                </div>
                <div className="spacer-vertical"></div>
                <div className="">
                    <Link to="/select-role"><button className="btn">Next</button></Link>
                    {/* <button type='submit' className="btn">Next</button> */}
                </div>
            </form>
    </div>
      )
  }
}

export default SchoolLogin;


