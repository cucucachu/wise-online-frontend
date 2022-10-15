import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useIsLoggedIn} from '../hooks';

const PrivateRouteAdmin: React.FC<any> = ({component: Component, ...rest}) => {
    const isLoggedIn = useIsLoggedIn();

    return (
        <Route {...rest} render={props => (
            isLoggedIn ?
                <Component {...props} />
            : <Redirect to="/admin-login" />
        )} />
    );
};

export default PrivateRouteAdmin
