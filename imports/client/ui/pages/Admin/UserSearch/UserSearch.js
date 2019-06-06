import React, { Component } from 'react';
import {Form, FormGroup, Input, Button} from 'reactstrap'
class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {  a:""}
    this.userToSearch = React.createRef();
  }
  searchForUser = (e) => {
    e.preventDefault();
    this.setState({ a: this.userToSearch });
    this.props.searchForUser(this.userToSearch.current.value);
  }
  render() { 
    return ( 
      <div className="search-container">
        <Form onSubmit={this.searchForUser} action="">
           <FormGroup>
       
              <input placeholder="profile name or email" type="text" ref={this.userToSearch} />
              <Button>Search</Button>
          </FormGroup>
        </Form>
   
      </div>

   
    )
  }
}
 
export default UserSearch;