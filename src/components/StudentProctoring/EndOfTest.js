import React from 'react';

import { i18n } from 'web-translate';

function EndOfTest(props) {
    return (
        <div className={`shadow center${props.show ? '' : ' display-none'}`}>
            <h1>{i18n("Test Completed")}</h1>
            <div className="spacer-vertical-s"></div>
            <div className="width-80 center">
                <p className="black">{i18n("If you weren't finished, you can start the test again and it will continue where you left off.")}</p>
                <div className="spacer-vertical-s"></div>
                <div>
                    <button className='btn' onClick={props.toStudentDashboard}>{i18n("Home")}</button>
                </div>
                <div className="spacer-vertical-s"></div>
                <div>
                    <button className='btn' onClick={props.restart}>{i18n("I wasn't finished!")}</button>
                </div>
            </div>
        </div>
    );
}

export default EndOfTest;