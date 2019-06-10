import { Meteor } from "meteor/meteor";
import React, { Component } from 'react';
import EventsDropDown from './EventsDropDown'
import LinkEvents from "./LinkEvents";

class EventsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      allEvents: [],
      categoryEvents: [],
      displayAllcategory: "All",
      allPosibleCategories: [],
     }
  }

  componentDidUpdate(prevProps,prevState){
    if (this.props.userEvents !== prevProps.userEvents ) {
      this.getCatagoriesInitializeEvents();
    }
  }

  changeCategory = (category) =>{
    if(category === this.state.displayAllcategory){
      this.setState({ categoryEvents: this.state.allEvents });
    }
    else{
      const chosenEvents = [];
      this.state.allEvents.forEach(ele=> {
        let isInCategory = ele.categories.some(matchCategory);
        if (isInCategory){
          chosenEvents.push(ele);
        }
      })
      this.setState({ categoryEvents: chosenEvents});
    }
    function matchCategory(element) {
      return element.name === category;
    };
  }
  getCatagoriesInitializeEvents = () => {
    const seen = {};
    let categories = [];
    const distinctCategories = [this.state.displayAllcategory];
    
   this.props.userEvents.forEach(ele=> {  
     categories = categories.concat(ele.categories);
   })

  categories.forEach(ele => {
    if(!seen[ele.name]){
      seen[ele.name] = true;
      distinctCategories.push(ele.name);
    }
  })
    this.setState({ allPosibleCategories: distinctCategories, 
      allEvents: this.props.userEvents, categoryEvents: this.props.userEvents  });
 }
 
  render() { 
    const { isAllEvents, deleteAllEvents} = this.props
    const { categoryEvents,allPosibleCategories} = this.state;
    const EventToDisplay = isAllEvents ?
      <LinkEvents categoryEvents={categoryEvents} allPosibleCategories={allPosibleCategories} 
        deleteAllEvents={deleteAllEvents} changeCategory={this.changeCategory}/> :
      <EventsDropDown categoryEvents={categoryEvents} allPosibleCategories={allPosibleCategories} 
        changeCategory={this.changeCategory} deleteAllEvents={deleteAllEvents}/>;
                              
    return ( 
    <div>
      {EventToDisplay}
    </div> 
    )
  }
}
 
export default EventsDisplay;