import React, { Component, Fragment } from 'react'
import ReactPlayer from 'react-player'
import './styles.scss'
import allPlaylists from '/imports/both/i18n/en/video.json'
import Subscribe from '/imports/client/ui/components/VideoPlayer/Subscribe'

class VideoPlayer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // NOTE: this is the 'shuffle' toggle
      // when set to true player will reload with new random video
      nextVideo: false
    }
  }

  componentDidUpdate () {
    this.setState({ nextVideo: false })
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.nextVideo === true) return true
    // NOTE: otherwise the player will keep re-rendering on every page click
    return false
  }

  render () {
    const { categories, video } = this.props

    return (
      <div
        className="videoContainer"
      >
        <ReactPlayer
          className="videoPlayer"
          url={buildURL(categories, video)}
          width='100%'
          height='100%'
          volume={0.5}
          playing
          onEnded={() => {
            this.setState({ nextVideo: true })
          }}
        />
        <div className="subscribeOverlay">Subscribe</div>
        {!video && <Subscribe className="subscribe" />}
      </div>
    )
  }
}

function buildURL (categories, video) {
  // if user has saved their own video(s)
  if (video) {
    const playlist = Object.values(video).map(e => e.address)
    return getRandomVideo(playlist.filter(e => e !== undefined))
  }
  // else use focallocal videos
  const playlist = generatePlaylist(allPlaylists, categories, [])
  const videoID = getRandomVideo(playlist)
  const url = `https://www.youtube.com/watch?v=${videoID}&modestbranding=1&rel=0&disablekb=1`
  return url
}

function getRandomVideo (playlist) {
  const length = playlist.length
  const randomIndex = Math.floor(Math.random() * length)
  return playlist[randomIndex]
}
function generatePlaylist (playlists, eventCategories, outputArray) {
  playlists.forEach((playlist) => {
    eventCategories.forEach((eventCategory) => {
      if (playlist.categories.includes(eventCategory.name)) {
        playlist.videos.forEach((video) => {
          if (!outputArray.includes(video)) {
            outputArray.push(video)
          }
        })
      }
    })
  })

  // NOTE: if event category does not have a dedicated playlist then we generate default
  if (outputArray.length === 0) {
    generatePlaylist(playlists, [{ 'name': 'default' }], outputArray)
  }

  return outputArray
}

export default VideoPlayer
