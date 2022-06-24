import React, { Component } from 'react';
import TestPage from '../TestPage/TestPage';

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
        if (questionIndex + 1 === questions.length) {
            this.setState({ isCompleted: true });
            return;
        }

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

        console.log(currentQuestion);
    };

    render() {
        const {
            id,
            name,
            currentQuestion,
            questionIndex,
            isCompleted,
            answers,
        } = this.state;

        console.log(answers);

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
                    <div>
                        Results
                    </div>
                )}
            </div>
        );
    }
}
