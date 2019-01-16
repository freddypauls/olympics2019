import React, { Component } from 'react';
import 'firebase/auth';
import 'firebase/database';
import '../Firebase';

import { AuthUserContext, withAuthorization } from '../Session';
import './index.css';

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
      <div>
          <p>HELLO WORLD</p>
      </div>
    );
  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(TeamsPage);