import React, { Component} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import CategoryDropDown from './CategoryDropDown'
import Toggle from './../../../components/Toggle/index'
import CancelDeleteBtns from './../CancelDeleteBtns/CancelDeleteBtns'

class EventsDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      value: "",
      id: "",
      currentSelection: "",
      chosenEvents: [],
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  componentDidUpdate(prevProps){
    if (prevProps.categoryEvents !== this.props.categoryEvents){
      const categoryEvents=  this.props.categoryEvents;   
      let currentSelection = categoryEvents.length + ' Total';
      this.setState({ currentSelection, categoryEvents});
    }
  }
  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  selectValue = (event,id) =>{
      const setValueAndToggle = {
        value: event.target.innerText,
        currentSelection: event.target.innerText, 
        id,
      }
      this.setState(setValueAndToggle);
  }

  checkForChosenEvent(events, toFind){
   const isMatch =  events.find(function (element) {
      return element.name === toFind;
    });
    return isMatch;
  }

  render() { 
    const { categoryEvents, changeCategory, allPosibleCategories, deleteAllEvents, currentCategory} = this.props;
    const { currentSelection} = this.state;
    const chosenEvents = categoryEvents.map(ele => {
      let id = ele._id
      let name = ele.name;

      return <DropdownItem key={id} onClick={(e) => {
              this.selectValue(e, id);
            }}>{name}</DropdownItem>
    })
    const isMatch = this.checkForChosenEvent(categoryEvents, currentSelection)
  
    return ( 
      <React.Fragment>
       <div>    
          <CategoryDropDown currentCategory={currentCategory} changeCategory={changeCategory} allPosibleCategories={allPosibleCategories}/>
       </div>
       <div className="eventdropdown-container">
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle caret>
              {currentSelection}
            </DropdownToggle>
            <DropdownMenu>
              {chosenEvents}
            </DropdownMenu>
          </Dropdown>   
       </div>
        <Toggle isShow={isMatch} componentToToggle={({ isShow})=>(
        <div >
            {isShow && (
              <div className="eventdropdown-btns">
                <a className="goto-dropdown" href={`/page/${this.state.id}`}><Button color="primary" style={{ "height": "38px" }}  >goto</Button></a>
                <CancelDeleteBtns deleteText={'del'} idToDelete={[this.state.id]} deleteDocument={deleteAllEvents}/>
            </div>
            )}
          </div>
          )}/>     
    </React.Fragment>    
     )
  }
}

export default EventsDropDown;

 


