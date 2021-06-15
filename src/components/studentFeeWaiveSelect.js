import React, {Component} from 'react';

import educationIcon from '../Assets/images/wise-education.png'

import { getSchoolNames } from '../store/axios'
import { AuthContext } from '../contexts/AuthContext'

import { i18n } from 'web-translate';


class StudentFeeWaiveSelect extends Component {
    static contextType = AuthContext

    state={
        schools: [],
        shoolName: '',
        display: 'none',
        message:'Please select your school to proceed.',
        listItems: '',
        showHide: {display: 'none'}
    };

    handleChangeSchool = e =>{
        this.setState({schoolName: e.target.value})        
    }
    showError = () =>{
        this.setState({showHide: {display: 'block'}})
    }
    
    handleSubmit = async e =>{
        e.preventDefault()
        // const { storeSchoolName } = this.context
        sessionStorage.setItem('schoolName', this.state.schoolName)
        
        if(this.state.schoolName === 'not selected' || this.state.schoolName === ''){
            this.setState({showHide: {display: 'block'}})
            
        }else{
            this.props.history.push('fee-waiver-note')
        }
   
        return
        
    }
async componentDidMount(){
    const response = await getSchoolNames()
    const schools = response.data
    this.setState({schools: schools})
    const listItems = schools.map((school) =>
    <option value={school.id} key={school.id}>{school.name}</option>
    );
    this.setState({listItems: listItems})
}
  render(){
    
      return(
        <div className="container">
            <img src={educationIcon} className="page-icon" alt="wise education icon"/>
            <div className="spacer-vertical" />
            <h1>Select your school</h1>
            <div className="spacer-vertical-s"></div>
            <p className="text-plain">Please select your school</p>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="spacer-vertical" />
                <div className="input-wrapper">
                    <div style={this.state.showHide}>{this.state.message}</div>
                   
                    <select id="schools" name="schools" value={this.state.schoolName} onChange={this.handleChangeSchool.bind(this)} className="student-form-select text-plain shadow">
                        <option value="not selected">Select university</option>
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

export default StudentFeeWaiveSelect;


