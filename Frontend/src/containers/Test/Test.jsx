import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../../components/Button/Button';
import ResultBox from '../../components/ResultBox/ResultBox';
import TestPage from '../TestPage/TestPage';
import styles from './Test.module.scss';

export default class Test extends Component {
    constructor(props) {
        super(props);
        const data = props?.location?.state;

        const questions = [];
        for (let i = 0; i < data?.questions.length; i++) {
            const question = data?.questions[i];
            for (let j = 0; j < question?.variants.length; j++) {
                const variant = question?.variants[j];
                variant['checked'] = false;
            }

            questions[i] = question;
        }

        this.state = {
            id: data?.id,
            name: data?.name,
            questions,
            currentQuestion: data?.questions[0],
            questionIndex: 0,
            isCompleted: false,
            answers: [],
            backToMenu: false,
        };
    }

    onPreviousQuestion = () => {
        const { questions } = this.state;
        let { questionIndex } = this.state;
        questionIndex--;

        this.setState({
            questionIndex,
            currentQuestion: questions[questionIndex],
        });
    };

    onNextQuestion = (answer) => {
        const { questions, currentQuestion, answers } = this.state;
        let { questionIndex } = this.state;

        const { isAnswer } = answer;
        answers[questionIndex] = isAnswer;
        questions[questionIndex] = currentQuestion;

        questionIndex++;

        this.setState({
            questionIndex,
            questions,
            currentQuestion: questions[questionIndex],
            answers,
        });

        if (questionIndex === questions.length) {
            this.setState({ isCompleted: true });
        }
    };

    onEndTestClick = () => {
        this.setState({ backToMenu: true });
    };

    render() {
        const {
            id,
            name,
            questions,
            currentQuestion,
            questionIndex,
            isCompleted,
            answers,
            backToMenu,
        } = this.state;

        return (
            <div>
                {!isCompleted ? (
                    <TestPage
                        key={id}
                        testName={name}
                        question={currentQuestion}
                        currentQuestion={questionIndex}
                        onPreviousQuestion={this.onPreviousQuestion}
                        onNextQuestion={this.onNextQuestion}
                    />
                ) : (
                    <div className={styles.resultWrapper}>
                        <h1>Results</h1>
                        {questions.map((question, index) => {
                            return (
                                <ResultBox
                                    key={question?.id}
                                    question={question?.body}
                                    isCorrect={answers[index]}
                                />
                            );
                        })}
                        <Button onClick={this.onEndTestClick}>Back</Button>
                        {backToMenu ? (
                            <Redirect
                                to={{
                                    pathname: '/home',
                                }}
                            />
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
}
