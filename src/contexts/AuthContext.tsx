import { createContext, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { useCookies } from 'react-cookie';

export type IAuthContext = {
    email: string; 
    lastName: string;
    firstName: string;
    cookies: any; 
    classID: string;
    schoolName: string;
    schoolID: string;
    username: string;
    userID: string;
    isAuthenticated: boolean; 
    storeTestAttendanceId: any;
    testAttendanceId: any;
    authToggle: any;
    loggedinUser: any;
    toggleCreated: any;
    storeClassId: any;
    studentForm(firstName: string, lastName: string, email: string): void;
    role: string;
    setRole: any;
    languageCode: any;
    setLanguageCode: any;
    languages: any;
    setLanguages: any;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
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
    const [role, setRole] = useState('');
    const [languageCode, setLanguageCode] = useState('en');
    const [languages, setLanguages] = useState({});

    const authToggle = ()=> {
        setIsAuthenticated(!isAuthenticated);
    }

    const toggleCreated = () => {
        setIsCreated(!isCreated);
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

    return ( 
        <AuthContext.Provider value={{ 
            email, 
            lastName, 
            firstName, 
            cookies, 
            classID, 
            schoolName, 
            schoolID, 
            username, 
            userID, 
            isAuthenticated, 
            storeTestAttendanceId, 
            testAttendanceId, 
            authToggle, 
            loggedinUser, 
            toggleCreated, 
            storeClassId, 
            studentForm, 
            role, 
            setRole,
            languageCode,
            setLanguageCode,
            languages,
            setLanguages
        }}>
            {children}
        </AuthContext.Provider>

        
     );
}
 
export default AuthContextProvider;