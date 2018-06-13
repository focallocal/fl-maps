import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Container, Row, Col, Button } from 'reactstrap'
import { formatCategories } from '/imports/client/utils/format'
import { scrollToElement } from '/imports/client/utils/DOMInteractions'
import HoursFormatted from '/imports/client/ui/components/HoursFormatted'
import PageLoader from '/imports/client/ui/components/PageLoader'
import './style.scss'

class Page extends Component {
  constructor (props) {
    super()
    this.state = {
      id: props.match.params.id,
      data: window.cachedDataForPage
    }
  }

  componentDidMount () {
    if (!this.state.data) {
      this.getEventData()
    }
  }

  render () {
    const {
      data
    } = this.state

    if (!data) {
      return <PageLoader className='pages' />
    }

    const {
      address,
      categories: c,
      description,
      name,
      organiser,
      when
    } = data

    const categories = formatCategories(c)
    const { key } = Meteor.settings.public.gm
    const mapUrl = 'https://www.google.com/maps/embed/v1/place?key=' + key + '&q=' + address.name

    // const isAuthor = this.props.user._id === organiser._id

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
              <SectionTitle title='Date and Time' />
              <HoursFormatted data={when} />
              <Divider />
              <div className='location'>
                <SectionTitle title='Location' />
                <div>{address.name}</div>
                <a className='view-map' onClick={this.scrollToMap}>View Map</a>
              </div>
              <Divider />
              <Button>Attend</Button>
            </Col>
          </Row>
          <div id="disqus_thread" />
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
        this.setState({ data: res })
        intializeDisqus(res._id)
      }
    })
  }
}

const SectionTitle = ({ title }) => <div className='section-title'>{title}</div>
const Divider = () => <div className='divider' />

function intializeDisqus (id) {
  // Config
  window.disqus_config = function () {
    this.page.url = Meteor.absoluteUrl()
    this.page.identifier = id
  }

  const disqus_url = window.__mapType === 'gatherings' ? 'focallocal-1' : 'brightertomorrowmap'

  // Load disqus
  let d = document
  let s = d.createElement('script')
  s.src = 'https://' + disqus_url + '.disqus.com/embed.js'
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s)
}

Page.propTypes = {
  match: PropTypes.object.isRequired
}

Page.defaultProps = {
  user: {}
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  }
})(Page)

// Testing
export {
  Page
}
