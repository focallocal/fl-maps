/*******************
* CURRENTLY DISABLED - May be added back in future when works across both maps
********************/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { Button } from 'reactstrap'
import { Loader } from '/imports/client/ui/components/PageLoader'

class AttendingButton extends Component {
  state = {
    updating: false,
    tooManyRequests: false
  }

  componentDidMount () {
    this._isMounted = true
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  render () {
    const {
      updating,
      tooManyRequests
    } = this.state

    const {
      _id,
      isLoggedIn,
      user
    } = this.props

    let isAttending
    if (isLoggedIn) {
      isAttending = user.attendance ? user.attendance.find(a => a.id === _id) : false
    }

    return (
      <div className='attending-button'>
        <Button
          className={'fixed-bg ' + (isAttending && !updating ? 'active' : '')}
          onClick={this.updateAttendance}
          disabled={tooManyRequests}
        >
          {updating ? (<Loader className='button' />) : (isAttending ? 'Attending!' : 'Attend')}
        </Button>

        {tooManyRequests && (
          <div className='err-msg'>Please wait 10 seconds before trying again</div>
        )}
      </div>
    )
  }

  updateAttendance = () => {
    const {
      updating,
      tooManyRequests
    } = this.state

    const {
      _id,
      user
    } = this.props

    if (!user) {
      this.redirectToLogin()
    } else if (!updating && !tooManyRequests) {
      // Fetch with animation in the background, ensure enough time has passed between request/resolve
      // so animation is smooth
      this.setState({ updating: true })

      const startedOn = Date.now()
      Meteor.call('Events.attendEvent', { id: _id }, (err, res) => {
        if (err && err.error === 'too-many-requests') {
          this.setState({
            tooManyRequests: true,
            updating: false
          })

          setTimeout(() => {
            if (this._isMounted) {
              this.setState({ tooManyRequests: false })
            }
          }, err.details.timeToReset)
        } else {
          // updat state after 1 second so animation can run.
          const timePassed = Date.now() - startedOn
          setTimeout(() => {
            if (this._isMounted) {
              this.setState({ updating: false, tooManyRequests: false })
            }
          }, timePassed >= 1000 ? 1 : 1000 - timePassed)
        }
      })
    }
  }

  redirectToLogin = () => {
    sessionStorage.setItem('redirect', '/page/' + this.props._id)
    this.props.history.push('/sign-in')
  }
}

AttendingButton.propTypes = {
  _id: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object
}

export default AttendingButton
