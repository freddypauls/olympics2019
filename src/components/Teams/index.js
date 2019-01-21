import React, { Component } from 'react';
import 'firebase/auth';
import 'firebase/database';
import '../Firebase';

import { /*AuthUserContext,*/ withAuthorization } from '../Session';
import './index.css';
import RenderTeam1 from '../Teams/team1.js';
import RenderTeam2 from '../Teams/team2.js';
import RenderTeam3 from '../Teams/team3.js';
import RenderTeam4 from '../Teams/team4.js';
import RenderTeam5 from '../Teams/team5.js';
import RenderTeam6 from '../Teams/team6.js';

class TeamsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users } = this.state;

    return (
      <div className="flex-container">
        <div className="flex-item-renderTeams">
            <RenderTeam1 />
        </div>
        <div className="flex-item-renderTeams">
            <RenderTeam2 />
        </div>
        <div className="flex-item-renderTeams">
            <RenderTeam3 />
        </div>
        <div className="flex-item-renderTeams">
            <RenderTeam4 />
        </div>
        <div className="flex-item-renderTeams">
            <RenderTeam5 />
        </div>
        <div className="flex-item-renderTeams">
            <RenderTeam6 />
        </div>
      </div>
    );
  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(TeamsPage);