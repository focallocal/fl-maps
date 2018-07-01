import React from 'react'
import './styles.scss'

const Item = ({ item }) =>
  <div className="c-item">
    <a href={item.link}><img className='contributor' src={item.photo}/></a>
    <h3 className='c-name-text'>{item.name}</h3>
  </div>

export default Item
