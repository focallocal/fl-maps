import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { FormGroup, Input, Label } from 'reactstrap'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import { videoHosts } from '/imports/both/collections/events/helpers/index.js'
import './styles.scss'

class VideoLink extends Component {
  constructor (props) {
    super(props)
    this.state = {
      host: '',
      address: ''
    }
  }
  render () {
    const { host, address } = this.state

    return (
      <div className='video'>
        <AutoField
          name='video.links.$.host'
          value={host}
          onChange={value => this.selectHost(value)}
        />
        <AutoField
          className="videoAddress"
          name='video.links.$.address'
          value={address}
          onChange={value => this.handleChange(value)}
        />
      </div>
    )
  }

  selectHost = (value) => {
    const videoHostPrefix = value.length > 0 ? videoHosts.find(e => e.host === value).prefix : ''
    this.setState({
      host: value,
      address: videoHostPrefix
    })
  }

  handleChange = (value) => {
    this.setState({
      address: value
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState !== this.state) {
      const { form, linkId } = this.props
      let links = form.getModel().video.links || []
      links[linkId] = this.state
      form.change('video.links', links)
    }
  }
}

VideoLink.propTypes = {
  form: PropTypes.object.isRequired
}

export default VideoLink
