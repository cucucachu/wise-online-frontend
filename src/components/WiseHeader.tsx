import React from 'react';
import { useHistory } from 'react-router-dom';
import chevronIcon from '../Assets/images/chevron-left.svg';
import { AuthContext } from '../contexts/AuthContext';
import {
    getLanguageCode,
    getSupportedLanguages,
    i18n,
    setLanguage
} from 'web-translate';
import { useAuth } from '../hooks';

export const WiseHeader: React.FC<{}> = (props) => {
    const auth = useAuth();
    const history = useHistory();
    const authContext = React.useContext(AuthContext)!;

    const languageCode = authContext.languageCode;
    const languages = authContext.languages;
    const languageNames = Object.keys(languages);

    React.useEffect(() => {
        (async () => {
            if (!languageCode) {
                const assumedlanguageCode = getLanguageCode();
                authContext.setLanguageCode(assumedlanguageCode);
            }

            const languages = await getSupportedLanguages();
            authContext.setLanguages(languages);        
        })()
    }, []);

    const changeLanguage: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(async event => {
        const languageCode = event.target.value;
        await setLanguage(languageCode);
        authContext.setLanguageCode(languageCode);
    }, [authContext]);
    
    const handleGoBack: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        history.goBack();
    }

    const handleLogout = async () => {
        history.push("/");
        auth.logout();
    }

    return ( 
        <header>
                <header>
                    <span>
                        &nbsp;<label className="white-text">{i18n("Language:")}</label>&nbsp;
                        <select id="language" onChange={changeLanguage} value={languageCode} className="btn-language-dropdown">
                            {languageNames.map(name => (<option key={name} value={languages[name]}>{name}</option>))}
                        </select>
                    </span>
                </header>

              <div className="logo"></div>
              { history.location.pathname === '/' || 
                history.location.pathname === '/admin/download' ||
                history.location.pathname === '/professor/course' ||
                history.location.pathname === '/student/dashboard'
               ? '' : (<button onClick={handleGoBack} className="btn-backlink"><img src={chevronIcon} className="icon-xs" alt="chevron icon"/>&nbsp;{i18n("Go back")} </button>)}
      
              {
                (() => {
                    if (!!auth.user) {
                        return (
                            <p className="nav-pos">
                                <span className="hide-mobile">
                                    { auth.user.name === undefined ?  i18n('Logged in as ') + auth.school?.name  : i18n('Logged in as ') + auth.user.name} 
                                </span>
                                <button className="btn-s" onClick={handleLogout} >{i18n("Log out")}</button>
                            </p> 
                        )
                    }
                })()
              }
                
          </header>
     );

}
