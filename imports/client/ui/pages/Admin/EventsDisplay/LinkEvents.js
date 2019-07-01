import React from 'react';
import { Link } from 'react-router-dom';
import CategoryDropDown from './CategoryDropDown'
import CancelDeleteBtns from './../CancelDeleteBtns/CancelDeleteBtns'

const LinkEvents = (props) => {
  const { allPosibleCategories, categoryEvents, changeCategory, deleteAllEvents, currentCategory } = props;
  const eventIds = []
  const events = categoryEvents.map(ele => {
    let id = ele._id
    eventIds.push(id);
    let name = ele.name + ' / ';
    let url = `/page/${id}`
    return <Link key={ele._id} to={url}>{name}</Link>
  })
  let deleteText = "Del " + currentCategory;
  let deleteBtn = events.length > 0 ? <div className="deleteBtns"><CancelDeleteBtns deleteText={deleteText} idToDelete={eventIds} deleteDocument={deleteAllEvents} /></div> : null

  return (
    <div>
      <div className="link-btns">
        {deleteBtn} 
        <CategoryDropDown currentCategory={currentCategory} changeCategory={changeCategory} allPosibleCategories={allPosibleCategories} />
      </div>
     <div>
        {events}
     </div>
    </div>
  )
}

export default LinkEvents;