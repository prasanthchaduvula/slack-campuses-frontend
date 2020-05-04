import React from 'react';
import Chat from './Chat';
import { withRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { AiOutlineUser, AiOutlineInfoCircle } from 'react-icons/ai';

class Channel extends React.Component {
  intervalID = 0;
  constructor() {
    super();
    this.state = {
      endpoint: 'http://localhost:3000'
    };
  }

  componentDidMount() {
    let Id = this.props.Id;
    if (localStorage.fomotoken) {
      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      this.intervalID = setInterval(() => socket.emit('channel', Id), 4000);
      socket.on('channelData', data => {
        if (data._id == Id) {
          this.props.handleChannel(data);
        }
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.off('channelData');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.Id !== this.props.Id) {
      clearInterval(this.intervalID);
      let Id = this.props.Id;
      if (localStorage.fomotoken) {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        this.intervalID = setInterval(() => socket.emit('channel', Id), 4000);
        socket.on('channelData', data => {
          if (data._id == Id) {
            this.props.handleChannel(data);
          }
        });
      }
    }
  }

  render() {
    let { CHANNEL, CHAT } = this.props;
    return (
      <div className="rightwidth position-relative">
        <div className="channel-header space-flex">
          <div className="flex">
            <p>{CHANNEL.name}</p>
            <AiOutlineUser />
          </div>
          <AiOutlineInfoCircle />
        </div>
        <Chat CHAT={CHAT} />
      </div>
    );
  }
}

export default withRouter(Channel);
