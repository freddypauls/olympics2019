import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

const teamBtn = () => (
    <div>
        <p>Put me on a team!</p>
        <SetTeamBtnLogic />
    </div>
);

const INITIAL_STATE = {
    username: '',
    gender: '',
    error: null,
  };

class SetTeamBtnLogic extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }
  
    onSubmit = event => {
  
      const { username, gender } = this.state;
  
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          // Create a user in your Firebase realtime database
          return this.props.firebase
            .user(authUser.user.uid)
            .set({
              username,
              gender,
            });
        })
        .then(() => {   
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
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
      const {
          username,
          gender,
          error,
        } = this.state;
  
      return (
        <form onSubmit={this.onSubmit}>

          <button disabled={isInvalid} type="submit" className="form-btn-setTeams">
              +
          </button>
  
          {error && <p>{error.message}</p>}
        </form>
      );
    }
  }
  
  const TeamBtnLogic = compose(
    withRouter,
    withFirebase,
  )(SetTeamBtnLogic);
  
  export default teamBtn;