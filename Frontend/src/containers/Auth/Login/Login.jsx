import React, { Component } from 'react';
import AuthBox from '../../../components/AuthBox/AuthBox';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isLoading: false,
        };
    }

    onLoginClick = () => {};

    render() {
        const { userName, password } = this.state;
        return <>
            <AuthBox>Hello world</AuthBox>
        </>;
    }
}
