import React, { Component, Fragment } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { FormGroup, Label, InputGroup, Input, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import './styles.scss'

class FindOrPost extends Component {

  render () {
    const { user } = this.props

    return (
      <div id='find-or-post'>
        <h3 className='header'>Meeting The Needs Of The Homeless</h3>

        <FormGroup className='find-wrapper'>
          <Label for='find'>Find resources near you.</Label>
          <InputGroup>
            <Input type='text' id='find' placeholder='Enter city, state or zipcode' />
            <Button>Find</Button>
          </InputGroup>

          <div className='divider'>Or</div>

          <div className='center'>
            <Button>Use Current Location</Button>
          </div>
        </FormGroup>

        <hr />

        <div className='post-wrapper'>
          <h3 className='header'>Want To Help?</h3>
          {user ? (
            <div className='center'>
              <Button tag={NavLink} to='/map?post=1'>Add a Resource</Button>
            </div>
          )
          : (
            <Fragment>
              <h3 className='header sub'>Sign Up To Add Resources</h3>
              <div className='center'>
                <Button tag={NavLink} to='/sign-up'>Sign Up & Help</Button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  }
})(FindOrPost)
