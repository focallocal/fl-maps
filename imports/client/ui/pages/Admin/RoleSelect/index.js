import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { roleOptions, user} from "./../RolesPermissions/index"

export const RadioInput = (props) => {
  const { rolesData } = props

  //profile name could have duplication potential for users that sign in through google or facebook.
  // using database id would expose it on the front end
  // instead generate a unique id and use profile name/email
  let name = generateUniqueId() + props.UserName;
  return (
    roleOptions.map((role,i) => { 
                       // if role found set check        or no role set to default user
      let checked = (rolesData.indexOf(role) !== -1 || (rolesData.length == 0 && role == user)) ? "checked" :null;

      return (
          <Label check key={i}>
            <input type="radio" value={role} name={name} defaultChecked={checked}
              onClick={(e) => props.changeUserRole(e, props.user._id)} key={i + name} />
            <span>{role}</span>
          </Label> 
      )
    })

  )
}

class RoleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    //current database documents do not contain roles yet so this is to check for their existance.
    let rolesData = this.props.rolesData == null ? [] :  this.props.rolesData
    return ( 
      <div>
        <FormGroup >
          <RadioInput roleOptions={roleOptions} rolesData={rolesData} UserName={this.props.UserName} user={this.props.user} changeUserRole={this.props.changeUserRole}/>
        </FormGroup>
      </div>
     )
  }
}

function generateUniqueId() {
  // code found here https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript?rq=1
  try {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
    
  } catch (error) {
    // if an outaded browser is used use Math.random instead of es6 crypto
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    
  }
}

export default RoleSelect;