import React from 'react';
import authTokens from '../../global/js/authTokens';
import axiosInstance from '../../global/js/axiosInstance';
import credentials from '../../global/js/credentials';
import NavBar from '../NavBar/NavBar';
import styles from './Layout.module.scss';

const Layout = (props) => {
    const { children } = props;

    const isAuthenticated = authTokens.valid();

    const handleLogout = () => {
        const { onLogout } = props;
        axiosInstance.post('auth/logout').then(() => {
            authTokens.reset();
            credentials.reset();
            onLogout();
        });
    };

    return (
        <div styles={styles.layoutWrapper}>
            {isAuthenticated ? <header>
                <h1>TestCreator</h1>
                <NavBar handleLogout={handleLogout} />
            </header> : null}
            <main>{children}</main>
        </div>
    );
};

export default Layout;
