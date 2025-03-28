import PropTypes from 'prop-types'
import React from 'react'
import VideoLink from '../VideoLink'

const VideoEntry = React.memo(({ id, form }) => {
  return (
    <VideoLink
      form={form}
      name={`video.link${id}`}
    />
  )
})

VideoEntry.propTypes = {
  id: PropTypes.number.isRequired,
  form: PropTypes.object.isRequired
}

VideoEntry.displayName = 'VideoEntry'

export default VideoEntry