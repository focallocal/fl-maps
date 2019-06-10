import React from 'react';
import { getValueFromData, userKey, roleKey, dataBaseKeys } from './helper'
import RoleSelect from './../RoleSelect/index.js'

const Roles = ({ user, changeUserRole }) => {
  const userDataKeys = dataBaseKeys[userKey].dataBaseKeys;
  const roleDataKeys = dataBaseKeys[roleKey].dataBaseKeys;
  const roles = getValueFromData(roleDataKeys, user);
  const UserName = getValueFromData(userDataKeys, user)
  return (
    <RoleSelect rolesData={roles} UserName={UserName} user={user} changeUserRole={changeUserRole} />
  )
}

export default Roles;


