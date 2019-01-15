import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

const TeamBtn = () => (
    <div>
        <TeamBtnLogic />
    </div>
);


class SetTeamBtnLogic extends Component {
    constructor(props) {
      super(props);
  
      this.state = '';
    }
  
    onSubmit = event => {
    
    this.props.firebase
    .users(authUser => {
          // Create a user in your Firebase realtime database
          return this.props.firebase
            .user(authUser.user.uid)
            .update({
              wantTeam: true,
            });
        });
  
      event.preventDefault();
  
    }
  
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    render() {
  
      return (
        <form onSubmit={this.onSubmit}>
          <label>Put me on a team!</label>
          <button type="submit" className="form-btn-want-team">
              +
          </button>
        </form>
      );
    }
  }
  
  const TeamBtnLogic = compose(
    withRouter,
    withFirebase,
  )(SetTeamBtnLogic);
  
  export default TeamBtn;