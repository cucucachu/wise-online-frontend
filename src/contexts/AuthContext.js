import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [user, setUser] = useState({
        name: 'john@schoola.edu',
        schoolID: 'xxx',
        isAuthenticated: false
    })
    const authToggle = (isAuthenticated)=>{
        setUser({isAuthenticated:!isAuthenticated})
    }
    return ( 
        <AuthContext.Provider value={{user, authToggle}}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;