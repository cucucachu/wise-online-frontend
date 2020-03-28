import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRouteStudent = ({component: Component, ...rest}) => {
    const { isAuthenticated } = useContext(AuthContext)
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isAuthenticated ?
                <Component {...props} />
            : <Redirect to="/student-login" />
        )} />
    );
};

export default PrivateRouteStudent