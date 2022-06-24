import React from 'react';
import './Checkbox.module.scss';

const Checkbox = (props) => {
    const { children, value, onChange, ...otherProps } = props;

    return (
        <label>
            <input
                type="checkbox"
                checked={value}
                onChange={onChange}
                {...otherProps}
            />
            {children}
        </label>
    );
};

export default Checkbox;
