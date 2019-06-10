import React from 'react';
import { Link } from 'react-router-dom';
import CategoryDropDown from './CategoryDropDown'
import CancelDeleteBtns from './../CancelDeleteBtns/CancelDeleteBtns'

const LinkEvents = (props) => {
  const { allPosibleCategories, categoryEvents, changeCategory, deleteAllEvents } = props;
  const eventIds = []
  const events = categoryEvents.map(ele => {
    let id = ele._id
    eventIds.push(id);
    let name = ele.name + ' / ';
    let url = `/page/${id}`
    return <Link key={ele._id} to={url}>{name}</Link>
  })
  let deleteBtn = events.length > 0 ? <CancelDeleteBtns deleteText={'del all'} idToDelete={eventIds} deleteDocument={deleteAllEvents} /> : null
  
  return (
    <div>
      <div>
        <CategoryDropDown changeCategory={changeCategory} allPosibleCategories={allPosibleCategories} />
        {deleteBtn}
      </div>
     <div>
        {events}
     </div>
      
    </div>
  )
}

export default LinkEvents;