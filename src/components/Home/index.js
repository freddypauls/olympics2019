import React from 'react';

import { withAuthorization } from '../Session';
import './index.css';

const HomePage = () => (
  <div className="home-card">
    <h1>Welcome Home</h1>
    <p>This is the page that every logged in user will see first.</p>
    <p>I would fill this out more, but I dont really know the context of the page yet. havent really thought about it that much tbh</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);