import React from 'react'
import { shallow } from 'enzyme'
import {Button } from "reactstrap";
import CancelDeleteBtns from './../CancelDeleteBtns/CancelDeleteBtns'

describe('<CancelDeleteBtns/>', ()=>{
  const user={_id: '123'}
  const deleteUser = () => {
    return null;
  }
  const wrapper = shallow(<CancelDeleteBtns idToDelete={user._id} deleteDocument={deleteUser} deleteText={'del'}/>)

  it('should render both confirm and concel buttons when isCancelConfirm equals true', () => {
    wrapper.setState({ isCancelConfirm: true });
    expect(wrapper.find(Button)).toHaveLength(2)
  })
})