import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'

import Subscribe from '/imports/client/ui/components/VideoPlayer/Subscribe'

import './styles.scss'
import i18n from '/imports/both/i18n/en'

let allPlaylists = i18n.Video
let categoryTree = i18n.Categories

// import allPlaylists from '/imports/both/i18n/en/video.json'
// import categoryTree from '/imports/both/i18n/en/categories.json'

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
    categories: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    /**
     * Refers to user submitted videos passed from the page, if any
     */
    video: PropTypes.object
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
        {!video && <div className="subscribeOverlay">Subscribe</div>}
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
function generatePlaylist(playlists, eventCategories, outputArray, depth = 0) {
  if (depth > 5) return outputArray; // safeguard against infinite loops

  const toArray = (value) => Array.isArray(value) ? value : value ? [value] : [];
  const eventCats = toArray(eventCategories);

  // STEP 1: Try to match event categories
  playlists.forEach(playlist => {
    eventCats.forEach(eventCategory => {
      if (playlist.categories.includes(eventCategory.name)) {
        playlist.videos.forEach(video => {
          if (!outputArray.includes(video)) {
            outputArray.push(video);
          }
        });
      }
    });
  });

  // STEP 2a: If no matches, check validity of categories
  if (outputArray.length === 0) {
    const possibleCategories = categoryTree.reduce((tot, elem) => {
      return tot.concat([{ name: elem.name, parent: true }].concat(elem.categories));
    }, []);

    const categoryStillValid = possibleCategories.some(category =>
      eventCats.some(eventCategory => eventCategory.name === category.name)
    );

    if (!categoryStillValid) {
      // only try "default" once
      if (!eventCats.some(c => c.name === "default")) {
        return generatePlaylist(playlists, [{ name: "default" }], outputArray, depth + 1);
      }
      return outputArray; // stop if even "default" failed
    }
  }

  // STEP 2b: Fallback to parent categories
  if (outputArray.length === 0) {
    const parentCategories = categoryTree.filter(parent =>
      parent.categories.some(category =>
        eventCats.some(eventCategory => eventCategory.name === category.name)
      )
    );

    if (parentCategories.length > 0) {
      return generatePlaylist(playlists, parentCategories, outputArray, depth + 1);
    }
  }

  // STEP 3: Final fallback to default
  if (outputArray.length === 0) {
    if (!eventCats.some(c => c.name === "default")) {
      return generatePlaylist(playlists, [{ name: "default" }], outputArray, depth + 1);
    }
  }

  return outputArray;
}

export default VideoPlayer
