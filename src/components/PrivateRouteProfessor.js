import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteProfessor = ({component: Component, ...rest}) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn')
    
    return (
        <Route {...rest} render={props => (
            isLoggedIn ?
                <Component {...props} />
            : <Redirect to="/professor-login" />
        )} />
    );
};

export default PrivateRouteProfessor