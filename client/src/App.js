import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends Component {

  constructor() {
    super();
    this.state = {apiStatus: false};
  }

  componentDidMount() {
    this.fetchStatus();
  }

  async fetchStatus() {
    try {
      let status = await fetch('/status/check');
      status = await status.json();
      this.setState({apiStatus: status.isOK});
    } catch (err) {
      console.log(err);
      this.setState({apiStatus: false});
    }

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          API is {this.state.apiStatus ? 'UP' : 'DOWN'}!
        </p>
      </div>
    );
  }
}

export default App;
