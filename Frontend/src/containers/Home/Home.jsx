import React, { Component } from 'react';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: []
        };
    }

    componentDidMount() {
        this.fetchTests();
    }

    fetchTests() {
        const { tests } = this.state;
    }
};