import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import editIcon from '../Assets/images/edit-icon.png'

const StudentTest = (props) => {

    // const { cookies } = useContext(AuthContext)
    // const checkCookie = ()=>{
    //     if(cookies === undefined){
    //         props.history.push('/student-login')
    //     }else{return}
    // }
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         checkCookie()
    //     }, 300000);
    //     return () => clearInterval(interval)
    // })

    return ( 
        <React.Fragment>
            <div className="container">
                <img src={editIcon} className="page-icon" alt="edit icon"/>
                <div className="spacer-vertical"></div>
                <h1>Instructions</h1>
                <div className="spacer-vertical"></div>
                <div className="width-adjust-1">
                    <ul className="omit-indent">
                        <li className="list-text">1. Allow camera permissions<br/>
                            <div className="text-sm text-plain">Wise uses confidential facial recognition to make sure you’re really you</div>
                        </li>
                        <li className="list-text">2. Open your online test<br/>
                            <div className="text-sm text-plain">Get ready to begin your online test</div>
                        </li>
                        <li className="list-text">3. Start the recording and begin your test<br/>
                            <div className="text-sm text-plain">Get ready to begin your online test</div>
                        </li>
                        <li className="list-text">4. Stop the recording when you finish<br/>
                            <div className="text-sm text-plain">Get ready to begin your online test</div>
                        </li>
                    </ul>
                </div>
                <div className="spacer-vertical"></div>
                <Link to="test-id">
                    <button className="btn">Begin</button>
                </Link>
                
            </div>
        </React.Fragment>
     );
}
 
export default StudentTest;