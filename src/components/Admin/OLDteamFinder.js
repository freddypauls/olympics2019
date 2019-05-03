let i = 1;
    let j = 1;

    shuffledUsers.filter(user => user.roles[0] === "Participant").map(user => {
        if(user.wantTeam === true && user.gender === "Female") {
          if(i > 6) {
            i = 1;
          }

          if(i === 1) {
            this.props.firebase.user(user.uid).update({
              teamnum: i,
            })
            .catch(error => {
                this.setState({ error });
            });

            i++;

          } else if(i === 2) {
            this.props.firebase.user(user.uid).update({
              teamnum: i,
            })
            .catch(error => {
                this.setState({ error });
            });

            i++

          } else if(i === 3) {
            this.props.firebase.user(user.uid).update({
              teamnum: i,
            })
            .catch(error => {
                this.setState({ error });
            });

            i++

          } else if(i === 4) {
            this.props.firebase.user(user.uid).update({
              teamnum: i,
            })
            .catch(error => {
                this.setState({ error });
            });

            i++

          } else if(i === 5) {
            this.props.firebase.user(user.uid).update({
              teamnum: i,
            })
            .catch(error => {
                this.setState({ error });
            });

            i++

          
          } else if(i === 6) {
            this.props.firebase.user(user.uid).update({
              teamnum: i,
            })
            .catch(error => {
                this.setState({ error });
            });

            i++

            
          } 
        }
        else if(user.wantTeam === true && user.gender === "Male") {
          if(j > 6) {
            j = 1;
          }
          if(j === 1) {
            this.props.firebase.user(user.uid).update({
              teamnum: j,
            })
            .catch(error => {
                this.setState({ error });
            });

            j++


          } else if(j === 2) {
            this.props.firebase.user(user.uid).update({
              teamnum: j,
            })
            .catch(error => {
                this.setState({ error });
            });

            j++

           
          } else if(j === 3) {
            this.props.firebase.user(user.uid).update({
              teamnum: j,
            })
            .catch(error => {
                this.setState({ error });
            });

            j++

          } else if(j === 4) {
            this.props.firebase.user(user.uid).update({
              teamnum: j,
            })
            .catch(error => {
                this.setState({ error });
            });

            j++

          } else if(j === 5) {
            this.props.firebase.user(user.uid).update({
              teamnum: j,
            })
            .catch(error => {
                this.setState({ error });
            });

            j++

          } else if(j === 6) {
            this.props.firebase.user(user.uid).update({
              teamnum: j,
            })
            .catch(error => {
                this.setState({ error });
            });

            j++

          } 
        }

    })