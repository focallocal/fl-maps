import React from 'react';
import { Table, Col  } from 'reactstrap';
import { display} from './helper'
import TableData from './TableData'
export const Head = (props)=>{
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


const AdminTable = ({ users, changeUserRole, deleteUser, events, isAllEvents, deleteAllEvents}) => {
  const titles = display.map((ele) => {
    return ele.title;
  })

  return (
    <Table>
      <Head titles={titles}/>
      <Rows usersData={users} titles={titles} userEvents={events} deleteAllEvents={deleteAllEvents}
        changeUserRole={changeUserRole} deleteUser={deleteUser} isAllEvents={isAllEvents}/>
    </Table>
  )
}



export function Rows(props){
  const titles = props.titles;
  const usersData = props.usersData
  const tableRows = usersData.map(user => { 
    return (
      <tr key={user._id}>
         {titles.map((title,i)=>{        
          return <TableData title={title} user={user} key={i} {...props}/>
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

export default AdminTable;