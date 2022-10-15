import * as React from 'react';

import educationIcon from '../Assets/images/wise-education.png'

import { IAuthContext } from '../contexts/AuthContext'
import { useAuth } from '../hooks'

import { i18n } from 'web-translate';
import { Route, RouteComponentProps } from 'react-router-dom';

type StudentFeeWaiveConfirmProps = {
    authContext: IAuthContext;
} & RouteComponentProps;

class StudentFeeWaiveConfirm extends React.Component<StudentFeeWaiveConfirmProps, any> {
    state={
        email: '',
        firstName: '',
        lastName: '',
        display: 'none',
        message:'',
        showHide: {display: 'none'},
        toggleCss: false
    };
    handleRadio: React.MouseEventHandler<HTMLButtonElement> = e =>{
        e.preventDefault()
        this.setState((prevState: any) => ({
            toggleCss: !prevState.toggleCss
          }));
    }
    handleSubmit: React.FormEventHandler = e =>{
        e.preventDefault()
        this.props.history.push('/student-login')
        // try {
        //     const emailLowerCase = this.state.email.toLowerCase()
        //     const response = await studentLogin(emailLowerCase, this.state.key)
        //     const userStudent = response.data

        //     if (response.status === 200) {
        //         // argument (name, id, schoolID)
        //         loggedinUser(userStudent.id, userStudent.name, userStudent.school.name, userStudent.school.id)
        //         authToggle()                 
                
        //         this.props.history.push('/student/dashboard')
        //     }
        //     else {
        //         this.setState({message: 'Invalid email or student id. Please try again.'})
        //         this.showError()
        //     }

        // }
        // catch (error) {
        //     this.setState({message: 'Oops, something went wrong. Please try again.'})
        //     this.showError()
        // }
   
        return
        
    };

    onFocus = (id: any) => {
        document.getElementById(id)!.onpaste = e => {
            e.preventDefault();
            return false;
        };
    };
  render(){
    const { firstName, lastName, email, schoolName } = this.props.authContext;
    console.log('school: ', schoolName);
    
        // console.log('firstname: ', firstName);
        
        // this.setState({firstName: firstName, lastName: lastName, email: email, schoolName: schoolName})
        // console.log('this state: ', this.firstName);

      return(
        <div className="container prevent-text">
            <img src={educationIcon} className="page-icon" alt="wise education icon"/>
            <div className="spacer-vertical" />
            <h1>{i18n("Review and confirm")}</h1>
            <div className="spacer-vertical" />
            <div className="width-slim text-plain">
                <p>
                {i18n("Please review and confirm that the following information is accurate, in your registration for waiving the Wise Education support fee.")}
                </p>
                <div className="spacer-vertical" />
                <p>
                    {i18n("School")}: {schoolName} <br/>
                    {i18n("Student name")}: {firstName} {lastName} <br/>
                    {i18n("Student email")}: {email}
                </p>
                
                    <div className="spacer-vertical" />

                    <div className="row">
                        <div className="col-sm-1">
                            <button className="mimic-radio" onClick={this.handleRadio.bind(this)} >{this.state.toggleCss ? <strong>&#10003;</strong> : ''}</button>
                            
                        </div>
                        <div className="col-sm-11">
                            <strong>{i18n("I register as having financial need.")}<br /> {i18n("The above information is accurate.")}</strong></div>
                    </div>
                    
                    <div className="spacer-vertical" />
                
            </div>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input id="student_fee_waive" type="submit" className="btn" value={i18n("Submit")} onFocus={() => this.onFocus("student_fee_waive")}/>
            </form>
            
    </div>
      )
  }
}

export default (props: RouteComponentProps) => {
    const authContext = useAuth();

    return (
        <StudentFeeWaiveConfirm
            {...props}
            authContext={authContext}
        />
    )
};


