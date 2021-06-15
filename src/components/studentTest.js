import React from 'react';
import { Link } from 'react-router-dom';
import editIcon from '../Assets/images/edit-icon.png';
import { i18n } from 'web-translate';

const StudentTest = (props) => {

    return ( 
        <React.Fragment>
            <div className="container prevent-text">
                <img src={editIcon} className="page-icon" alt="edit icon"/>
                <div className="spacer-vertical" />
                <h1>{i18n('Instructions')}</h1>
                <div className="spacer-vertical" />
                <div className="width-adjust-1">
                    <ul className="omit-indent">
                        <li className="list-text">{i18n('1. Allow camera permissions')}<br/>
                            <div className="text-sm text-plain">{i18n('Wise uses confidential facial recognition to make sure you’re really you')}</div>
                        </li>
                        <li className="list-text">{i18n('2. Open your online test')}<br/>
                            <div className="text-sm text-plain">{i18n('Get ready to begin your online test')}</div>
                        </li>
                        <li className="list-text">{i18n('3. Start the recording and begin your test')}<br/>
                            <div className="text-sm text-plain">{i18n('Get ready to begin your online test')}</div>
                        </li>
                        <li className="list-text">{i18n('4. Stop the recording when you finish')}<br/>
                            <div className="text-sm text-plain">{i18n('Get ready to begin your online test')}</div>
                        </li>
                    </ul>
                </div>
                <div className="spacer-vertical" />
                <Link to="test-id">
                    <button className="btn">{i18n('Begin')}</button>
                </Link>
                
            </div>
        </React.Fragment>
     );
}
 
export default StudentTest;