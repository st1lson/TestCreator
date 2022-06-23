import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Auth/Home/Home';
import Login from './containers/Auth/Login/Login';
import authToken from './global/js/authTokens';
import credentials from './global/js/credentials';
import Layout from './components/Layout/Layout';

export default class App extends Component {
    constructor(props) {
        super(props);

        if (!authToken.valid()) {
            credentials.reset();
            authToken.reset();
        }

        this.state = {
            user: credentials.get(),
            isAuthenticated: authToken.valid(),
        };
    }

    onLogin = () => {
        this.setState({
            user: credentials.get(),
            isAuthenticated: authToken.valid(),
        });
    };

    onLogout = () => {
        this.setState({
            user: null,
            isAuthenticated: false,
        });
    };

    render() {
        const { isAuthenticated } = this.state;

        console.log(isAuthenticated);
        return (
            <Layout onLogout={this.onLogout}>
                {isAuthenticated ? (
                    <Switch>
                        <Route path="/home" exact>
                            <Home />
                        </Route>
                        <Redirect to="/home" />
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/login">
                            <Login onLogin={this.onLogin} />
                        </Route>
                        {/* <Route path="/register">
                            <Register onLogin={this.onLogin} />
                        </Route> */}
                        <Redirect to="/login" />
                    </Switch>
                )}
            </Layout>
        );
    }
}
