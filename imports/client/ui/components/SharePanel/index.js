import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  EmailShareButton,

  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  RedditIcon,
  EmailIcon
} from 'react-share'
import React, { Component, Fragment } from 'react'
import HoursFormatted from '/imports/client/ui/components/HoursFormatted'
import PropTypes from 'prop-types'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

/**
 * @author Arty S
 * Share Panel Component: Loads a series of social media buttons.
 * users can use these to share the event page
 */

// NOTE: testing facebook share on local machine will lead to an error page if target domain is localhost
// const url = window.location

class SharePanel extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    const hoursReactComponent = HoursFormatted({ data: this.props.data })
    const hoursText = drillDownToText(hoursReactComponent, '')

    const url = 'https://focallocal.org/page/fGd8HuHZEv8QectPS'
    const title = i18n.Map.eventInfo.socialMedia.messagePre + document.title + "\n" + hoursText + "\n"
    console.log(title)
    return (
      <div className="sharePanel">
        <FacebookShareButton url={url} quote={title} hashtag="#Focallocal" children={<FacebookIcon size={32} round={true} />} />
        <TwitterShareButton url={url} title={title} hashtags={['Focallocal']} children={<TwitterIcon size={32} round={true} />} />
        <RedditShareButton url={url} title={title} children={<RedditIcon size={32} round={true} />} />
        <LinkedinShareButton url={url} title={title} description={title} children={<LinkedinIcon size={32} round={true} />} />
        <EmailShareButton url={url} subject={title} children={<EmailIcon size={32} round={true} />} />
      </div>
    )

  }
}


function drillDownToText (node, output) {
  const children = node.props.children
  children.forEach(child => {
    if (typeof child === 'string') output += child
    else if (typeof child !== 'boolean') {
      output = drillDownToText(child, output)
    }
  })
  return output
}

export default SharePanel
