import React from 'react';
export class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    let { SIDEBAR_VALUE } = this.props;
    if (!localStorage.fomotoken)
      return (
        <div className="sidebar">
          <p className="sidebar-heading">{SIDEBAR_VALUE}</p>
          <div className="only-flex sidebar-notext-div">
            <a
              className="sidebar-login-link"
              href="http://localhost:3000/auth/google"
            >
              Login
            </a>
            <p className="sidebar-no-text">to see your campuses</p>
          </div>
        </div>
      );
    return (
      <div className="sidebar">
        <p className="sidebar-heading">{SIDEBAR_VALUE}</p>
        <div className="sidebar-section">
          <button>Create Campus</button>
          <button>Join Campus</button>
          <p>your campuses</p>
          <button></button>
        </div>
      </div>
    );
  }
}
