import React, { Component } from 'react';

import { withAuthorization } from '../Session';
import '../SignIn/index.css';
import './index.css';
import Clock from './clock.js';

class HomePage extends Component {
  _isMounted = false;

  constructor(props) {
       super(props);
       this.state = {
         deadline: [],
       }
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.setState({ deadline: 'July, 20, 2019' });
    }
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
  
  componentWillUnmount() {
    this._isMounted = false;
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);