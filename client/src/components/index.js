import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { firebaseAuth } from '../config/config';
import { logout } from '../helpers/auth';
import Header from './layout/header';
import Login from './pages/login';
import Home from './pages/home';
import Dashboard from './pages/dashboard';

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>}
    />
  )
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard'/>}
    />
  )
}

export default class App extends PureComponent {

  constructor() {
    super();
    this.state = {
      loggedIn: false,
      loading: true
    }
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      this.setState({
        loggedIn: !!user,
        loading: false
      })
    });
  }

  componentWillUnmount() {
    this.removeListener()
  }

  log_out = () => {
    this.setState({ loading: true });
    logout();
    this.setState({ loggedIn: false, loading: false });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header loggedIn={this.state.loggedIn} logout={this.log_out}/>
          <div className="container">
            <div className="row">
              <Switch>
                <PublicRoute authed={this.state.loggedIn} path='/' exact component={Home}/>
                <PublicRoute authed={this.state.loggedIn} path='/login' component={Login}/>
                {/*<PublicRoute authed={this.state.loggedIn} path='/register' component={Register} />*/}
                <PrivateRoute authed={this.state.loggedIn} path='/dashboard' component={Dashboard} />
                <Route render={() => <h3>No Match</h3>}/>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

