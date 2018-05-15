import React from 'react'
import { Button } from 'reactstrap'

const Button_ = ({
  onClick,
  social,
  text
}) => {
  if (social) {
    return (
      <Button onClick={onClick} className={text}>
        <i className={`fab fa-${text}`} /> {`Continue with ${text[0].toUpperCase()}${text.substr(1)}`}
      </Button>
    )
  }

  return (
    <Button onClick={onClick}>{text}</Button>
  )
}

export default Button_
