import React from 'react'
import './styles.scss'

export const Error404 = (props) => {
  return (
    <div className="error__container">
      <h3 className="error__heading">Page not found</h3>
      <br/>
      <p className="error__paragraph">Use the menu bar above to navigate the site.</p>
    </div>
  )
}
