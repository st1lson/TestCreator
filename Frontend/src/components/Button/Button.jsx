import React from 'react';
import './Button.module.scss';

const Button = (props) => {
    const { onClick, children } = props;

    return <button onClick={onClick}>{children}</button>;
};

export default Button;
