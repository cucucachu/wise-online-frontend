import React　from 'react'
import { Link } from 'react-router-dom'
import educationIcon from '../Assets/images/wise-education.png'
import { i18n } from 'web-translate';

const StudentFeeWaive = (props) => {

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
                <img src={educationIcon} className="page-icon" alt="wise education icon"/>
                <div className="spacer-vertical" />
                <h1>Register for a fee-waiver</h1>
                <div className="spacer-vertical" />
                <div className="width-slim">
                   <p className="text-plain">
                   If you are a student with financial need, please complete this fee-waiver form to register you free waiver for the Wise Education student fee.
                   </p>
                </div>
                <div className="spacer-vertical" />
                <Link to="fee-waiver-select-school">
                    <button className="btn">Begin Registration</button>
                </Link>
                
            </div>
        </React.Fragment>
     );
}
 
export default StudentFeeWaive;