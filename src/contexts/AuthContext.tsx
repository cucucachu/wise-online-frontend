import * as React from 'react';
import type { FC, PropsWithChildren } from 'react';
import { useCookies } from 'react-cookie';
import { logout as clearSession } from '../store/axios';

export type IAuthContext = {
    email: string; 
    lastName: string;
    firstName: string;
    cookies: any; 
    classID: string;
    schoolName: string;
    schoolID: string;
    integrationName: string | null;
    username: string;
    userID: string;
    isAuthenticated: boolean; 
    storeTestAttendanceId: any;
    testAttendanceId: any;
    authToggle: any;
    loggedinUser: any;
    storeClassId(clasId: string): void;
    setSchoolName(schoolName: string): void;

    studentForm(firstName: string, lastName: string, email: string): void;
    role: string;
    setRole: any;
    languageCode: any;
    setLanguageCode: any;
    languages: any;
    setLanguages: any;
    logout(): void;
}

export const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [cookies] = useCookies([]);
    const [username, setUsername] = React.useState('');
    const [userID, setUserID] = React.useState('');
    const [schoolID, setSchoolID] = React.useState('');
    const [schoolName, setSchoolName] = React.useState('');
    const [integrationName, setIntegrationName] = React.useState<string | null>(null);

    const [testAttendanceId, setTestAttendanceId] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    var [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [classID, setClassID] = React.useState('');
    const [role, setRole] = React.useState('');
    const [languageCode, setLanguageCode] = React.useState('en');
    const [languages, setLanguages] = React.useState({});

    const authToggle = ()=> {
        setIsAuthenticated(!isAuthenticated);
    }

    const loggedinUser = (userID: string, username: string, schoolName: string, schoolID: string) => {
        setUserID(userID);
        setUsername(username);
        setSchoolName(schoolName);
        setSchoolID(schoolID);
    }

    const storeClassId = (classId: string) => {
        setClassID(classId);
    }

    const storeTestAttendanceId = (id: string) => {
        setTestAttendanceId(id);
    }
    
    const studentForm = (firstName: string, lastName: string, email: string) => {
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
    }

    const logout = React.useCallback(() => {
        sessionStorage.clear();
        clearSession();
    }, []);
    // checkCookie() {
    //     const { cookies } = this.context;
        
    //     if(cookies === undefined){
    //         this.props.history.push('/professor-login')
    //     }
    //     else {
    //         return
    //     }
    // }

    
    return ( 
        <AuthContext.Provider value={{ 
            email, 
            lastName, 
            firstName, 
            cookies, 
            classID, 
            schoolName, 
            setSchoolName,
            schoolID, 
            integrationName,
            username, 
            userID, 
            isAuthenticated, 
            storeTestAttendanceId, 
            testAttendanceId, 
            authToggle, 
            loggedinUser, 
            storeClassId, 
            studentForm, 
            role, 
            setRole,
            languageCode,
            setLanguageCode,
            languages,
            setLanguages,
            logout
        }}>
            {children}
        </AuthContext.Provider>

        
     );
}
 
export default AuthContextProvider;