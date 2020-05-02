import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

class CreateCampus extends React.Component {
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
    // create campus
    fetch('/api/v1/campus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.fomotoken
      },
      body: JSON.stringify({
        name: inputValue.toLowerCase()
      })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          this.setState({ msg: data.message, BTN_VALUE: 'Create' });
        }
        if (data.success) {
          this.setState({ BTN_VALUE: 'Create' });
          this.props.history.push('/campuses');
        }
        console.log(data);
      });
  };

  render() {
    let { inputValue, msg, BTN_VALUE } = this.state;
    return (
      <>
        <div className="flex portal">
          <div className="portal-wrapper">
            <div className="space-flex portal-topitem">
              <p className="portal-heading">Create a campus</p>
              <NavLink to="/campuses" className="portal-close">
                <IoMdClose />
              </NavLink>
            </div>
            <p className="portal-subheading">
              Campus is the place where your organization can work together by
              communcating through channels. They’re best when created around
              organization name — Altcampus, for example.
            </p>
            <form>
              <label className="block label-heading">Name</label>
              <label className="block label-portal-error">{msg}</label>
              <input
                className="block portal-input"
                type="text"
                name="inputValue"
                placeholder="altcampus"
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

export default withRouter(CreateCampus);
