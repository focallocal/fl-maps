import React from 'react'

const UserDisplay = (props) => {
  let { name, role } = props
  const capitalRole = role.charAt(0).toUpperCase() + role.slice(1)
  const toDisplay = `Welcome:  ${capitalRole} ${name}`
  return (
    <div className="userDisplay-container">
      <h6>   {toDisplay}</h6>
    </div>
  )
}

export default UserDisplay
