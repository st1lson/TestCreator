import React from 'react';

const Variant = (props) => {
    const { variant, currentQuestion } = props;
    const { body } = variant;
    const questionMessage = `${currentQuestion + 1} Question`;

    return (
        <div>
            {body}
        </div>
    );
};

export default Variant;
