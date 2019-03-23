import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Input, Label } from 'reactstrap'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import { videoHosts } from '/imports/both/collections/events/helpers/index.js'
import labels from '/imports/both/i18n/en/new-event-modal.json'
import './styles.scss'

class VideoLink extends Component {
  constructor (props) {
    super(props)
    this.state = {
      host: '',
      address: '',
      open: false,
    }
  }
  render () {
    const { host, address } = this.state

    return (
      <div className='video'>
        <AutoField
          name={`${this.props.name}.host`}
          // onClick={this.setState({ open: !this.state.open})} <-- causes a loop
        />
        <AutoField
          className="videoAddress"
          name={`${this.props.name}.address`}
          placeholder={labels.video.address}
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

  fetchVideoURL = (id, form) => {
    const link = id === 1 ? form.getModel().video.link1 :
      id === 2 ? form.getModel().video.link2 :
        form.getModel().video.link3
    if (link === undefined) {
      return ''
    }
    if (videoHosts.find(e => e.host === link.host.value) === undefined) {
      return ''
    }
    return videoHosts.find(e => e.host === link.host.value).prefix
  }

  handleChange = (value) => {
    this.setState({ address: value })
  }

  // componentDidUpdate (prevProps, prevState) {
  //   if (prevState !== this.state) {
  //     const { form, linkId } = this.props
  //     let links = form.getModel().video.links || []
  //     links[linkId] = this.state
  //     form.change('video.links', links)
  //   }
  // }
}

VideoLink.propTypes = {
  form: PropTypes.object.isRequired
}

export default VideoLink
