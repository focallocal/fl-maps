import { Roles } from 'meteor/alanning:roles'
import { Meteor } from "meteor/meteor";
export function createAdmin(user) {
  console.log('createAdminid', user._id);
  console.log('Roles', Meteor.roles);
  //Roles.addUsersToRoles(user._id, 'admin', Roles.GLOBAL_GROUP);
}