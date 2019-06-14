import { rolesDataKey } from './../RolesPermissions/index'
import i18n from './../../../../../../imports/both/i18n/en'

export const userKey = 'user';
export const roleKey = 'role';
export const eventKey = 'event';

export const display = [
  { title: i18n.Admin.titles[userKey] },
  { title: i18n.Admin.titles[roleKey] },
  { title: i18n.Admin.titles[eventKey]  },
]

export const dataBaseKeys = {
  [userKey]: { dataBaseKeys: ["profile", "name"] },
  [roleKey]: { dataBaseKeys: ["roles", rolesDataKey] },
  [eventKey]: {dataBaseKeys: ["events"]},
}

export function parseData(key,data){
  let keys = dataBaseKeys[key].dataBaseKeys
  return getValueFromData(keys, data);
}

export function getValueFromData(arrayKeys, userData) {
  if (userData[arrayKeys[0]] != null) {
    let index = 0;
    let value = userData;
    while (index < arrayKeys.length) {
      value = value[arrayKeys[index]]
      index++;
    }
    return value;
  }
  return [];
}