import React from 'react'
import CancelDeleteBtns from './../CancelDeleteBtns/CancelDeleteBtns'
import { parseData } from './helper'
const Users = ({ user, deleteUser }) => {
  const userName = parseData('user', user)
  let button = <CancelDeleteBtns idToDelete={user._id} deleteDocument={deleteUser} deleteText={'del'} />
  return (
    <React.Fragment>
      {button}{userName}
    </React.Fragment>
  )
}

export default Users
