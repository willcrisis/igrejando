import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { AlertList } from 'react-bs-notifier';
import PropTypes from 'prop-types';
import { firebaseAuth } from '../config/config';
import { logout } from '../helpers/auth';
import Header from './layout/header';
import Login from './pages/login';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Register from './pages/register';

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

const buildNotification = (type, message, title, timeout) => ({
  id: (new Date()).getTime(),
  type,
  message,
  headline: title,
  timeout: typeof timeout !== 'undefined' ? timeout : 4000
});

export default class App extends PureComponent {
  static childContextTypes = {
    growl: PropTypes.object,
  };

  getChildContext = () => ({
    growl: this.growl
  });

  constructor() {
    super();
    this.state = {
      loggedIn: false,
      loading: true,
      alerts: []
    };

  }

  createAlert = (type, message, title, timeout) => {
    this.setState({ alerts: [ buildNotification(type, message, title, timeout), ...this.state.alerts ] });
  };

  growl = {
    success: (message, title) => this.createAlert('success', message, title),
    info: (message, title) => this.createAlert('info', message, title),
    warning: (message, title) => this.createAlert('warning', message, title),
    error: (message, title) => this.createAlert('danger', message, title, 0),
  };


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

  onAlertDismissed = (alert) => {
    const alerts = this.state.alerts;

    // find the index of the alert that was dismissed
    const idx = alerts.indexOf(alert);

    if (idx >= 0) {
      this.setState({
        // remove the alert from the array
        alerts: [ ...alerts.slice(0, idx), ...alerts.slice(idx + 1) ]
      });
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <AlertList timeout={4000} dismissTitle="Dismiss" alerts={this.state.alerts}
                     onDismiss={this.onAlertDismissed}/>
          <Header loggedIn={this.state.loggedIn} logout={this.log_out}/>
          <div className="container">
            <div className="row">
              <Switch>
                <PublicRoute authed={this.state.loggedIn} path='/' exact component={Home}/>
                <PublicRoute authed={this.state.loggedIn} path='/login' component={Login}/>
                <PublicRoute authed={this.state.loggedIn} path='/register' component={Register} />
                <PrivateRoute authed={this.state.loggedIn} path='/dashboard' component={Dashboard}/>
                <Route render={() => <h3>No Match</h3>}/>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

