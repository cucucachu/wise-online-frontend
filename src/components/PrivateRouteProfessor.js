import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRouteProfessor = ({component: Component, ...rest}) => {
    const { cookies } = useContext(AuthContext)
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            cookies ?
                <Component {...props} />
            : <Redirect to="/professor-login" />
        )} />
    );
};

export default PrivateRouteProfessor