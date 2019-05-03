import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import '../SignIn/index.css';

const TeamSetterFunc= () => (
  <TeamSetterForm>

  </TeamSetterForm>
);

const INITIAL_STATE = {
    users: [],
  };

class TeamSetterBase extends Component {
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
    
    users.filter(user => user.teamnum).map(user => {
            this.props.firebase
            .team(`${user.teamnum}/users/${user.uid}`)
            .set({
                username: user.username,
            });
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
                  <i className="material-icons">group_add</i>
                </button>
            </form>
        </div>
    );
  }
}

const TeamSetterForm = compose(
  withRouter,
  withFirebase,
)(TeamSetterBase);

export default TeamSetterFunc;