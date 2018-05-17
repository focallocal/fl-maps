import React, { Component, Fragment } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import Find from './Find'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const { Home } = i18n
class FindOrPost extends Component {
  render () {
    const { user } = this.props

    return (
      <div id='find-or-post'>
        <h3 className='header'>{Home.first_title}</h3>

        <Find />

        <hr />

        <div className='post-wrapper'>
          <h3 className='header'>{Home.post.first_title}</h3>
          {user ? (
            <div className='center'>
              <Button tag={NavLink} to='/map?new=1'>{Home.post.button_loggedIn}</Button>
            </div>
          )
            : (
              <Fragment>
                <h3 className='header sub'>{Home.post.second_title}</h3>
                <div className='center'>
                  <Button tag={NavLink} to='/sign-up'>{Home.post.button}</Button>
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
