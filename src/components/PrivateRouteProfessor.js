import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteProfessor = ({component: Component, ...rest}) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn')
    
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLoggedIn ?
                <Component {...props} />
            : <Redirect to="/professor-login" />
        )} />
    );
};

export default PrivateRouteProfessor