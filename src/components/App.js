import React from 'react';
import { withRouter, Route } from 'react-router-dom';

class App extends React.Component {
  oAuth = token => {
    if (token == 'undefined' || !token) return;
    localStorage.setItem('token', token);
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="http://localhost:3000/auth/google">get started</a>
        </header>
        <Route exact path="/oauth">
          {this.oAuth(this.props.location.search.split('=')[1])}
        </Route>
      </div>
    );
  }
}

export default withRouter(App);
