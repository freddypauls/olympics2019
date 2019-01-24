import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import './index.css';

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      teams: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    
    // Fethcing table for team 1 and targeting all users, setting uid as key (for pritning later)
    this.props.firebase.teams().orderByChild('score').on('value', snapshot => {
      const teamsObject = snapshot.val();
      
      if(teamsObject != null){
        // Setting object as list (to ready for print)
        const teamsList = Object.keys(teamsObject).map(key => ({
          ...teamsObject[key],
          tid: key,
        }));

        // Setting the list of users as state to be used across the file
        this.setState({
          teams: teamsList,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    // Stopping event listener
    this.props.firebase.teams().off();
  }

  render() {
    // Fetching all users from state, and assigning a variable to call them
    const { teams } = this.state;
    const helper = [ "st", "nd", "rd", "th", "th", "th"];
    let i = 1;
    // Returning JSX to render
    return (
      <div className="leaderboard">
          <p className="leaderboard-header">Leaderboard</p>
          {teams.sort((a, b) => a.score - b.score).reverse().map(team => (
            <div className="leaderboard-li" key={team.tid}> {i++}{helper[i-2]} <br /> Team {team.teamnum}: {team.score} pts </div> 
          ))}
      </div>
    );  
  }
}

// Setting condition checking that the user is logged in.
const condition = authUser => !!authUser;

// Exporting the info, with auth and firebase connection.
export default compose(
  withAuthorization(condition),
  withFirebase,
)(Leaderboard);