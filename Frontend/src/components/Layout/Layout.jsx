import React from 'react';
import { Outlet } from 'react-router-dom';
import authTokens from '../../global/js/authTokens';
import axiosRESTInstance from '../../global/js/axiosConfig';
import credentials from '../../global/js/credentials';
import classes from './Layout.module.scss';

const Layout = (props) => {
    const { children } = props;

    const isAuthenticated = authTokens.valid();

    const handleLogout = () => {
        const { onLogout } = props;
        axiosRESTInstance.post('auth/logout').then(() => {
            authTokens.remove();
            credentials.remove();
            onLogout();
        });
    };

    return (
        <div
            className={classes.Wrapper}
            isauthenticated={isAuthenticated.toString()}>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
