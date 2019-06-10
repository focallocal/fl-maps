import { Link } from 'react-router-dom'
import React, { Component} from "react";
import EventsDisplay from './../EventsDisplay/index'
  
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() { 
    const { userEvents, user, isAllEvents, deleteAllEvents } = this.props;   
    const events = userEvents.filter(ele => {
      return ele.organiser._id === user._id;
    })
 
    return (
      <React.Fragment>
        < EventsDisplay userEvents={events} isAllEvents={isAllEvents} deleteAllEvents={deleteAllEvents} /> 
      </React.Fragment>
      )
  }
}

export default Events;