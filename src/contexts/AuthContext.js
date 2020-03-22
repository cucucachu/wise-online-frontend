import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [username, setUsername] = useState('')
    const [userID, setUserID] = useState('')
    const [schoolID, setSchoolID] = useState('')
    const [professorID, setProfessorID] = useState('')
    var [isAuthenticated, setIsAuthenticated] = useState(false)
    var [isCreated, setIsCreated] = useState(false)
    
    const authToggle = ()=>{
        setIsAuthenticated(!isAuthenticated)
    }
    const toggleCreated = () =>{
        setIsCreated({...isCreated, isCreated: !isCreated})
    }
    const loggedinUser = (name, id) =>{
        
        setUsername(name)
        setUserID(id)
    }
    const getSchoolID = (id) =>{
        setSchoolID(id)
    }
    const getProfessorID = (id) =>{
        setProfessorID(id)
    }
    return ( 
        <AuthContext.Provider value={{schoolID, username, userID, isAuthenticated, authToggle, loggedinUser, getSchoolID, getProfessorID, toggleCreated}}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;