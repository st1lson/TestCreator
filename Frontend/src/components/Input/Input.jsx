import React from 'react';
import styles from './Input.module.scss';

const Input = (props) => {
    const { label, name, ...otherProps } = props;

    return (
        <div className={styles.inputWrapper}>
            {label ? <label htmlFor={name}>{label}</label> : null}
            <input name={name} {...otherProps}></input>
        </div>
    );
};

export default Input;
