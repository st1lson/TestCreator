import React from 'react';
import styles from './Backdrop.module.scss';

const Backdrop = (props) => {
    const { onClick, children } = props;

    return (
        <div className={styles.Backdrop} onClick={onClick}>
            <div className={styles.BackdropInner}>{children}</div>
        </div>
    );
};

export default Backdrop;
