import React from 'react';
import TypeChat from './TypeChat';
import { withRouter, NavLink } from 'react-router-dom';

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    let { CHAT } = this.props;
    return (
      <>
        <div className="chat-page">
          {CHAT &&
            CHAT.map(message => (
              <div className="only-flex msg">
                <img className="msg-dp" src={message.userId.dp} alt="userdp" />
                <div className="msg-details">
                  <div className="only-flex align-items-center">
                    <NavLink to="/" className="msg-username">
                      {message.userId.name}
                    </NavLink>
                    <p className="msg-time">
                      {new Intl.DateTimeFormat('en-GB', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(new Date(message.createdAt))}
                    </p>
                  </div>

                  <p className="msg-text">{message.text}</p>
                </div>
              </div>
            ))}
        </div>
        <TypeChat />
      </>
    );
  }
}

export default withRouter(Chat);
