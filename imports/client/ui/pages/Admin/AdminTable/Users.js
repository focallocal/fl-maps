import React from 'react';
import CancelDeleteBtns from './../CancelDeleteBtns/CancelDeleteBtns'
import { getValueFromData, userKey, dataBaseKeys} from './helper'
const Users = ({ user, deleteUser }) => {
  const userDataKeys = dataBaseKeys[userKey].dataBaseKeys
  
  const userName = getValueFromData(userDataKeys, user)
  let button = <CancelDeleteBtns idToDelete={user._id} deleteDocument={deleteUser} deleteText={'del'} />;
  return (
    <React.Fragment>
      {button}{userName}
    </React.Fragment>
  )
}

export default Users;