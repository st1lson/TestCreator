import { Component } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Home from './containers/Home/Home';
import Login from './containers/Auth/Login/Login';
import Register from './containers/Auth/Register/Register';
import authTokens from './global/js/authTokens';
import credentials from './global/js/credentials';
import Layout from './components/Layout/Layout';
import Test from './containers/Test/Test';

export default class App extends Component {
    constructor(props) {
        super(props);

        if (!authTokens.valid()) {
            credentials.reset();
            authTokens.reset();
        }

        this.state = {
            user: credentials.get(),
            isAuthenticated: authTokens.valid(),
            afterLogin: false,
        };
    }

    onLogin = () => {
        this.setState({
            user: credentials.get(),
            isAuthenticated: authTokens.valid(),
            afterLogin: true,
        });
    };

    onLogout = () => {
        this.setState({
            user: null,
            isAuthenticated: false,
        });
    };

    render() {
        const { isAuthenticated, afterLogin } = this.state;

        return (
            <Layout onLogout={this.onLogout}>
                {isAuthenticated ? (
                    <Switch>
                        <Route exact path="/home">
                            <Home />
                        </Route>
                        <Route
                            path="/home/test"
                            render={(props) => <Test {...props} />}
                        />
                        <Redirect exact from="/" to="/home" />
                        <Redirect exact from="/login" to="/home" />
                        <Redirect exact from="/register" to="/home" />
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/login">
                            <Login onLogin={this.onLogin} />
                        </Route>
                        <Route path="/register">
                            <Register onLogin={this.onLogin} />
                        </Route>
                        <Redirect to="/login" />
                    </Switch>
                )}
            </Layout>
        );
    }
}
