import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Container, Row, Col } from 'reactstrap'
import { formatCategories } from '/imports/client/utils/format'
import { scrollToElement } from '/imports/client/utils/DOMInteractions'
import HoursFormatted from '/imports/client/ui/components/HoursFormatted'
import PageLoader from '/imports/client/ui/components/PageLoader'
import EditPage from './Edit'
import AttendingButton from './AttendingButton'
import './style.scss'

class Page extends Component {
  constructor (props) {
    super()
    this.state = {
      data: window.cachedDataForPage,
      id: props.match.params.id,
      loaded: false
    }
  }

  componentDidMount () {
    const { data } = this.state

    if (!data) {
      this.getEventData()
    } else {
      this.setState({ loaded: true })
      window.__setDocumentTitle(data.name)
    }
  }

  componentDidUpdate (nextProps, prevState) {
    if (this.state.data && !prevState.data) {
      window.__setDocumentTitle(this.state.data.name)
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const updatedData = window.__updatedData

    if (updatedData) {
      delete window.__updatedData

      if (window.previousStateOfMap) {
        mutateCachedMapState(updatedData)
        window.__setDocumentTitle(updatedData.name)
      }

      return {
        data: updatedData
      }
    }

    return prevState
  }

  render () {
    const {
      data,
      loaded
    } = this.state

    if (!loaded) {
      return <PageLoader className='pages' />
    }

    const {
      _id,
      address,
      categories: c,
      description,
      name,
      organiser,
      when
    } = data

    const {
      history,
      user
    } = this.props

    const categories = formatCategories(c)
    const { key } = Meteor.settings.public.gm
    const mapUrl = 'https://www.google.com/maps/embed/v1/place?key=' + key + '&q=' + address.name

    const isLoggedIn = !!user
    let isAuthor

    if (isLoggedIn) {
      isAuthor = user._id === organiser._id
    }

    return (
      <div id='page'>
        <div className='header'>
          <div className='title-wrapper'>
            <div className='title'>{name}</div>
            <div className='sub-title-categories'>{categories}</div>
          </div>
        </div>

        <Container className='body'>
          <Row>

            <Col xs={7} className='left'>
              <div className='description'>
                <SectionTitle title='About' />
                {description}
              </div>
            </Col>

            <Col xs={4} className='right'>
              {isAuthor && <EditPage data={data} history={history} />}
              <SectionTitle title='Date and Time' />

              <HoursFormatted data={when} />

              <Divider />

              <div className='location'>
                <SectionTitle title='Location' />
                <div>{address.name}</div>
                <a className='view-map' onClick={this.scrollToMap}>View Map</a>
              </div>

              <Divider />

              <AttendingButton user={user} _id={_id} isLoggedIn={isLoggedIn} />
            </Col>
          </Row>
          <iframe
            className='embedded-map'
            frameBorder='0'
            allowFullScreen
            src={mapUrl}
          />
        </Container>
      </div>
    )
  }

  scrollToMap () {
    scrollToElement('.embedded-map')
  }

  getEventData = () => {
    Meteor.call('Events.getEvent', { id: this.state.id }, (err, res) => {
      if (!err) {
        this.setState({ data: res, loaded: true })
      }
    })
  }
}

const SectionTitle = ({ title }) => <div className='section-title'>{title}</div>
const Divider = () => <div className='divider' />

export function mutateCachedMapState (updatedEntry) {
  /*
    mutate the cached object so it is updated with changes made to the current viewd page.
  */

  const entryIndex = window.previousStateOfMap.events.findIndex(e => e._id === updatedEntry._id)
  window.previousStateOfMap.events[entryIndex] = updatedEntry
}

Page.propTypes = {
  match: PropTypes.object.isRequired
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  }
})(Page)

// Testing
export { Page }
