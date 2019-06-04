import React from 'react';
import { Link } from 'react-router-dom'
import { Table, Col  } from 'reactstrap';
import RoleSelect from './../RoleSelect/index.js'
import { rolesDataKey } from './../RolesPermissions/index'
import i18n from './../../../../../../imports/both/i18n/en'
import CancelDeleteBtns from './../CancelDeleteBtns/CancelDeleteBtns'
const display = [
  { title: i18n.Admin.titles["user"], dataBaseKeys: ["profile", "name"]},
  { title: i18n.Admin.titles["role"], dataBaseKeys: ["roles", rolesDataKey] },
  { title: i18n.Admin.titles["event"], dataBaseKeys: ["events"] },
]

const AdminTable = (props) => {
  const { users } = props;
  const titles = display.map((ele) => {
    return ele.title;
  })
  const dataBaseKeys = display.map((ele) => {
    return ele.dataBaseKeys;
  })

  return (
    <Table>
      <Head titles={titles}/>
      <Rows usersData={users} dataBaseKeys={dataBaseKeys} titles={titles} events={props.events}
        changeUserRole={props.changeUserRole} deleteUser={props.deleteUser}/>
    </Table>
  )
}

function Head(props) {
  let titles = props.titles.map(ele => {
    return <th key={ele}>{ele}</th>
  })

  return (
    <thead>
      <tr>
        {titles}
      </tr>
    </thead>
  )
}

function Rows(props){
  const titles = props.titles;
  const usersData = props.usersData
  const dataBaseKeys = props.dataBaseKeys;

  const tableRows = usersData.map(user => {
      // create button wrapper component to take in cancel confirm or reagular and function
    let button = <CancelDeleteBtns user={user} deleteUser={props.deleteUser}/>;
    return (
      <tr key={user._id}>
         {titles.map((title,i)=>{
          
          let toDisplay = getValueFromData(dataBaseKeys[i], user) 
          let isRoles = displayRoles(dataBaseKeys[i], toDisplay, user, props.changeUserRole);
          let isEvents = displayEvents(dataBaseKeys[i], props.events, user);
          if (isRoles){
            toDisplay = isRoles;
          }
          if (isEvents){
            toDisplay = isEvents
          }
          if (title !== "User"){
          
            button = null;
          }
          return <td key={i}>{button}{toDisplay}</td>
        })}
      </tr>
    )
  })

  return(
    <tbody>
      {tableRows}
    </tbody>
  )
}

function getValueFromData(arrayKeys,userData){

  if (userData[arrayKeys[0]] != null){
    let index = 0;
    let value = userData;
    while (index < arrayKeys.length  ) {    
      
      value = value[arrayKeys[index]]
      index++;
    }
    return value;
  }
  return [];
}

function displayRoles(keys, roles, user, changeRole){
  const userDataBaseKeys = display[0]["dataBaseKeys"];
  let UserName = getValueFromData(userDataBaseKeys, user)
  if (keys.indexOf(rolesDataKey) !== -1 ){

    return <RoleSelect rolesData={roles} UserName={UserName} user={user} changeUserRole={changeRole}/>

  }
  else{
    return false
  }
}

function displayEvents(key, eventData, user){
    const userEvents = eventData.filter(ele => {

      return ele.organiser._id === user._id;
    })
  if (userEvents.length > 0 && key.indexOf('events') != -1){

    return userEvents.map(ele => {
      let id = ele._id
      let name = ele.name;
      let url = `/page/${id}`
      return <Link key={ele._id} to={url}>{name} /</Link>
    })
   

  }

 
  return false;
}


export default AdminTable;