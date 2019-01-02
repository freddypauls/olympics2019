import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div className="navigation">
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
    <img className="image-menu-ham" src={require('./img/menu.png')} onClick={() => handleClick()} />
  </div>
);

const handleClick = () => {
  
};

const NavigationAuth = () => (
  <ul className="ham-menu">
    <li>
      <Link className="link" to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link className="link" to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link className="link" to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link className="link" to={ROUTES.ADMIN}>Admin</Link>
    </li>
    <li>
      <div className="link right-float"><SignOutButton /></div>
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link className="link right-float" to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link className="link right-float" to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;