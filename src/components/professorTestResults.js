import React, { Component, Fragment} from 'react'
import viewIcon from '../Assets/images/view-icon.png'

class ViewTestResults extends Component{
    state={
        testDate: ''
    }

    render(){
        return(
            <Fragment>
                <div className="container">
                    <img src={viewIcon} className="page-icon" alt="view icon"/>
                    <div className="spacer-vertical"></div>
                    <h1>{}exam results page</h1>
                    <div>
                        <ul>
                            {}
                            <li>test result</li>
                        </ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ViewTestResults