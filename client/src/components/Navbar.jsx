import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useStateContext } from '../context';
import './navbar.css';

import { CustomButton } from './';

const Navbar = () => {

  const navigate = useNavigate();
  const [isActive, serIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h1>Health Donations</h1>
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>

          </ul>
        </div>

        <div>
          <CustomButton
            btnType="button"
            title={address ? 'Create a case' : 'Connect'}
            handleClick={() => {
              if (address) navigate('create-case')
              else connect()
            }}
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar