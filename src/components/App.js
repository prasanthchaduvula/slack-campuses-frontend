import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import CreateCampus from './campus/sidebar/CreateCampus';
import { currentUser } from './Fetch';
import CampusesSb from './campus/sidebar/CampusesSb';
import CampusSb from './campus/selectedcamp/CampusSb';
import CreateChannel from './campus/selectedcamp/CreateChannel';
import JoinCampus from './campus/sidebar/JoinCampus';
import socketIOClient from 'socket.io-client';
import Channel from './campus/selectedcamp/channel/Channel';

class App extends React.Component {
  intervalID = 0;
  constructor() {
    super();
    this.state = {
      USER: '',
      CAMPUS: '',
      CHANNEL: '',
      CHAT: '',
      endpoint: 'http://localhost:3000'
    };
  }
  componentDidMount() {
    if (localStorage.fomotoken) {
      currentUser(this.fetchUser);
      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      this.intervalID = setInterval(
        () => socket.emit('currentUser', localStorage.fomouserId),
        4000
      );
      socket.on('currentUserData', data => {
        this.setState({ USER: data });
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.off('currentUserData');
  }

  fetchUser = data => {
    this.setState({ USER: data.user });
  };

  handleCampus = value => {
    this.setState({ CAMPUS: value });
  };

  handleChannel = channel => {
    this.setState({ CHANNEL: channel, CHAT: channel.messagesId.reverse() });
  };

  oAuth = () => {
    const params = new URLSearchParams(window.location.search);
    let token = params.get('t');
    let userId = params.get('id');
    if (token === 'undefined' || !token) return;
    localStorage.setItem('fomotoken', token);
    localStorage.setItem('fomouserId', userId);
    this.props.history.push('/');
  };

  render() {
    let { USER, CAMPUS, CHANNEL, CHAT } = this.state;
    return (
      <div className="App">
        {localStorage.fomotoken ? (
          <>
            <Menu />
            <Switch>
              <Route exact path="/campuses">
                <CampusesSb USER={USER} handleCampus={this.handleCampus} />
              </Route>

              <Route exact path="/campuses/campus/create">
                <div className="only-flex">
                  <CampusesSb USER={USER} handleCampus={this.handleCampus} />
                  <CreateCampus />
                </div>
              </Route>

              <Route exact path="/campuses/campus/join">
                <div className="only-flex">
                  <CampusesSb USER={USER} handleCampus={this.handleCampus} />
                  <JoinCampus />
                </div>
              </Route>

              <Route exact path="/campuses/:campusname/:campusId">
                <CampusSb
                  CAMPUS={CAMPUS}
                  handleCampus={this.handleCampus}
                  handleChannel={this.handleChannel}
                />
              </Route>

              <Route exact path="/campuses/:campusname/:campusId/create">
                <div className="only-flex">
                  <CampusSb
                    CAMPUS={CAMPUS}
                    handleCampus={this.handleCampus}
                    handleChannel={this.handleChannel}
                  />
                  <CreateChannel CAMPUS={CAMPUS} />
                </div>
              </Route>
              <Route
                exact
                path="/campuses/:campusname/:campusId/channels/:channelId"
                render={props => (
                  <div className="only-flex">
                    <CampusSb
                      CAMPUS={CAMPUS}
                      handleCampus={this.handleCampus}
                      handleChannel={this.handleChannel}
                    />
                    <Channel
                      CHANNEL={CHANNEL}
                      CHAT={CHAT}
                      Id={props.match.params.channelId}
                      handleChannel={this.handleChannel}
                    />
                  </div>
                )}
              />
            </Switch>
          </>
        ) : (
          <>
            <Route path="/oauth">{this.oAuth()}</Route>
            <a href="http://localhost:3000/auth/google">get started</a>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(App);
