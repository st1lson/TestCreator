import React, { useState } from 'react';
import Button from '../Button/Button';
import styles from './TestBox.module.scss';
import Backdrop from '../Backdrop/Backdrop';

const TestBox = (props) => {
    const [isEnabled, enable] = useState(false);
    const [details, changeDetails] = useState('Check details');

    const onDetailsClick = () => {
        const newDetails = !isEnabled ? 'Hide details' : 'Check details';
        changeDetails(newDetails);
        enable(!isEnabled);
    };

    const { testName, description } = props;
    return (
        <div className={styles.container}>
            <div className={styles.testHeader}>
                <h1>{testName}</h1>
                <Button onClick={onDetailsClick}>Start</Button>
            </div>
            <div className={styles.testBody}>
                <button
                    className={styles.descriptionButton}
                    onClick={onDetailsClick}>
                    {details}
                </button>
                {isEnabled ? (
                    <div>
                        <h3>Description:</h3>
                        {description}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default TestBox;
