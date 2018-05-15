import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Route, Switch, withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'
import { AccountsReactComponent, AccountsReact } from 'meteor/meteoreact:accounts'
import './styles.scss'

class Authentication extends Component {

  render () {
    const { arState, signOut } = this

    return (
      <Switch>
        <Route exact path='/sign-in'          component={arState} />
        <Route exact path='/sign-up'          component={arState} />
        <Route exact path='/sign-out'         component={signOut} />
        <Route exact path='/forgot-password'  component={arState} />
        <Route exact path='/change-password'  component={arState} />
        <Route exact path='/reset-password/:token' component={arState} />
      </Switch>
    )
  }

  arState = ({ match, history }) => {
    const { path, params } = match

    // Redirect to home if already logged in.
    // Logged in users can enter only the change-password route
    if (Meteor.userId() && path !== '/change-password') {
      return (<Redirect to='/' />)
    }

    return (
      <div id='authentication'>
        <div>
          <AccountsReactComponent
            history={history}
            route={path}
            token={params.token} // for the reset-password route
          />
        </div>
      </div>
    )
  }

  signOut = () => {
    AccountsReact.logout()
    return <Redirect to='/' />
  }
}

export default withRouter(withTracker(() => {
  return {
    user: Meteor.user()
  }
})(Authentication))
