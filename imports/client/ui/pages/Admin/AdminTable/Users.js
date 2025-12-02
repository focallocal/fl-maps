import React from 'react'
import CancelDeleteBtns from './../CancelDeleteBtns/CancelDeleteBtns'
import { parseData } from './helper'
const Users = ({ user, deleteUser }) => {
  const userName = parseData('user', user)
  const userEmail = user.profile?.name || user.username || ''
  let button = <CancelDeleteBtns idToDelete={user._id} deleteDocument={deleteUser} deleteText={'del'} />
  return (
    <React.Fragment>
      {button}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontWeight: '500' }}>{userName}</div>
        {userEmail && <div style={{ fontSize: '0.85em', color: '#666' }}>{userEmail}</div>}
      </div>
    </React.Fragment>
  )
}

export default Users
