import React from 'react';

import { withAuthorization } from '../Session';
import '../SignIn/index.css';
import './index.css';

const HomePage = () => (
  <div className="">
    <section className="background-image-behind-card ">
      <div className="home-card">

        <article className="card-text">
         <br/>
          <hr />
            <header className="welcome"> <h1>Welcome</h1></header>
          <hr />

          <p>Welcome to this page that will tell you about absolutely nothing of segnificans, but its here and it is here to stay.</p>
          <p>This text will just explain that this page will not really be used for anything special or anything, nbut it will be made and exsist as something that might or might not turn into something I can use, god knows.</p>
        
        </article>

      </div>
    </section>
    <section className="flex-container">
      <div className="flex-item">
        <img src={require("./img/img_avatar.png")} alt="Avatar" className="image" />
        <div className="overlay">
          <div className="text">This is a man of manners</div>
        </div>
      </div>

      <div className="flex-item">
        <img src={require("./img/img_avatar.png")} alt="Avatar" className="image" />
        <div className="overlay">
          <div className="text">This is a man with no manners</div>
        </div>
      </div>

      <div className="flex-item">
        <img src={require("./img/img_avatar.png")} alt="Avatar" className="image" />
        <div className="overlay">
          <div className="text">This is a man with brainpower</div>
        </div>
      </div>

      <div className="flex-item">
        <img src={require("./img/img_avatar.png")} alt="Avatar" className="image" />
        <div className="overlay">
          <div className="text">This is a man without brainpower</div>
        </div>
      </div>
    </section>

  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);