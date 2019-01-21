import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import './index.css';
import RenderTeam1 from '../Teams/team1.js';
import RenderTeam2 from '../Teams/team2.js';
import RenderTeam3 from '../Teams/team3.js';
import RenderTeam4 from '../Teams/team4.js';
import RenderTeam5 from '../Teams/team5.js';
import RenderTeam6 from '../Teams/team6.js';

class RenderTeamsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
          <RenderTeam1 />

          <RenderTeam2 />

          <RenderTeam3 />
          
          <RenderTeam4 />

          <RenderTeam5 />

          <RenderTeam6 />
      </div>
    );
  }
}


const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withAuthorization(condition),
  withFirebase,
)(RenderTeamsPage);