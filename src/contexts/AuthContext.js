import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [username, setUsername] = useState('')
    const [userID, setUserID] = useState('')
    const [schoolID, setSchoolID] = useState('')
    const [schoolName, setSchoolName] = useState('')
    const [testID, setTestID] = useState('')
    // const [professorID, setProfessorID] = useState('')
    var [isAuthenticated, setIsAuthenticated] = useState(false)
    var [isCreated, setIsCreated] = useState(false)
    // var [attendanceCode, setAttendanceCode] = useState(null)
    const [classID, setClassID] = useState('')

    const authToggle = ()=>{
        setIsAuthenticated(!isAuthenticated)
    }
    const toggleCreated = () =>{
        setIsCreated(!isCreated)
    }
    const loggedinUser = (userID, username, schoolName, schoolID) =>{
        setUserID(userID)
        setUsername(username)
        setSchoolName(schoolName)
        setSchoolID(schoolID)
    }
    const storeClassId = (classId) =>{
        console.log('classId : ', classId);
        
        setClassID(classId)
    }
    const storeTestID = (id) =>{
        setTestID(id)
    }

    return ( 
        <AuthContext.Provider value={{ cookies, classID, schoolName, schoolID, username, userID, isAuthenticated, storeTestID, authToggle, loggedinUser, toggleCreated, storeClassId}}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;