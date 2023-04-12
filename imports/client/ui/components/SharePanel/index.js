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
// const url = window.location <-- set this to a live www. url to test

class SharePanel extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const hoursReactComponent = HoursFormatted({ data: this.props.data })
    const hoursText = drillDownToText(hoursReactComponent, '')

    const url = window.location
    const string = i18n.Map.eventInfo.socialMedia.messagePre + document.title + '\n' + hoursText + '\n'
    const title = string.replace(' Next:', 'Next:').replace(' Repeating:', '\nRepeating:')

    return (
      <div className="sharePanel">
        <FacebookShareButton url={url} quote={title} hashtag="#publichappinessmovement" children={<FacebookIcon size={32} round={true} />} />
        <TwitterShareButton url={url} title={title} hashtags={['publichappinessmovement']} children={<TwitterIcon size={32} round={true} />} />
        <RedditShareButton url={url} title={title} children={<RedditIcon size={32} round={true} />} />
        <LinkedinShareButton url={url} title={title} description={title} children={<LinkedinIcon size={32} round={true} />} />
        <EmailShareButton url={url} subject={title} children={<EmailIcon size={32} round={true} />} />
      </div>
    )
  }
}

/**
 * This function takes the html-formatted React output of the 'when' component (i.e. event calendar schedule)
 * and returns a plain text string representing this schedule
 *
 * @param {Object} node This is React component or child node (see below comments for different possible node types)
 * @param {String} output This is a running total of the output string - the function adds to this as it drills recursively into the node
 */
function drillDownToText (node, output) {
  const children = node.props.children
  children.forEach(child => {
    if (child) {
      // Function has drilled down to the string? => add this to output
      if (typeof child === 'string') output += child
      // Replace any <br> and <li> tags with whitespace (otherwise words on a newLine get mushed together)
      else if (child.type === 'br' || child.type === 'li') {
        output += ' '
      }
      // If the node has further children we continue drilling down until we get to the strings
      if (child.props && child.props.children) {
        output = drillDownToText(child, output)
      }
    }
  })
  return output
}

export default SharePanel
