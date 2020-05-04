import React from 'react';
import { AiOutlineHome, AiOutlineMacCommand } from 'react-icons/ai';
import { RiMessage3Line } from 'react-icons/ri';
import { FiRadio } from 'react-icons/fi';
import { NavLink, withRouter } from 'react-router-dom';
class Menu extends React.Component {
  render() {
    return (
      <>
        <div className="menu space-flex">
          <div className="flex">
            {[
              { icon: AiOutlineHome, value: 'Home' },
              { icon: FiRadio, value: 'Campuses' },
              { icon: RiMessage3Line, value: 'DM' },
              { icon: AiOutlineMacCommand, value: 'Communities' }
            ].map((item, index) => (
              <div key={index}>
                <NavLink
                  to={`/${item.value.toLowerCase()}`}
                  activeClassName="selected-menuitem"
                  className={'flex menu-item'}
                >
                  {/* {<item.icon className="menu-icon" />} */}
                  <p className="menu-text">{item.value}</p>
                </NavLink>
              </div>
            ))}
          </div>
          <div className="flex menu-item">
            <p className="menu-text">Logout</p>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(Menu);
