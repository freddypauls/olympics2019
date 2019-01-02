import React from 'react';

import { withAuthorization } from '../Session';
import '../SignIn/index.css';
import './index.css';

const HomePage = () => (
  <div className="">
    <section className="background-image-behind-card ">
      <div className="home-card">

        <div className="card-text">
          <header> <h1>Welcome Home</h1></header>

          <p>This is the page that every logged in user will see first.</p>
          <p>I would fill this out more, but I dont really know the context of the page yet. havent really thought about it that much tbh</p>
        
        </div>

      </div>
    </section>
    <section className="section-part-games">
      <div className="home-card">

        <header>What? </header>
      </div>
    </section>

  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);