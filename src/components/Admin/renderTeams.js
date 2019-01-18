import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import './index.css';

class RenderTeamsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      teams: [],
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.teams().on('value', snapshot => {
      const teamsObject = snapshot.val();

      const teamsList = Object.keys(teamsObject).map(key => ({
        ...teamsObject[key],
        tid: key,
      }));

      this.setState({
        teams: teamsList,
        loading: false,
      });
    });

    this.props.firebase.users().on('value', snapshot => {
        const usersObject = snapshot.val();
  
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));
  
        this.setState({
          users: usersList,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.teams().off();
  }

  render() {
    const { teams , loading, users } = this.state;
    let teamnum = 0;
    return (
      <div>
          {teams.map(team => (
            <div key={team.tid}>
                {team.tid} <br/>
                {teamnum = team.teamnum}
                Score: {team.score}
                {users.map(user => (
                    <div key={user.uid}>
                        {user.teamnum == teamnum ? user.username : null}
                    </div>
                ))}
            </div>
          ))}

          
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