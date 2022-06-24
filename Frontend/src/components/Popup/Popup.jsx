import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Popup.module.scss';

const Popup = (props) => {
    const { children, onDismiss } = props;

    return (
        <>
            <Backdrop onClick={onDismiss} />
            <div className={styles.Popup}>{children}</div>
        </>
    );
};

export default Popup;
