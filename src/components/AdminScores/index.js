/* Main React and Component */
import React, { Component } from 'react';
import { compose } from 'recompose';

/* Firebase, Auth and Roles (login conditions) */
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

/* Styling */
import './index.css';


/* Admin Page Code */
class AdminGamesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      teams: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.teams().on('value', snapshot => {
      const teamsObject = snapshot.val();

      const teamsList = Object.keys(teamsObject).map(key => ({
        ...teamsObject[key],
        uid: key,
      }));

      this.setState({
        teams: teamsList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.teams().off();
  }

  plus = (id, score) => {
    const number = score + 1;
    this.props.firebase.team(id).set({
        teamnum: id,
        score: number,
    })
  }

  minus = (id, score) => {
    const number = score - 1;
    this.props.firebase.team(id).set({
        teamnum: id,
        score: number,
    })
  }

  render() {
    const { teams } = this.state;

    return (
      <div className="admin-card flex-container-admin">
          {teams.map(team => (
            <div key={team.tid}>
                <button onClick={() => this.plus(team.teamnum, team.score)}>+</button>
                {/*<input type="number" name="" />*/}
                {team.score}
                <button onClick={() => this.minus(team.teamnum, team.score)}>-</button>
            </div>
          ))}
      </div>
    );
  }
}

const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.GAMEADMIN);

export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminGamesPage);