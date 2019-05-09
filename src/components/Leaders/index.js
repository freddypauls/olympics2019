import React, { Component } from 'react';

import { withAuthorization } from '../Session';
import '../SignIn/index.css';
import './index.css';

var $ = require("jquery");

class LeadersPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
       return (
        <div className="flex-container-teams">
          <section className="flex-item-leaders-header">
            <div className="overlay-bluetint">
              <div className="teamlead-header">
                Lagledere
              </div>
              <div className="teamlead-header-text">
                Her er de tapre sjelene som skal være lagledere, 
                <span> kanskje en vil lede <strong>deg</strong> til seier?</span>
              </div>
            </div>
          </section>

          <section className="flex-item-leaders flex-leaders">
            <div className="leaders eirik">
              <img></img>
              <div className="leaders-text"></div>
            </div>
            <div className="leaders">

            </div>
            <div className="leaders">

            </div>
            <div className="leaders">

            </div>
            <div className="leaders">

            </div>
            <div className="leaders">

            </div>
          </section>
        </div>
       );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(LeadersPage);