import React from 'react';
import Button from '../../components/Button/Button';
import Variant from '../../components/Question/Variant';

const TestPage = (props) => {
    const {
        onNextQuestion,
        onPreviousQuestion,
        testName,
        question,
        currentQuestion,
        page,
    } = props;

    const questionMessage = `${page + 1} Question`;
    const { body, variants } = question;

    return (
        <div>
            <div>
                <h1>{testName}</h1>
                <h3>{questionMessage}</h3>
                <h4>{body}</h4>
            </div>
            <div>
                {variants.map((variant) => (
                    <Variant key={variant?.id} variant={variant} />
                ))}
            </div>
            <Button onClick={onNextQuestion}></Button>
            {page ? <Button onClick={onPreviousQuestion}></Button> : null}
        </div>
    );
};

export default TestPage;
