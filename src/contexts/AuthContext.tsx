import * as React from 'react';
import type { FC, PropsWithChildren } from 'react';
import { useCookies } from 'react-cookie';
import { checkLogin, logout as clearSession } from '../store/axios';
import { User, UserLoginData, School } from '../types';
import { logError } from '../Logger';

export type IAuthContext = any & {
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
    onLogin(loginData: UserLoginData): void;
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
    const [user, setUser] = React.useState<User | null>(loadUserFromLocalStorage());
    const setAndStoreUser = React.useCallback((user: User | null) => {
        try {
            if (user) {
                window.localStorage.setItem(WISE_USER_LS_KEY, JSON.stringify(user));
            } else {
                window.localStorage.removeItem(WISE_USER_LS_KEY);
            }
        } catch {}

        setUser(user);
    }, []);

    const [school, setSchool] = React.useState<School | null>(loadSchoolFromLocalStorage());
    const setAndStoreSchool = React.useCallback((school: School | null) => {
        try {
            if (school) {
                window.localStorage.setItem(WISE_SCHOOL_LS_KEY, JSON.stringify(school));
            } else {
                window.localStorage.removeItem(WISE_SCHOOL_LS_KEY);
            }
        } catch {}

        setSchool(school);
    }, []);

    const [testAttendanceId, setTestAttendanceId] = React.useState('');
    const [classID, setClassID] = React.useState('');
    const [languageCode, setLanguageCode] = React.useState('en');
    const [languages, setLanguages] = React.useState({});

    const setInfoFromCreateSchool = (info: { userID: string, schoolName: string, schoolID: string }) => {
        setAndStoreUser({
            id: info.userID,
            name: '',
            role: '',
        });

        setAndStoreSchool({
            id: info.schoolID,
            name: info.schoolName,
            integrationName: null,
            enabledFeatures: [],
        })
    }

    const storeClassId = React.useCallback((classId: string) => {
        setClassID(classId);
    }, []);

    const storeTestAttendanceId = React.useCallback((id: string) => {
        setTestAttendanceId(id);
    }, []);

    React.useEffect(() => {
        if (!user) {
            return;
        }

        let handle: number;
        const checkSession = async () => {
            try {
                await checkLogin();
                setTimeout(() => {
                    checkSession();
                }, 1000 * 60 * 5);
            } catch (error) {
                setAndStoreUser(null);
                setAndStoreSchool(null);
                clearTimeout(handle);
            }
        }

        checkSession();

        return () => {
            clearTimeout(handle);
        }
    }, [user]);
    
    const onLogin = React.useCallback((loginData: UserLoginData) => {
        setAndStoreSchool(loginData.school);
        setAndStoreUser({
            id: loginData.id,
            name: loginData.name,
            role: loginData.role,
        });
    }, []);

    const logout = React.useCallback(() => {
        sessionStorage.clear();
        clearSession();
        setAndStoreUser(null);
        setAndStoreSchool(null);
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
            logout,
            onLogin
        }}>
            {children}
        </AuthContext.Provider>

        
     );
}
 
export default AuthContextProvider;