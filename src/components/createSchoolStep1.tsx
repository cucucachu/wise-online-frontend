import React, { Component, Fragment } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import editIcon from '../Assets/images/edit-icon.png';

import { createSchool } from '../store/axios'
// name, setupKey, email, password

import { AuthContext, IAuthContext } from '../contexts/AuthContext'

import { i18n } from 'web-translate';
import { logError } from '../Logger';

type BaseSchoolStep1Props = RouteComponentProps;

type SchoolStep1Props = BaseSchoolStep1Props & IAuthContext;

class SchoolStep1 extends Component<SchoolStep1Props, any> {
    state = {
        email: '',
        setupkey: '',
        password: '',
        name: '',
        message: '',
        showHide: {display: 'none'}
    };

    handleChangeName: React.ChangeEventHandler<HTMLInputElement> = e =>{
        this.setState({name: e.target.value})
    }
    handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = e =>{
        this.setState({email: e.target.value})
    }
    handleChangePW: React.ChangeEventHandler<HTMLInputElement> = e =>{
        this.setState({password: e.target.value})
    }
    handleChangeKey: React.ChangeEventHandler<HTMLInputElement> = e =>{
        
        this.setState({setupkey: e.target.value})
    }
    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }
    
    handleSubmit: React.FormEventHandler = async e =>{
        e.preventDefault()
        try {
            const emailLowerCase = this.state.email.toLowerCase()
            const response = await createSchool(this.state.name, this.state.setupkey, emailLowerCase, this.state.password)
            const newSchool = response.data

            if (response.status === 200) {
                this.props.setInfoFromCreateSchool({
                    userID: newSchool.id,
                    schoolID: newSchool.school.id,
                    schoolName: newSchool.school.name,
                });

                this.props.history.push('/admin-login')
            }
            else {
                this.setState({message: 'Sorry, we could not find a school with that setup key.'})
                this.showError()
            }
        }
        catch (error) {
            logError(error);
            this.setState({message: 'Oops, something went wrong. Please try again.'})
            this.showError()
        }
        
        return
    }

  render(){
      return(
        <Fragment>
            <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical" />
            <h1>{i18n("Create Your School")}</h1>

            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                    <span className="input-label">{i18n("School name")}</span>
                    <input type="text" placeholder={i18n("School name")} className="" name="name" value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
                </div>
                
                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">{i18n("School email")}</span>
                    <input type="email" placeholder={i18n("School email")} name="email" className="" value={this.state.email} onChange={this.handleChangeEmail.bind(this)}/>
                </div>

                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">{i18n("School password")}</span>
                    <input type="password" placeholder={i18n("School password")} name="password" className="" value={this.state.password} onChange={this.handleChangePW.bind(this)} />
                </div>

                <div className="spacer-vertical-s"></div>
                <div className="input-wrapper">
                    <span className="input-label">{i18n("School setup key")}</span>
                    <input type="text" placeholder={i18n("School setup key")} name="setupkey" className="" value={this.state.setupkey} onChange={this.handleChangeKey.bind(this)}/>
                </div>
 
                <div className="spacer-vertical-s"></div>
                <div className="">
                {/* <Link to="/create-school/step2"> */}
                    <input type="submit" className="btn" value={i18n("Next")} />
                {/* </Link> */}
                </div>
            </form>
            </div>
        </Fragment>
      )
  }
}

export default (props: BaseSchoolStep1Props) => {
    const authContext = React.useContext(AuthContext)!;

    return (
        <SchoolStep1
            {...props}
            {...authContext}
        />
    )
};
