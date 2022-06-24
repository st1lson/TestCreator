import React from 'react';
import './Button.module.scss';

const Button = (props) => {
    const { onClick, disabled, children } = props;

    return (
        <button disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
