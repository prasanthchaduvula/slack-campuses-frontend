import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import CreateCampus from './campus/sidebar/CreateCampus';
import { currentUser } from './Fetch';
import CampusesSb from './campus/sidebar/CampusesSb';
import CampusSb from './campus/selectedcamp/CampusSb';
import CreateChannel from './campus/selectedcamp/CreateChannel';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      USER: '',
      CAMPUS: ''
    };
  }
  componentDidMount() {
    currentUser(this.fetchUser);
  }

  fetchUser = data => {
    this.setState({ USER: data.user });
  };

  handleCampus = value => {
    this.setState({ CAMPUS: value });
  };

  oAuth = token => {
    if (token === 'undefined' || !token) return;
    localStorage.setItem('fomotoken', token);
    this.props.history.push('/');
  };

  render() {
    let { USER, CAMPUS } = this.state;
    return (
      <div className="App">
        <Menu />
        <Switch>
          <Route exact path="/campuses">
            <CampusesSb USER={USER} handleCampus={this.handleCampus} />
          </Route>

          <Route exact path="/campuses/create">
            <div className="only-flex">
              <CampusesSb USER={USER} />
              <CreateCampus />
            </div>
          </Route>

          <Route exact path="/campuses/:campusname">
            <CampusSb CAMPUS={CAMPUS} />
          </Route>

          <Route exact path="/campuses/:campusname/create">
            <div className="only-flex">
              <CampusSb CAMPUS={CAMPUS} />
              <CreateChannel />
            </div>
          </Route>

          <Route exact path="/oauth">
            {this.oAuth(this.props.location.search.split('=')[1])}
          </Route>
        </Switch>

        {/* {localStorage.fomotoken ? (
            <Test />
          ) : (
            <a href="http://localhost:3000/auth/google">get started</a>
          )} */}
      </div>
    );
  }
}

export default withRouter(App);
