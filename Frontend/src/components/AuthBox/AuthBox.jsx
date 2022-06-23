import React from 'react';
import styles from './AuthBox.module.scss';

const AuthBox = (props) => {
    const { children } = props;

    return <div className={styles.wrapper}>{children}</div>;
};

export default AuthBox;
