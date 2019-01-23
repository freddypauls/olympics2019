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

  componentWillUnmount() {
    this._isMounted = false;
  }


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
                  {this._isMounted == true && <Clock deadline={ this.state.deadline } /> }
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