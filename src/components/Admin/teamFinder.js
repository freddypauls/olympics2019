import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import '../SignIn/index.css';

const TeamFinderFunc= () => (
  <TeamFinderForm>

  </TeamFinderForm>
);

const INITIAL_STATE = {
    users: [],
  };

class TeamFinderBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    function shuffleArray(array) {
      let i = array.length - 1;
      for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      const shuffleUsers = shuffleArray(usersList);

      this.setState({
        users: shuffleUsers,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  onSubmit = event => {

    const { users } = this.state;
    const teams = 6;

    const boys = users.filter(user => user.gender === "Male" && user.wantTeam === true && user.roles[0] === "Participant");
    for(let t = 0; t < teams; t++){
      let i = 0;
      boys.map(user => {
        if(i <= Math.floor(boys.length / teams)) {
          this.props.firebase.user(user.uid).update({
            teamnum: t+1,
          })
          boys.splice(i, 1);
          i++
        } else if (i > Math.floor(boys.length / teams) && boys.length != 0) {
            this.props.firebase.user(user.uid).update({
              teamnum: Math.floor(Math.random() * ((teams - 1)+ 1) + 1),
            })
        }
      })
    }

    const girls = users.filter(user => user.gender === "Female" && user.wantTeam === true && user.roles[0] === "Participant");
    for(let tj = teams; tj > 0; tj--){
      let j = 0;
      girls.map(user => {
        if(j <= Math.floor(girls.length / teams)) {
          this.props.firebase.user(user.uid).update({
            teamnum: tj,
          })
          girls.splice(j, 1);
          j++
        } else if (j > Math.floor(girls.length / teams) && girls.length != 0) {
            this.props.firebase.user(user.uid).update({
              teamnum: Math.floor(Math.random() * ((teams - 1)+ 1) + 1),
            })
        }
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
                <button type="submit" className="form-btn-devide-teams">
                <i className="material-icons">shuffle</i>
                </button>
            </form>
        </div>
    );
  }
}

const TeamFinderForm = compose(
  withRouter,
  withFirebase,
)(TeamFinderBase);

export default TeamFinderFunc;