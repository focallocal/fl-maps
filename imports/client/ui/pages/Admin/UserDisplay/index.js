import React from 'react'
import i18n from '/imports/both/i18n/en'

const UserDisplay = (props) => {
  let { name, role } = props
  const capitalRole = role.charAt(0).toUpperCase() + role.slice(1)
  const welcomeLabel = i18n.Admin.users.welcome
  const toDisplay = `${welcomeLabel}  ${capitalRole} ${name}`
  return (
    <div className="userDisplay-container">
      <h6>   {toDisplay}</h6>
    </div>
  )
}

export default UserDisplay
