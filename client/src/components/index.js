import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { AlertList } from 'react-bs-notifier';
import { connect } from 'react-redux';
import { firebaseAuth } from '../config/config';
import { logout } from '../helpers/auth';
import Header from './layout/header';
import Login from './pages/login';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import { dismissAlert } from '../actions/alerts';
import { logoutSuccess, loginSuccess } from '../actions/auth';

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

class App extends PureComponent {

  constructor() {
    super();
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.props.onLogin();
      } else {
        this.props.onLogout();
      }
    });
  }

  componentWillUnmount() {
    this.removeListener()
  }

  log_out = () => {
    logout();
  };

  render() {
    const { loggedIn } = this.props;
    return (
      <BrowserRouter>
        <div>
          <AlertList timeout={4000} dismissTitle="Dismiss" alerts={this.props.alerts}
                     onDismiss={this.props.onDismissAlert}/>
          <Header loggedIn={loggedIn} logout={this.log_out}/>
          <div className="container">
            <div className="row">
              <Switch>
                <PublicRoute authed={loggedIn} path='/' exact component={Home}/>
                <PublicRoute authed={loggedIn} path='/login' component={Login}/>
                <PublicRoute authed={loggedIn} path='/register' component={Register}/>
                <PrivateRoute authed={loggedIn} path='/dashboard' component={Dashboard}/>
                <Route render={() => <h3>No Match</h3>}/>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  const {
    alerts,
    loggedIn
  } = state;
  return {
    alerts,
    loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDismissAlert: alert => {
      dispatch(dismissAlert(alert));
    },
    onLogin: () => {
      dispatch(loginSuccess());
    },
    onLogout: () => {
      dispatch(logoutSuccess());
    }
  }
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
