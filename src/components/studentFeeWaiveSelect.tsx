import React, {Component} from 'react';

import educationIcon from '../Assets/images/wise-education.png'

import { getSchoolNames } from '../store/axios'
import { IAuthContext } from '../contexts/AuthContext'

import { i18n } from 'web-translate';
import { RouteComponentProps } from 'react-router-dom';
import { useAuth } from '../hooks';

type StudentFeeWaiveSelectProps = RouteComponentProps & IAuthContext;

class StudentFeeWaiveSelect extends Component<StudentFeeWaiveSelectProps, any> {
    state: any = {
        schools: [],
        shoolName: '',
        display: 'none',
        message:'Please select your school to proceed.',
        listItems: '',
        showHide: {display: 'none'}
    };

    handleChangeSchool: React.ChangeEventHandler<HTMLSelectElement> = e =>{
        this.setState({schoolName: e.target.value})        
    }
    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }
    
    handleSubmit: React.FormEventHandler = async e =>{
        e.preventDefault()
        
        if(this.state.schoolName === 'not selected' || this.state.schoolName === ''){
            this.setState({showHide: {display: 'block'}})
            
        }else{
            this.props.setSchoolName(this.state.schoolName);
            this.props.history.push('fee-waiver-note')
        }
   
        return
        
    }
async componentDidMount(){
    const response = await getSchoolNames()
    const schools = response.data
    this.setState({schools: schools})
    const listItems = schools.map((school: any) =>
    <option value={school.id} key={school.id}>{school.name}</option>
    );
    this.setState({listItems: listItems})
}
  render(){
    
      return(
        <div className="container">
            <img src={educationIcon} className="page-icon" alt="wise education icon"/>
            <div className="spacer-vertical" />
            <h1>{i18n("Select your school")}</h1>
            <div className="spacer-vertical-s"></div>
            <p className="text-plain">{i18n("Please select your school")}</p>
            <form onSubmit={this.handleSubmit}>
            <div className="spacer-vertical" />
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                   
                    <select id="schools" name="schools" value={this.state.schoolName} onChange={this.handleChangeSchool} className="student-form-select text-plain shadow">
                        <option value="not selected">{i18n("Select university")}</option>
                        {this.state.listItems}
                        
                    </select>
                </div>
               
    
                <div className="spacer-vertical" />
                <div className="">
                        <input type="submit" className="btn" value="Next" />
                </div>
            </form>
    </div>
      )
  }
}

export default (props: RouteComponentProps) => {
    const authContext = useAuth();
    return (
        <StudentFeeWaiveSelect
            {...props}
            {...authContext}
        />
    )
}
