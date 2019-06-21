import React from 'react';
import Users from './Users'
import Roles from './Roles'
import Events from './Events'
import {userKey, roleKey, eventKey } from './helper'

const TableData = ({tableDataType,user, ...otherProps}) => {
  const dataComponents = {
    [userKey]: Users,
    [roleKey]: Roles,
    [eventKey]: Events
  }
  const ChosenComponent = dataComponents[tableDataType]
    
  return (
    <td ><ChosenComponent user={user} {...otherProps} /></td>
  )
}

export default TableData;








