import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthBox from '../../../components/AuthBox/AuthBox';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import authTokens from '../../../global/js/authTokens';
import axiosInstance from '../../../global/js/axiosInstance';
import credentials from '../../../global/js/credentials';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            userName: '',
            password: '',
            confirmPassword: '',
            isLoading: false,
        };
    }

    onRegistration = () => {
        const { email, userName, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            return;
        }

        this.setState({ isLoading: true });

        axiosInstance
            .post('/auth/register', { email, userName, password })
            .then((res) => {
                const { jwtToken, refreshToken, userName } = res.data;

                credentials.set(userName);
                authTokens.set(jwtToken, refreshToken);

                const { onLogin } = this.props;

                onLogin();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => this.setState({ isLoading: false }));
    };

    onInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    render() {
        const { email, userName, password, confirmPassword } = this.state;

        return (
            <AuthBox>
                <Input
                    label="Enter your email"
                    value={email}
                    type="text"
                    name="email"
                    onChange={this.onInputChange}
                />
                <Input
                    label="Create your user name"
                    value={userName}
                    type="text"
                    name="userName"
                    onChange={this.onInputChange}
                />
                <Input
                    label="Create your password"
                    value={password}
                    type="password"
                    name="password"
                    onChange={this.onInputChange}
                />
                <Input
                    label="Confirm the password"
                    value={confirmPassword}
                    type="password"
                    name="confirmPassword"
                    onChange={this.onInputChange}
                />
                <Button onClick={this.onRegistration}>Register</Button>
                <div className="toLogin">
                    <Link
                        to="/login"
                        style={{
                            color: '#000',
                        }}>
                        I already have an account
                    </Link>
                </div>
            </AuthBox>
        );
    }
}
