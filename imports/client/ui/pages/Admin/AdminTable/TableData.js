import React from 'react';
import Users from './Users'
import Roles from './Roles'
import Events from './Events'
import i18n from './../../../../../../imports/both/i18n/en'
import {userKey, roleKey, eventKey } from './helper'

const TableData = ({title,user, ...otherProps}) => {
  const userTitle = i18n.Admin.titles[userKey]
  const roleTitle = i18n.Admin.titles[roleKey]
  const eventTitle = i18n.Admin.titles[eventKey]
  const dataComponents = {
    [userTitle]: Users,
    [roleTitle]: Roles,
    [eventTitle]: Events
  }
 
  const ChosenComponent = dataComponents[title]
  return (
    <td ><ChosenComponent user={user} {...otherProps} /></td>
  )
}

export default TableData;








