import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import '../SignIn/index.css';

const TeamRemoverFunc= () => (
  <TeamRemoverForm>

  </TeamRemoverForm>
);

const INITIAL_STATE = {
    users: [],
  };

class TeamRemoverBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  onSubmit = event => {

      for(let i = 1; i <= 6; i++){
        this.props.firebase
            .team(`${i}/users`)
            .remove();

        this.props.firebase.team(`${i}/leader`).remove();

        this.props.firebase.team(i).update({
          score: 0,
        })
      }
        event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    return (
        <div>
            <form onSubmit={this.onSubmit}>
                <button type="submit" className="form-btn-delete-teams">
                <i className="material-icons">delete</i>
                </button>
            </form>
        </div>
    );
  }
}

const TeamRemoverForm = compose(
  withRouter,
  withFirebase,
)(TeamRemoverBase);

export default TeamRemoverFunc;