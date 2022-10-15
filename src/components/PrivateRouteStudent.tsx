import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useIsLoggedIn} from '../hooks';

const PrivateRouteStudent: React.FC<any> = ({component: Component, ...rest}) => {
    const isLoggedIn = useIsLoggedIn();

    return (
        <Route {...rest} render={props => (
            isLoggedIn ?
                <Component {...props} />
            : <Redirect to="/student-login" />
        )} />
    );
};

export default PrivateRouteStudent
