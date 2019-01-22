import React, { Component } from 'react';

import { withAuthorization } from '../Session';
import '../SignIn/index.css';
import './index.css';
import Clock from './clock.js';

class HomePage extends Component {
  constructor(props) {
       super(props);
       this.state = { deadline: 'July, 20, 2019' };
  }
  render() {
       return (

            <div className="">
            <section className="background-image-behind-card ">
              <div className="home-card">

                <div className="card-text">
                <br/>
                  <hr />
                    <div className="welcome"> <h1>Welcome to B-OL 2019</h1></div>
                  <hr />
                  <br />
                    <Clock deadline={ this.state.deadline }/>
                </div>

              </div>
            </section>
            <section className="flex-container">
              
            </section>

          </div>
       );
  }
}

/*const HomePage = () => (

);*/

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);