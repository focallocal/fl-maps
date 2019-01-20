import React from 'react'
import './styles.scss'

const Item = ({ item }) => {
  return (
    <div className="item">
      <h3 className='item-text'>{item.text}</h3>
      {item.link !== undefined &&
        <a className="join btn btn-primary" href={item.link}>{item.linktext}</a>
      }
      <span className='item-subText'>{item.subText}</span>
    </div>
  )
}

export default Item
