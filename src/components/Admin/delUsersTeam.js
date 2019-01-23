import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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

  onSubmit = event => {

    const { users } = this.state;
    
    users.map(user => {
        if(user.teamnum != '') {
            let i = user.teamnum;
            this.props.firebase
            .team(`${i}/users/${user.uid}`)
            .remove()
        }

    })
        event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    return (
        <div>
            <form onSubmit={this.onSubmit}>
                <button type="submit" className="form-btn-set-teams">
                    Remove Teams
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