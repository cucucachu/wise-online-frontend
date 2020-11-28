import React from 'react';

function EndOfTest(props) {
    return (
        <div className={`shadow center${props.show ? '' : ' display-none'}`}>
            <h1>Test Completed</h1>
            <div className="spacer-vertical-s"></div>
            <div className="width-80 center">
                <p className="black">If you weren't finished, you can start the test again and it will continue where you left off.</p>
                <div className="spacer-vertical-s"></div>
                <div>
                    <button className='btn' onClick={props.toStudentDashboard}>Home</button>
                </div>
                <div className="spacer-vertical-s"></div>
                <div>
                    <button className='btn' onClick={props.restart}>I wasn't finished!</button>
                </div>
            </div>
        </div>
    );
}

export default EndOfTest;