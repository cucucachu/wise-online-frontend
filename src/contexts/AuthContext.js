import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [cookies] = useCookies([]);
    const [username, setUsername] = useState('');
    const [userID, setUserID] = useState('');
    const [schoolID, setSchoolID] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [testAttendanceId, setTestAttendanceId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    var [isAuthenticated, setIsAuthenticated] = useState(false);
    var [isCreated, setIsCreated] = useState(false);
    const [classID, setClassID] = useState('');

    const authToggle = ()=> {
        setIsAuthenticated(!isAuthenticated);
    }

    const toggleCreated = () => {
        setIsCreated(!isCreated);
    }

    const loggedinUser = (userID, username, schoolName, schoolID) => {
        setUserID(userID);
        setUsername(username);
        setSchoolName(schoolName);
        setSchoolID(schoolID);
    }

    const storeClassId = (classId) => {
        setClassID(classId);
    }

    const storeTestAttendanceId = (id) => {
        setTestAttendanceId(id);
    }
    
    const storeSchoolName = (name) => {
        setSchoolName(name);
    }

    const studentForm = (firstName, lastName, email) => {
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
    }

    return ( 
        <AuthContext.Provider value={{ email, lastName, firstName, cookies, classID, schoolName, schoolID, username, userID, isAuthenticated, storeTestAttendanceId, testAttendanceId, authToggle, loggedinUser, toggleCreated, storeClassId, storeSchoolName, studentForm}}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;