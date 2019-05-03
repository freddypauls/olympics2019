import React, { Component } from 'react';
import './index.css';

class Clock extends Component {
     constructor(props) {
     super(props);
     this.state = {
               days: 0,
               hours: 0,
               minutes: 0,
               seconds: 0,
          };
     }
     componentWillMount() {
          this.getTimeUntil(this.props.deadline);
     }
     componentDidMount() {
          setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
     }  
     leading0(num) {
          return num < 10 ? '0' + num : num;
     }

     getTimeUntil(deadline) {
          const time = Date.parse(deadline) - Date.parse(new Date());
          if(time < 0) {
               this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          
          } else {
               const seconds = Math.floor((time/1000)%60);
               const minutes = Math.floor((time/1000/60)%60);
               const hours = Math.floor((time/(1000*60*60))%24);
               const days = Math.floor(time/(1000*60*60*24));
               this.setState({ days, hours, minutes, seconds });
          }
     }

     render() {
          return(
               <div className="countdown">
                    <div className="timer-title"> 
                         {this.leading0(this.state.days)} 
                         <div className="title-color">Days</div> 
                    </div> 
                    <div className="timer-title"> 
                         {this.leading0(this.state.hours)} 
                         <div className="title-color">Hours</div> 
                    </div>
                    <div className="timer-title"> 
                         {this.leading0(this.state.minutes)}
                         <div className="title-color">Minutes</div>
                    </div>
                    <div className="timer-title"> 
                         {this.leading0(this.state.seconds)}
                         <div className="title-color">Seconds</div>
                    </div>
               </div>
          );
     }
}
export default Clock;