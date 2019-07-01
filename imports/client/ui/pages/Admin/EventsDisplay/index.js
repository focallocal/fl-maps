import { Meteor } from "meteor/meteor";
import React, { Component, PureComponent } from 'react';
import EventsDropDown from './EventsDropDown'
import LinkEvents from "./LinkEvents";

class EventsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      allEvents: [],
      categoryEvents: [],
      currentCategory: "All",
      displayAllcategory: "All",
      allPosibleCategories: [],
     }
  }

  componentDidUpdate(prevProps,prevState){
    if (this.props.userEvents !== prevProps.userEvents ) {
      this.getCatagoriesInitializeEvents();
    }
    if (this.state.categoryEvents <= 0 && 
      this.state.currentCategory !== this.state.displayAllcategory){
      let isExist = this.state.categoryEvents.some(ele =>{
       return ele.categories === this.state.currentCategory
      })

      if (!isExist ){
        this.changeCategory(this.state.displayAllcategory);
      }
    }
  }

  changeCategory = (category) =>{
    if(category === this.state.displayAllcategory){
      this.setState({ categoryEvents: this.state.allEvents, currentCategory: category });
    }
    else{
      const chosenEvents = [];
      this.state.allEvents.forEach(ele=> {
        let isInCategory = ele.categories.some(matchCategory);
        if (isInCategory){
          chosenEvents.push(ele);
        }
      })
      this.setState({ categoryEvents: chosenEvents, currentCategory: category });
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
      allEvents: this.props.userEvents },()=>{
        this.changeCategory(this.state.currentCategory);
      });
 }
 
  render() { 
    const { isAllEvents, deleteAllEvents} = this.props
    const { categoryEvents, allPosibleCategories, currentCategory} = this.state;
    const EventToDisplay = isAllEvents ?
      <LinkEvents categoryEvents={categoryEvents} allPosibleCategories={allPosibleCategories} 
        deleteAllEvents={deleteAllEvents} changeCategory={this.changeCategory} currentCategory={currentCategory} />  :
      <EventsDropDown currentCategory={currentCategory} categoryEvents={categoryEvents} allPosibleCategories={allPosibleCategories} 
        changeCategory={this.changeCategory} deleteAllEvents={deleteAllEvents}/>;
                              
    return ( 
    <div>
      {EventToDisplay}
    </div> 
    )
  }
}
 
export default EventsDisplay;