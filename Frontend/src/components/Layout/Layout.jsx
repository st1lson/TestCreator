import React from 'react';
import authTokens from '../../global/js/authTokens';
import axiosInstance from '../../global/js/axiosInstance';
import credentials from '../../global/js/credentials';
import classes from './Layout.module.scss';

const Layout = (props) => {
    const { children } = props;

    const isAuthenticated = authTokens.valid();

    const handleLogout = () => {
        const { onLogout } = props;
        axiosInstance.post('auth/logout').then(() => {
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
