import React, { Component } from 'react';

class AdminLogic extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          users: [],
        };
      }
}

const teamFinder = () => {
    
};

const teamFinderBtn = () => (
    <button onClick={teamFinder()}> Set teams </button>
);

export default AdminLogic;