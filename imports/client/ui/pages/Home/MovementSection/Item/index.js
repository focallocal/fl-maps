import React from 'react'
import './styles.scss'

const Item = ({ item, loginButton }) =>
  <div className="item">
    <h3 className='item-text'>{item.title}</h3>
    {item.link !== undefined ? loginButton : null}
    <br/>
    {item.subItems !== undefined ?
      item.subItems.map((subItem, i) => (
        <div key={i} className='subItems'>
          <span className='subItemIitle'>{subItem.title}</span>
          {
            typeof subItem.values == "object" ? 
              subItem.values.map((value, i) => (
                <div key={i}>
                  <span>{value.title}</span>: <span className='value'>{value.value}</span>
                </div>
              ))
            : <span>
                <span className='value'>: </span>
                <span className='value'>{subItem.value}</span>
                <br/>
              </span>
          } 
          <br/>
        </div>
      ))
    : null}
  </div>

export default Item
