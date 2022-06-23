import React from 'react';
import './Checkbox.module.scss';

const Checkbox = (props) => {
    const { children, value, onChange } = props;

    return (
        <label>
            <input type="checkbox" checked={value} onChange={onChange} />
            {children}
        </label>
    );
};

export default Checkbox;
