import React from 'react';
import { RiAppsLine } from 'react-icons/ri';
import { IoIosApps, IoIosAddCircleOutline } from 'react-icons/io';
import { withRouter, NavLink } from 'react-router-dom';

class CampusesSb extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClick = campus => {
    this.props.handleCampus(campus);
  };

  render() {
    let user = this.props.USER;
    return (
      <div className="sidebar">
        <p className="sidebar-heading">Campuses</p>
        <div className="sidebar-section-scroll">
          <div className="campusSb-fir-section">
            <div>
              <NavLink
                to="/campuses/create"
                activeClassName="selected-menuitem"
                className="only-flex campusSb-item"
              >
                <RiAppsLine className="campusSb-icon" />
                <p className="campusSb-text">Create campus</p>
              </NavLink>
            </div>
            <div className="only-flex campusSb-item">
              <IoIosAddCircleOutline className="campusSb-icon" />
              <p className="campusSb-text">Join campus</p>
            </div>
          </div>
          <div className="campusSb-sec-section">
            <div className="only-flex campusSb-item">
              <IoIosApps className="campusSb-icon" />
              <p className="campusSb-text">your campuses</p>
            </div>
            <div className="padding-top-.5rem">
              {user &&
                user.campusesId.map((campus, index) => (
                  <div key={index} onClick={() => this.handleClick(campus)}>
                    <NavLink
                      to={`/campuses/${campus.name}`}
                      className="only-flex campusSb-item your-campuses-item"
                    >
                      <p className="campusSb-icon">#</p>
                      <p className="campusSb-text">{campus.name}</p>
                    </NavLink>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CampusesSb);
