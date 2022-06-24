import React, { Component } from 'react';
import TestPage from '../TestPage/TestPage';

export default class Test extends Component {
    constructor(props) {
        super(props);
        const data = props?.location?.state;

        this.state = {
            id: data?.id,
            name: data?.name,
            questions: data?.questions,
            currentQuestion: data?.questions[0],
            questionIndex: 0,
            isCompleted: false,
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

    onNextQuestion = () => {
        const { questions } = this.state;
        let { questionIndex } = this.state;
        if (questionIndex + 1 === questions.length) {
            this.setState({ isCompleted: true });
            return;
        }

        questionIndex++;

        this.setState({
            questionIndex,
            currentQuestion: questions[questionIndex],
        });
    };

    render() {
        const { id, name, currentQuestion, questionIndex, isCompleted } = this.state;
        let page = 0;

        return (
            <div>
                {!isCompleted ? (
                    <TestPage
                        key={id}
                        testName={name}
                        question={currentQuestion}
                        currentQuestion={questionIndex}
                        page={page++}
                        onPreviousQuestion={this.onPreviousQuestion}
                        onNextQuestion={this.onNextQuestion}
                    />
                ) : (
                    <div>Results</div>
                )}
            </div>
        );
    }
}
