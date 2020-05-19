import React, { Component, Fragment} from 'react'
import viewIcon from '../Assets/images/view-icon.png'
import moment from 'moment'

import redFlag from '../Assets/images/red-flag.png'
import { Link } from 'react-router-dom'
import chevronRight from '../Assets/images/chevron_right.svg'


class ViewEachTestResult extends Component{
    constructor(props){
        super(props)
        this.state = {
            testResult: {},
            formattedDate: '',
            red: 1,
            redArr: [],
            greenArr: [],
            yellowArr: []
        }
    }

    componentDidMount(){
        
        const { testResult } = this.props.location.state
        
        this.setState({formattedDate: moment.utc(testResult.startTime).format('MMM DD, YYYY'), testResult: testResult, red: testResult.tabs.red.length, redArr: testResult.tabs.red, yellowArr: testResult.tabs.yellow})


        console.log('test result: ', testResult);
        

    }
    render(){
        return(
            <Fragment>
                <div className="container">
                    <img src={viewIcon} className="page-icon" alt="view icon"/>
                    <div className="spacer-vertical-s"></div>
                    <h1>{this.state.testResult.student}, {this.state.formattedDate}, {this.state.red}</h1>
        {this.state.testResult.confidenceScore <= 0.4  || this.state.red > 0 ? <h2 className="red-text"><img className="red-flag-l" src={redFlag} alt="red flag icon" />&nbsp;
Red Flags Detected</h2> : '' }
                    <div className="spacer-vertical-s"></div>
                    <div className="row">
                        <div className="col-sm-6 col-md-3 view-details ">
                            video here
                        </div>
                        <div className="col-sm-6 col-md-3 border-right">
                            <h3 className="text-plain">Red Flag tabs</h3>
                            <ul className="result-li">
                                {
                                this.state.red > 0 ?
                                this.state.redArr.map((result, i) =>
                                <li className="" key={i}>{result}</li>
                                ) : 'no data'
                                }
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 border-right">
                        <h3 className="text-plain">Unknown tabs</h3>
                            <ul className="result-li">
                                {
                                this.state.greenArr.length > 0 ?
                                this.state.greenArr.map((result, i) =>
                                <li key={i}>{result}</li>
                                ) : 'no data'
                                }
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3">
                        <h3 className="text-plain"> Whitelisted tabs</h3>
                            <ul className="result-li">
                                {
                                this.state.yellowArr.length > 0 ?
                                this.state.yellowArr.map((result, i) =>
                                <li key={i}>{result}</li>
                                ) : 'no data'
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ViewEachTestResult