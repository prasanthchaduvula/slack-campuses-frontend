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
    console.log('in');
    let { name, value } = event.target;
    this.setState({ msg: '', [name]: value });
    if (value.charAt(0) !== '#') {
      this.setState({ msg: 'Channel should start with #' });
    }
  };

  handlePrivate = () => {
    this.setState({ private: !this.state.private });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { inputValue } = this.state;
    if (!inputValue) {
      this.setState({ msg: "Don't forget to name your campus" });
    }
    this.setState({ BTN_VALUE: 'Creating' });
    // create channel
  };

  render() {
    let { msg, inputValue, BTN_VALUE } = this.state;
    let handle = this.props.match.params.campusname;
    return (
      <>
        <div className="flex portal">
          <div className="portal-wrapper">
            <div className="space-flex portal-topitem">
              <p className="portal-heading">Create a channel</p>
              <NavLink to={`/campuses/${handle}`} className="portal-close">
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
                className={`float-right btn  before-portal-btn ${
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
