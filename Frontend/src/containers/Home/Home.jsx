import React, { Component } from 'react';
import TestBox from '../../components/TestBox/TestBox';
import axiosInstance from '../../global/js/axiosInstance';
import styles from './Home.module.scss';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tests: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        this.fetchTests();
    }

    fetchTests() {
        this.setState({ isLoading: true });

        axiosInstance
            .get('/test')
            .then((res) => {
                this.setState({ tests: res.data });
            })
            .finally(() => this.setState({ isLoading: false }));
    }

    render() {
        const { tests } = this.state;

        return (
            <div className={styles.homeWrapper}>
                {tests.map((test) => {
                    return <TestBox key={test?.id} test={test} />;
                })}
            </div>
        );
    }
}
