import React from 'react';
import {
  IoIosApps,
  IoIosAddCircleOutline,
  IoMdArrowRoundBack
} from 'react-icons/io';
import { FaRegAddressBook } from 'react-icons/fa';
import { withRouter, NavLink } from 'react-router-dom';

class CampusSb extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let handle = this.props.match.params.campusname;
    let { CAMPUS } = this.props;
    console.log(CAMPUS);
    return (
      <div className="sidebar">
        <div className="only-flex campus-top-sec ">
          <NavLink to="/campuses">
            <IoMdArrowRoundBack className="campus-backArr " />
          </NavLink>

          <p className="campus-heading">{handle}</p>
        </div>
        <div className="sidebar-section-scroll">
          <div className="campusSb-fir-section">
            <div className="only-flex campusSb-item">
              <FaRegAddressBook className="campusSb-icon" />
              <p className="campusSb-text">People</p>
            </div>
            <div>
              <NavLink
                to={`/campuses/${handle}/create`}
                activeClassName="selected-menuitem "
                className="only-flex campusSb-item"
              >
                <IoIosAddCircleOutline className="campusSb-icon" />
                <p className="campusSb-text">Create channel</p>
              </NavLink>
            </div>
          </div>
          <div className="campusSb-sec-section">
            <div className="only-flex campusSb-item">
              <IoIosApps className="campusSb-icon" />
              <p className="campusSb-text">your channels</p>
            </div>
            <div className="padding-top-.5rem">
              {CAMPUS &&
                CAMPUS.channels.map((channel, index) => (
                  <div key={index}>
                    <NavLink
                      to={`/campuses/${handle}/${channel}`}
                      className="only-flex campusSb-item your-campuses-item"
                    >
                      <p className="campusSb-icon">#</p>
                      <p className="campusSb-text">{channel.substring(1)}</p>
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

export default withRouter(CampusSb);
