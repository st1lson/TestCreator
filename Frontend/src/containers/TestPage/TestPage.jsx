import React from 'react';
import Button from '../../components/Button/Button';
import Variant from '../../components/Question/Variant';
import styles from './TestPage.module.scss';

const TestPage = (props) => {
    const {
        onNextQuestion,
        onPreviousQuestion,
        testName,
        question,
        currentQuestion,
    } = props;

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
                    <Variant key={variant?.id} variant={variant} />
                ))}
            </div>
            <div className={styles.nextButton}>
                <Button onClick={onNextQuestion}>Next question</Button>
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
