import React from 'react'
import './styles.scss'

const Item = ({ item }) =>
  <div className="item">
    <div className={'icon ' + item.icon} />
    <h3 className='item-title'>{item.title}</h3>
    <span className='item-text'>{item.text}</span>
  </div>

export default Item
