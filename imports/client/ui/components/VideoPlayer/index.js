import React, { Component } from 'react'
import ReactPlayer from 'react-player/lib/players/YouTube'
import './styles.scss'

const playlists = {
  'Positive Action Road Trips': 'PLzwMXFvS_OYOkzU_-WFYMoPuwPi0QNsvN',
  'Bubble Blow Flash Mob': 'PLzwMXFvS_OYOQilLBT4RVOTx1X2PmfSti',
  'Free Hugs': 'PLzwMXFvS_OYND-Tm2a6404bvaEzrXPdXm',
  'Public Music Jam': 'PLzwMXFvS_OYNYqw4ZQK5Sh0iXjym2c9Lp',
  'Open Skills Sharing': 'PLzwMXFvS_OYPOIGeR9sM58sNW9U04qsAd',
  'Pillow Fight 4 Connection': 'PLzwMXFvS_OYNtATdZWjvTNs-CsEG-KedB',
  'Take a Smile': 'PLzwMXFvS_OYOZHFwIXp_fE68860wOJWdw',
  'International Pillow Fight Day London 2014': 'PLzwMXFvS_OYPk2E_4dwIxrRqFcB4iqLSl',
  'Community Slip and Slide': 'PLzwMXFvS_OYOlujizzDYNvvRn-P8OnXVD',
  'Kindness Auction and BBQ': 'PLzwMXFvS_OYOlujizzDYNvvRn-P8OnXVD'
}

const categoryPlaylist = [
  { 'name': 'Meet me for Action!', 'color': 'red', 'default': true, 'url': '' },
  { 'name': 'Global Flash Mobs', 'color': '#38a80d', 'url': '' },
  { 'name': 'Be Happier Community Meet', 'color': '#18a80d', 'url': '' },
  { 'name': 'Free Hugs', 'color': '#f82d2d', 'url': 'https://news.focallocal.org/free-hugs/' },
  { 'name': 'Pillow Fight 4Connection', 'color': '#48a80d', 'url': 'https://news.focallocal.org/pillow-fight4connection/' },
  { 'name': 'Give a Bubble', 'color': '#0ea575', 'url': 'https://news.focallocal.org/give-a-bubble/' },
  { 'name': 'Take a Smile', 'color': '#0e77a3', 'url': 'https://news.focallocal.org/take-a-smile/' },
  { 'name': 'Public Dancing', 'color': '#6512bc', 'url': '' },
  { 'name': 'Public Music Jam', 'color': '#a711c4', 'url': '' },
  { 'name': "I've Got a Message for YOU!", 'color': '#fc1976', 'url': 'https://news.focallocal.org/ive-got-a-message-for-you-the-positive-thinking-jar/' },
  { 'name': 'The Positivity Facilitator', 'color': '#080fba', 'url': 'https://news.focallocal.org/the-positivity-facilitator/' },
  { 'name': 'Inspire MY City', 'color': '#e5a20b', 'url': 'https://news.focallocal.org/musical-connection/transport-jam/' },
  { 'name': 'Eye Bombing', 'color': '#43a904', 'url': '' },
  { 'name': 'Connecting Canvas', 'color': '#ce1ca4', 'url': 'https://news.focallocal.org/connecting-canvas/' },
  { 'name': 'Guerrilla Urban Beautification', 'color': '#1f482d', 'url': 'https://news.focallocal.org/community-guerrilla-gardening/' },
  { 'name': 'Open Skills Sharing Day', 'color': '#52929b', 'url': 'https://news.focallocal.org/international-open-skills-sharing-day/' },
  { 'name': 'Pick-me-up Public Poetry', 'color': '#6d65bc', 'url': '' },
  { 'name': 'Busker Dance Party', 'color': '#5e9e6b', 'url': '' },
  { 'name': 'Something Else', 'color': '#1a61ef', 'url': '' },
  { 'name': 'Good Human Appreciation', 'color': '#4a0bff', 'url': '' },
  { 'name': 'Eye Contact for Connection', 'color': '#adbc12', 'url': 'https://news.focallocal.org/eye-contact-gathering/' },
  { 'name': 'Health + Well-being Flash', 'color': '#5e9b6b', 'url': '' },
  { 'name': 'Gather for More Happiness', 'color': '#63d85b', 'url': '' },
  { 'name': 'Supporting with my Skills', 'color': '#f57c00', 'url': '' },
  { 'name': 'Taking a Break', 'color': '#d7191c', 'url': '' }
]

class VideoPlayer extends Component {
  render () {
    let url = 'xxx'
    let playlistID = playlists['Take a Smile']
    const { categories } = this.props
    if (true) {
    // if (categories.some((e) => e.name === 'Free Hugs')) {
      url = `https://www.youtube.com/playlist?list=${playlistID}
      &modestbranding=1
      &rel=0`
    }

    return (
      <div className="videoContainer">
        <ReactPlayer
          className="videoPlayer"
          url={url}
          width='100%'
          height='100%'
          volume={0.5}
          playing
        />
      </div>
    )
  }
}

export default VideoPlayer
