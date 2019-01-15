import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization } from '../Session';

import { withFirebase } from '../Firebase';

const TeamBtn = () => (
    <div>
        <TeamBtnLogic />
    </div>
);


class SetTeamBtnLogic extends Component {
    constructor(props) {
      super(props);

      this.state = {
        wantTeam: true,
      };
    }
  
    onSubmit = event => {

      const { wantTeam } = this.state;

      this.props.firebase
          .user(this.firebase.auth().currentUser.uid)
          .update({
            wantTeam,
      })
      .catch(error => {
        this.setState({ error });
      });
    
      event.preventDefault();
      }
  
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    render() {
  
      return (
        <form onSubmit={this.onSubmit}>
          <label>Put me on a team! </label>
          <br />
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