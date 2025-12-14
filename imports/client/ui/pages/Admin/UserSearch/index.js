import React, { Component } from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'
import i18n from '/imports/both/i18n/en'

const searchI18n = i18n.Admin.search

class UserSearch extends Component {
  constructor (props) {
    super(props)
    this.userToSearch = React.createRef()
  }

  searchForUser = (e) => {
    e.preventDefault()
    this.props.searchForUser(this.userToSearch.current.value)
  }

  render () {
    return (
      <div className="search-container">
        <Form onSubmit={this.searchForUser} action="">
          <FormGroup>
            <input placeholder={searchI18n.placeholder} type="text" ref={this.userToSearch} />
            <Button>{searchI18n.searchBtn}</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default UserSearch
