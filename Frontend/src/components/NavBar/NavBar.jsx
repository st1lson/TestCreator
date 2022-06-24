import React from 'react';
import { Link } from 'react-router-dom';
import authTokens from '../../global/js/authTokens';
import styles from './NavBar.module.scss';

const NavBar = (props) => {
    const { handleLogout } = props;

    const isAuthenticated = authTokens.valid();

    return (
        <nav className={styles.navWrapper}>
            <ul>
                <li>
                    {isAuthenticated ? (
                        <Link
                            onClick={handleLogout}
                            to="/login"
                            style={{
                                textDecoration: 'none',
                                color: '#dddddd',
                            }}>
                            Log out
                        </Link>
                    ) : null}
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
