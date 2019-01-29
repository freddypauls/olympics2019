import React, { Component } from 'react';

import { withAuthorization } from '../Session';
import '../SignIn/index.css';
import './index.css';
import Clock from './clock.js';

class HomePage extends Component {

  render() {
       return (
            <div className="">
            <section className="background-image-behind-card ">
              <div className="home-card">

                <div className="card-text">
                <br/>
                  <hr />
                    <div className="welcome"> WELCOME </div>
                  <hr className="hr2" />
                  <br />
                  <Clock deadline={'July, 20, 2019'} />
                </div>

              </div>
            </section>
            <section className="flex-container">

            </section>

          </div>
       );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);