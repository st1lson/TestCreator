import React, { useState } from 'react';
import Button from '../Button/Button';
import styles from './TestBox.module.scss';
import Popup from '../Popup/Popup';
import Checkbox from '../Checkbox/Checkbox';

const TestBox = (props) => {
    const [isStarting, start] = useState(false);
    const [proceeded, proceed] = useState(false);
    const [isEnabled, enable] = useState(false);
    const [details, changeDetails] = useState('Check details');

    const onDetailsClick = () => {
        const newDetails = !isEnabled ? 'Hide details' : 'Check details';
        changeDetails(newDetails);
        enable(!isEnabled);
    };
    const { test } = props;
    const { name, description } = test;

    const popup = isStarting ? (
        <Popup onDismiss={() => start(!isStarting)}>
            <div className={styles.popupWrapper}>
                <div className={styles.textWrapper}>
                    <h1>{name}</h1>
                    <h4>{description}</h4>
                </div>
                <Checkbox
                    className={styles.checkbox}
                    value={proceeded}
                    onChange={() => proceed(!proceeded)}>
                    I agree to start
                </Checkbox>
                <Button disabled={!proceeded}>Proceed</Button>
            </div>
        </Popup>
    ) : null;

    return (
        <>
            {popup}
            <div className={styles.container}>
                <div className={styles.testHeader}>
                    <h1>{name}</h1>
                    <Button onClick={() => start(!isStarting)}>Start</Button>
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
        </>
    );
};

export default TestBox;
