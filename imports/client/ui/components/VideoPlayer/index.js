import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import './styles.scss'
import allPlaylists from '/imports/both/i18n/en/video.json'
import Subscribe from '/imports/client/ui/components/VideoPlayer/Subscribe'

/**
 * @author Arty S
 * Video Player Component: Loads a video player in the event page banner.
 * videos can be submitted by users on event creation (part of the new event form)
 * alternatively, videos default to The Public Happiness Movement Youtube channel
 */

class VideoPlayer extends Component {

  static propTypes = {
    /**
     * List of categories linked to the event: determines what default video plays
     */
    categories: PropTypes.array,
    /**
     * Refers to user submitted videos passed from the page, if any
     */
    video: PropTypes.array,
  }

  constructor (props) {
    super(props)
    this.state = {
      /**
       * This flag is used to trigger next video shuffler.
       * current video ends => sets to true => next video starts => reverts to false
       */
      nextVideo: false
    }
  }

  /**
   * plz refer to comments on component state
   */
  componentDidUpdate () {
    this.setState({ nextVideo: false })
  }

  /**
   * Prevents component re-rendering until nextVideo flag set to true (when video ends)
   * otherwise player will re-render on every page click
   */
  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.nextVideo === true) return true
    return false
  }

  /**
   * Render method, includes 2 external components:
   * React Player
   * @see {@link https://www.npmjs.com/package/react-player}
   * Youtube Subscribe Button
   * @see {@link imports/client/ui/components/VideoPlayer/Subscribe.js}
   */
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

/**
 * Function called by video player to obtain a valid URL to play
 * 
 * @param {Array} categories Array of this event's categories (prop originally from db)
 * @param {Array} video Array of external videos if user has added (prop originally from db)
 */
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

/**
 * Function called by buildURL()
 * to randomly select a video from an array
 * 
 * @param {Array} playlist Array of videos to be randomized
 */
function getRandomVideo (playlist) {
  const length = playlist.length
  const randomIndex = Math.floor(Math.random() * length)
  return playlist[randomIndex]
}

/**
 * Function called by buildURL() when user has no submitted videos to play
 * cycles through top level "playlist of playlists" to select appropriate one(s) that match event category(s)
 * populates output array of videos with any videos from the above cycle not already pushed to the array
 * 
 * @param {*} playlists Top-level "playlist of playlists" from i18n
  * @param {*} eventCategories Event categories used to filter out inappropriate playlists
 * @param {*} outputArray This is the new custom youtube playlist for the event
 */
function generatePlaylist (playlists, eventCategories, outputArray) {
  playlists.forEach(playlist => {
    eventCategories.forEach(eventCategory => {
      if (playlist.categories.includes(eventCategory.name)) {
        playlist.videos.forEach(video => {
          if (!outputArray.includes(video)) {
            outputArray.push(video)
          }
        })
      }
    })
  })

  // NOTE: if event category does not have a playlist then we take the parent category instead
  if (outputArray.length === 0) {
    parentCategories = eventCategories.map(eventCategory => {
      return {name: eventCategory.parent}
    })
    generatePlaylist(playlists, parentCategories, outputArray)
  }

  // NOTE: if parent does not have a playlist either then we generate a grand default
  if (outputArray.length === 0) {
    generatePlaylist(playlists, [{ 'name': 'default' }], outputArray)
  }

  return outputArray
}

export default VideoPlayer
