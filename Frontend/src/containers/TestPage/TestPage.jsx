import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Variant from '../../components/Variant/Variant';
import styles from './TestPage.module.scss';

const TestPage = (props) => {
    const [answer, selectAnswer] = useState(null);

    const {
        onNextQuestion,
        onPreviousQuestion,
        testName,
        question,
        currentQuestion,
    } = props;

    const onCheckboxChange = (e) => {
        const { name } = e.target;
        for (let i = 0; i < variants.length; i++) {
            const element = variants[i];
            if (element?.id === name) {
                element.checked = true;
                selectAnswer(element);
                continue;
            }

            element.checked = false;
        }
    };

    const questionMessage = `${currentQuestion + 1} Question`;
    const { body, variants } = question;

    return (
        <div>
            <div className={styles.headerWrapper}>
                <h1>{testName}</h1>
                <h3>{questionMessage}</h3>
                <h4>{body}</h4>
            </div>
            <div className={styles.bodyWrapper}>
                {variants.map((variant) => (
                    <Variant
                        key={variant?.id}
                        name={variant?.id}
                        value={variant?.checked}
                        variant={variant}
                        onChange={onCheckboxChange}
                    />
                ))}
            </div>
            <div className={styles.nextButton}>
                <Button onClick={() => onNextQuestion(answer)}>
                    Next question
                </Button>
            </div>
            {currentQuestion ? (
                <div className={styles.previousButton}>
                    <Button onClick={onPreviousQuestion}>
                        Previus question
                    </Button>
                </div>
            ) : null}
        </div>
    );
};

export default TestPage;
