import React from 'react';
import { Link } from 'react-router-dom'
import { Table, Col  } from 'reactstrap';
import RoleSelect from './../RoleSelect/index.js'
import { Button } from 'reactstrap'
import { rolesDataKey } from './../RolesPermissions/index'

const display = {
  User: ["profile", "name"],
  Roles: ["roles", rolesDataKey],
  Events: ["events"]
}

const AdminTable = (props) => {
  let titles = Object.keys(display);
  const {users} = props;
 
  return (
    <Table>
      <Head titles={titles}/>
      <Rows usersData={users} display={display} titles={titles} events={props.events}
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
  const display = props.display;

  const tableRows = usersData.map(user => {
    let button = <Button style={{ "marginRight": "4px" }} color='danger' onClick={(e) => props.deleteUser(user._id)}>del</Button>;
    
    return (
      <tr key={user._id}>
         {titles.map((title,i)=>{
          let toDisplay = unpackDisplay(display[title], user) 
          let isRoles = displayRoles(display[title], toDisplay, user, props.changeUserRole);
          let isEvents = displayEvents(display[title], props.events, user);
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

function unpackDisplay(arrayKeys,userData){
//Array.isArray(arrayKeys) && 
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
  // else{
  //   
  // }
}

function displayRoles(keys, roles, user, changeRole){
  
  let UserName = unpackDisplay(display['User'], user)
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