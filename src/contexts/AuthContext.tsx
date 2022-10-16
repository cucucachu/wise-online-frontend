import * as React from 'react';
import type { FC, PropsWithChildren } from 'react';
import { useCookies } from 'react-cookie';
import { checkLogin, logout as clearSession } from '../store/axios';
import { User, UserLoginData, School } from '../types';

export type IAuthContext = {
    user: User | null;
    school: School | null;

    classID: string;
    storeTestAttendanceId: any;
    testAttendanceId: any;
    setInfoFromCreateSchool(info: { userID: string, schoolName: string, schoolID: string }): void;
    storeClassId(clasId: string): void;
    languageCode: any;
    setLanguageCode: any;
    languages: any;
    setLanguages: any;
    logout(): void;
}

const WISE_USER_LS_KEY = 'wise_user';
const WISE_SCHOOL_LS_KEY = 'wise_school';

const loadJsonFromLocalStorage = <T extends unknown>(key: string): T | null => {
    try {
        const result = window.localStorage.getItem(WISE_USER_LS_KEY);
        if (result) {
            const parsedResult = JSON.parse(result) as T;
            return parsedResult;
        }

        return null;
    } catch {
        return null;
    }
}

const loadUserFromLocalStorage = (): User | null => {
    return loadJsonFromLocalStorage(WISE_USER_LS_KEY);
};

const loadSchoolFromLocalStorage = (): School | null => {
    return loadJsonFromLocalStorage(WISE_SCHOOL_LS_KEY);
};

export const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null)
    const [school, setSchool] = React.useState<School | null>(null)

    const [testAttendanceId, setTestAttendanceId] = React.useState('');
    const [classID, setClassID] = React.useState('');
    const [languageCode, setLanguageCode] = React.useState('en');
    const [languages, setLanguages] = React.useState({});

    const setInfoFromCreateSchool = (info: { userID: string, schoolName: string, schoolID: string }) => {
        setUser({
            id: info.userID,
            name: '',
            role: '',
        });

        setSchool({
            id: info.schoolID,
            name: info.schoolName,
            integrationName: null,
        })
    }

    const storeClassId = (classId: string) => {
        setClassID(classId);
    }

    const storeTestAttendanceId = (id: string) => {
        setTestAttendanceId(id);
    }

    React.useEffect(() => {
        const storedUser = loadUserFromLocalStorage();
        if (storedUser) {
            setUser(storedUser);
        }

        // TODO: Load school?
    }, []);

    React.useEffect(() => {
        if (!user) {
            return;
        }

        const checkSession = async () => {
            try {
                const response = await checkLogin();
        
                if (response.status === 200) {
                    onLogin(response.data);
                }
            } catch (error) {
            console.log(error);
            }
        }
        
        checkSession();

        const handle = setInterval(() => {
            checkSession();
        }, 1000 * 60);

        return () => {
            clearInterval(handle);
        }
    }, [user]);
    
    const onLogin = React.useCallback((loginData: UserLoginData) => {
        setSchool(loginData.school);
        setUser({
            id: loginData.id,
            name: loginData.name,
            role: loginData.role,
        });
    
    }, []);

    const logout = React.useCallback(() => {
        sessionStorage.clear();
        clearSession();
        setUser(null);
        setSchool(null);
    }, []);
    
    return ( 
        <AuthContext.Provider value={{ 
            classID, 
            school,
            user,
            storeTestAttendanceId, 
            testAttendanceId, 
            setInfoFromCreateSchool, 
            storeClassId, 
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