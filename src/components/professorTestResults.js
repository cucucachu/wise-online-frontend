import React, { Component, Fragment} from 'react'
import viewIcon from '../Assets/images/view-icon.png'
import { getTestResults } from '../store/axios'

class ViewTestResults extends Component{
    constructor(props){
        super(props)
        this.state = {
            examDate: '',
            testResults: [],
            studentList: []
        }
    }
    async loadTestResults(){
        //professor id and data
        const professor = {id: sessionStorage.getItem('userID')}        
        const response = await getTestResults(professor, this.props.match.params.testId)
        console.log('response: ', response)
        // this.setState({testResults: response.data})
        const testResults = response.data.proctoringResults
        this.setState({testResults: testResults})
        console.log('state: ', this.state.testResults);
        
        // console.log(': ', response.data.map((item,i) => <li key={i}>{item}</li>));
        
        // const testResultList = testResults.map((testResult) =>
        //                         <li>{testResult.student}</li>
        //                       )
        // this.setState({studentList: testResultList})
        
    }

    async componentDidMount(){
        
        const { examDate } = this.props.location.state
        console.log('exam date: ', examDate)
        this.setState({examDate: examDate})
        await this.loadTestResults()
    }
    render(){
        return(
            <Fragment>
                <div className="container">
                    <img src={viewIcon} className="page-icon" alt="view icon"/>
                    <div className="spacer-vertical"></div>
                    <h1>{this.state.examDate}</h1>
                    <div className="shadow">
                    <ul>{
                        this.state.testResults.map((result,i) => 
                        <li className="underbar" key={i}>{result.student} </li>
                        )
                    }</ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ViewTestResults