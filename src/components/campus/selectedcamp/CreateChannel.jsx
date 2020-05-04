import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';

class CreateChannel extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: '',
      inputValue: '',
      private: false,
      BTN_VALUE: 'Create'
    };
  }

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ msg: '', [name]: value.split(' ').join('').toLowerCase() });
    if (value.charAt(0) !== '#') {
      this.setState({ msg: 'Channel should start with #' });
    }
    let { CAMPUS } = this.props;
    if (
      CAMPUS &&
      CAMPUS.channels.includes(value.split(' ').join('').toLowerCase())
    ) {
      this.setState({ msg: 'That name is already taken by a channel, ' });
    }
  };

  handlePrivate = () => {
    this.setState({ private: !this.state.private });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { inputValue } = this.state;
    let { CAMPUS } = this.props;

    if (!inputValue) {
      this.setState({ msg: "Don't forget to name your channel" });
    }
    if (!navigator.onLine) {
      this.setState({ msg: 'Check your internet connection' });
    }

    // create channel
    if (inputValue && navigator.onLine) {
      this.setState({
        BTN_VALUE: 'Creating'
      });
      fetch(`/api/v1/channels/${CAMPUS._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.fomotoken
        },
        body: JSON.stringify({
          name: inputValue,
          private: this.state.private
        })
      })
        .then(res => res.json())
        .then(data => {
          if (!data.success) {
            this.setState({ msg: data.message, BTN_VALUE: 'Create' });
          }
          if (data.success) {
            this.setState({ BTN_VALUE: 'Create' });
            this.props.history.push(`/campuses/${CAMPUS.name}/${CAMPUS._id}`);
          }
          console.log(data);
        });
    }
  };

  render() {
    let { msg, inputValue, BTN_VALUE } = this.state;
    let { campusname, campusId } = this.props.match.params;
    return (
      <>
        <div className="flex portal">
          <div className="portal-wrapper">
            <div className="space-flex portal-topitem">
              <p className="portal-heading">Create a channel</p>
              <NavLink
                to={`/campuses/${campusname}/${campusId}`}
                className="portal-close"
              >
                <IoMdClose />
              </NavLink>
            </div>
            <p className="portal-subheading">
              Channels are where your team communicates. They’re best when
              organized around a topic — #marketing, for example.
            </p>
            <form>
              <label className="block label-heading">Name</label>
              <label className="block label-portal-error">{msg}</label>
              <input
                className="block portal-input"
                type="text"
                name="inputValue"
                placeholder="e.g. #javascript"
                value={inputValue}
                onChange={this.handleChange}
              />
              <label className="block label-heading">Make private</label>

              <div className="space-flex">
                <p className="portal-subheading">
                  {this.state.private
                    ? 'This can’t be undone. A private channel cannot be made public later on.'
                    : 'When a channel is set to private, it can only be viewed or joined by invitation'}
                </p>
                <div onClick={this.handlePrivate}>
                  {this.state.private ? (
                    <BsToggleOn className="margin-left-5rem toggle" />
                  ) : (
                    <BsToggleOff className="margin-left-5rem toggle" />
                  )}
                </div>
              </div>
              <button
                className={`float-right btn  before-portal-btn  margin-top-1rem${
                  inputValue ? 'portal-btn' : ''
                }`}
                onClick={this.handleSubmit}
              >
                {BTN_VALUE}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(CreateChannel);
