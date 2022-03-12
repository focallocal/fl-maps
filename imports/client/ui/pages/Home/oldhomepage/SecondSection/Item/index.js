import React from 'react'

import DCSLink from '/imports/client/ui/components/DCSLink'

import './styles.scss'

const Item = ({ item, index }) =>
  <div className="item">
    <div className={'icon ' + item.icon} />
    <h3 className='item-title'>
      <DCSLink badge="true" format="text-link" title={item.title} triggerId={item.title.toLowerCase()} style="link"/>
      {index === 0 && <hgroup className="speech-bubble"><p>Click titles to discuss</p></hgroup>}
    </h3>
    <span className='item-text'>{item.text}</span>
  </div>

export default Item
