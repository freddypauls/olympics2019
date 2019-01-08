import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../Session';

const classname = "image-menu-ham";

const Navigation = () => (
  <div className="navigation">
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? ( 
          <NavigationAuth authUser={authUser} />
         ) : ( 
          <NavigationNonAuth /> 
         )
      }
    </AuthUserContext.Consumer>
    <img className={classname} src={require('./img/menu.png')} onClick={() => handleClick()} />
  </div>
);

const handleClick = () => {
  classname = "image-menu-ham img-movement";
  alert(classname);
};

const NavigationAuth = ({ authUser }) => (
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
    {authUser.roles.includes(ROLES.ADMIN) && (
      <li>
        <Link className="link" to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
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