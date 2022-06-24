import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import styles from './Variant.module.scss';

const Variant = (props) => {
    const { variant, currentQuestion } = props;
    const { body } = variant;

    return (
        <div className={styles.variantWrapper}>
            <Checkbox>{body}</Checkbox>
        </div>
    );
};

export default Variant;
