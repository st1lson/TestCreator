import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../global/js/axiosInstance';
import AuthBox from '../../../components/AuthBox/AuthBox';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import credentials from '../../../global/js/credentials';
import authTokens from '../../../global/js/authTokens';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isLoading: false,
        };
    }

    onLoginClick = () => {
        const { userName, password } = this.state;

        if (!userName || !password) {
            return;
        }

        this.setState({ isLoading: true });

        axiosInstance
            .post('/auth/login', { userName, password })
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
        const { userName, password } = this.state;

        return (
            <AuthBox>
                <Input
                    label="Enter your user name"
                    value={userName}
                    type="text"
                    name="userName"
                    onChange={this.onInputChange}
                />
                <Input
                    label="Enter your password"
                    value={password}
                    type="password"
                    name="password"
                    onChange={this.onInputChange}
                />
                <Button onClick={this.onLoginClick}>Login</Button>
                <div className="toRegister">
                    <Link
                        to="/register"
                        style={{
                            color: '#000',
                        }}>
                        Create new account
                    </Link>
                </div>
            </AuthBox>
        );
    }
}
