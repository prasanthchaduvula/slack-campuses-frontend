import React from 'react';
import { withRouter } from 'react-router-dom';

class TypeChat extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: '',
      inputValue: '',
      BTN_VALUE: 'Send'
    };
  }

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ msg: '', [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { inputValue } = this.state;
    if (!inputValue) {
      this.setState({ msg: 'Message should not be empty' });
    }
    if (!navigator.onLine) {
      this.setState({ msg: 'Check your internet connection' });
    }

    // create campus
    if (inputValue && navigator.onLine) {
      let { channelId } = this.props.match.params;
      this.setState({ BTN_VALUE: 'Sending' });
      fetch(`/api/v1/messages/${channelId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.fomotoken
        },
        body: JSON.stringify({
          text: inputValue
        })
      })
        .then(res => res.json())
        .then(data => {
          if (!data.success) {
            this.setState({ msg: data.message, BTN_VALUE: 'Send' });
          }
          if (data.success) {
            this.setState({ inputValue: '', BTN_VALUE: 'Send' });
          }
          console.log(data);
        });
    }
  };

  render() {
    let { inputValue, msg, BTN_VALUE } = this.state;

    return (
      <div className="message-compose-box">
        <form className="message-compose-form">
          <label className="block label-portal-error">{msg}</label>
          <textarea
            className="compose-input"
            type="textarea"
            rows="3"
            name="inputValue"
            placeholder="Message here"
            value={inputValue}
            onChange={this.handleChange}
          />
          <div className="msg-send-position">
            <button
              className={`float-right btn  before-portal-btn margin-bottom-1rem margin-right-1rem ${
                inputValue ? 'portal-btn' : ''
              }`}
              onClick={this.handleSubmit}
            >
              {BTN_VALUE}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(TypeChat);
