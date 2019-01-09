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

              <div className="flex-item image-1">
                <div className="text"> B-OL er ett event startet av Eirik Holmebukt og skal i år arrangeres for andre gang. </div>
              </div>

              <div className="flex-item image-2">
                <div className="overlay">
                  <div className="text">This is a man with no manners</div>
                </div>
              </div>

              <div className="flex-item">
                <div className="overlay">
                  <div className="text">This is a man with brainpower</div>
                </div>
              </div>

              <div className="flex-item">
                <div className="overlay">
                  <div className="text">This is a man without branp</div>
                </div>
              </div>
            </section>

          </div>
       );
  }
}

/*const HomePage = () => (

);*/

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);