import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteStudent = ({component: Component, ...rest}) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn')

    return (
        <Route {...rest} render={props => (
            isLoggedIn ?
                <Component {...props} />
            : <Redirect to="/student-login" />
        )} />
    );
};

export default PrivateRouteStudent