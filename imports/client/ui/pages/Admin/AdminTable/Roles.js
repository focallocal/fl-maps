import React from 'react';
import { parseData } from './helper'
import RoleSelect from './../RoleSelect/index.js'

const Roles = ({ user, changeUserRole }) => {
  const roles = parseData('role', user);
  const UserName = parseData('user', user);

  return (
    <RoleSelect rolesData={roles} UserName={UserName} user={user} changeUserRole={changeUserRole} />
  )
}

export default Roles;


