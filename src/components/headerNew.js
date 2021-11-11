import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import chevronIcon from '../Assets/images/chevron-left.svg';

import { AuthContext } from '../contexts/AuthContext';

import {
    getLanguageCode,
    getSupportedLanguages,
    i18n,
    setLanguage
  } from 'web-translate';

class HeaderNew extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }


    async componentDidMount() {
        const languageCode = getLanguageCode();
        const languages = await getSupportedLanguages();
        this.context.setLanguageCode(languageCode);
        this.context.setLanguages(languages);
    };

    changeLanguage = async event => {
        const languageCode = event.target.value;
        await setLanguage(languageCode);
        this.context.setLanguageCode(languageCode);
      };
    
    handleGoBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    async handleLogout() {
        this.props.history.push("/");
        return this.props.handleLogout();
    }

    render() {

        const languageCode = this.context.languageCode;
        const languages = this.context.languages;
        const languageNames = Object.keys(languages);

        return ( 

           

            <header>
                    <header>
                        <span>
                            &nbsp;<label className="white-text">{i18n("Language:")}</label>&nbsp;
                            <select id="language"  onChange={this.changeLanguage} value={languageCode} className="btn-language-dropdown">
                                {languageNames.map(name => (<option key={name} value={languages[name]}>{name}</option>))}
                            </select>
                        </span>
                    </header>

                  <div className="logo"></div>
                  { this.props.history.location.pathname === '/' || 
                    this.props.history.location.pathname === '/admin/download' ||
                    this.props.history.location.pathname === '/professor/course' ||
                    this.props.history.location.pathname === '/student/dashboard'
                   ? '' : (<button onClick={this.handleGoBack} className="btn-backlink"><img src={chevronIcon} className="icon-xs" alt="chevron icon"/>&nbsp;{i18n("Go back")} </button>)}
          
                   
                    


    
                  {
                    (() => {
                        if (this.props.isLoggedIn) {
                            return (
                                <p className="nav-pos">
                                    <span className="hide-mobile">
                                        { this.props.username === undefined ?  i18n('Logged in as ') + this.props.schoolName  : i18n('Logged in as ') + this.props.username} 
                                    </span>
                                    <button className="btn-s" onClick={this.handleLogout} >{i18n("Log out")}</button>
                                </p> 
                            )
                        }
                    })()
                  }
                    
              </header>
         );

    }
}
 
export default withRouter(HeaderNew);