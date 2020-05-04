import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

class JoinCampus extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: '',
      inputValue: '',
      BTN_VALUE: 'Join'
    };
  }

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ msg: '', BTN_VALUE: 'Join', [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { inputValue } = this.state;
    if (!inputValue) {
      this.setState({ msg: "Don't forget Campus ID" });
    }
    if (!navigator.onLine) {
      this.setState({ msg: 'Check your internet connection' });
    }

    // join campus
    if (inputValue && navigator.onLine) {
      this.setState({ BTN_VALUE: 'Joining' });
      fetch(`/api/v1/campus/${inputValue}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.fomotoken
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (!data.success) {
            this.setState({ msg: data.message, BTN_VALUE: 'Join' });
          }
          if (data.success) {
            this.setState({ BTN_VALUE: 'Join' });
            this.props.history.push('/campuses');
          }
        });
    }
  };

  render() {
    let { inputValue, msg, BTN_VALUE } = this.state;
    return (
      <>
        <div className="flex portal">
          <div className="portal-wrapper">
            <div className="space-flex portal-topitem">
              <p className="portal-heading">Join Campus</p>
              <NavLink to="/campuses" className="portal-close">
                <IoMdClose />
              </NavLink>
            </div>
            <p className="portal-subheading">
              Join Campus by entering their campus ID.
            </p>
            <form>
              <label className="block label-heading">Campus ID</label>
              <label className="block label-portal-error">{msg}</label>
              <input
                className="block portal-input"
                type="text"
                name="inputValue"
                placeholder="e.g. 501h73881bd738fb373"
                value={inputValue}
                onChange={this.handleChange}
              />
              <button
                className={`float-right btn  before-portal-btn margin-top-1rem${
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

export default withRouter(JoinCampus);
