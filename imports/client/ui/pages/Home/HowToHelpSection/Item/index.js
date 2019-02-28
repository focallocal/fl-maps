import React from 'react'
import './styles.scss'

const Item = ({ item, loginButton }) =>
  <div className="item">
    <h3 className='item-text'>{item.text}</h3>
    {item.link !== undefined ? loginButton : null}
    <br/>
    <span className='item-subText'>{item.subText}</span>
    {item.link !== undefined &&
      <a className="join btn btn-primary" href={item.link}>{item.linktext}</a>
    }
  </div>

export default Item
