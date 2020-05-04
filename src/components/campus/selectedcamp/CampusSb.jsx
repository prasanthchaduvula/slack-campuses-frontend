import React from 'react';
import socketIOClient from 'socket.io-client';

import {
  IoIosApps,
  IoIosAddCircleOutline,
  IoMdArrowRoundBack
} from 'react-icons/io';
import { FaRegAddressBook } from 'react-icons/fa';
import { withRouter, NavLink } from 'react-router-dom';

class CampusSb extends React.Component {
  intervalID = 0;
  constructor() {
    super();
    this.state = {
      endpoint: 'http://localhost:3000'
    };
  }

  componentDidMount() {
    let { campusId } = this.props.match.params;
    if (localStorage.fomotoken) {
      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      this.intervalID = setInterval(
        () => socket.emit('campus', campusId),
        4000
      );
      socket.on('campusData', data => {
        this.props.handleCampus(data);
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.off('campusData');
  }

  handleClick = channel => {
    this.props.handleChannel(channel);
  };

  render() {
    let { campusname, campusId } = this.props.match.params;
    let { CAMPUS } = this.props;
    return (
      <div className="sidebar">
        <div className="only-flex campus-top-sec ">
          <NavLink to="/campuses" className="campus-backArr">
            <IoMdArrowRoundBack />
          </NavLink>
          <p className="campus-heading">{campusname}</p>
        </div>
        <div className="sidebar-section-scroll">
          <div className="campusSb-fir-section">
            <div className="only-flex campusSb-item">
              <FaRegAddressBook className="campusSb-icon" />
              <p className="campusSb-text">People</p>
            </div>
            <div>
              <NavLink
                to={`/campuses/${campusname}/${campusId}/create`}
                activeClassName="selected-item-bg selected-item-white-color"
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
                CAMPUS.channelsId.map((channel, index) =>
                  channel.membersId.map(member =>
                    member._id == localStorage.fomouserId ? (
                      <div
                        key={index}
                        onClick={() => this.handleClick(channel)}
                      >
                        <NavLink
                          to={`/campuses/${campusname}/${campusId}/channels/${channel._id}`}
                          activeClassName="selected-item-bg selected-item-white-color"
                          className="only-flex campusSb-item your-campuses-item"
                        >
                          <p className="campusSb-icon">#</p>
                          <p className="campusSb-text">
                            {channel.name.substring(1)}
                          </p>
                        </NavLink>
                      </div>
                    ) : (
                      ''
                    )
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CampusSb);
