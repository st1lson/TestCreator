import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import styles from './Variant.module.scss';

const Variant = (props) => {
    const { variant, onChange, name, value } = props;
    const { body } = variant;

    return (
        <div className={styles.variantWrapper}>
            <Checkbox name={name} onChange={onChange} value={value}>{body}</Checkbox>
        </div>
    );
};

export default Variant;
