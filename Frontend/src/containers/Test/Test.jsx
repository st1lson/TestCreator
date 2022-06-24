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
            currentQuestion: 0,
        };
    }

    onPreviousQuestion() {
        console.log('previous');
    }

    onNextQuestion() {
        console.log('next');
    }

    render() {
        const { id, name, questions, currentQuestion } = this.state;
        let page = 0;

        return (
            <div>
                {questions.map((question) => (
                    <TestPage
                        key={id}
                        testName={name}
                        question={question}
                        currentQuestion={currentQuestion}
                        page={page++}
                        onPreviousQuestion={this.onPreviousQuestion}
                        onNextQuestion={this.onNextQuestion}
                    />
                ))}
            </div>
        );
    }
}
