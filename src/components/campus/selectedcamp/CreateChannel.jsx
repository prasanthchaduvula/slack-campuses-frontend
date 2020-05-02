import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

class CreateChannel extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: '',
      inputValue: '',
      BTN_VALUE: 'Create'
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
      this.setState({ msg: "Don't forget to name your campus" });
    }
    this.setState({ BTN_VALUE: 'Creating' });
    // create channel
  };

  render() {
    let { inputValue, msg, BTN_VALUE } = this.state;
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
                placeholder="# e.g. javascript"
                value={inputValue}
                onChange={this.handleChange}
              />
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
