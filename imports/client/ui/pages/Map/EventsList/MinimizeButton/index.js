import React from 'react'
import { Button } from 'reactstrap'
import './styles.scss'

const MinimizeButton = ({ onMinimize }) => {
  let minimized = false

  try {
    minimized = document.body.querySelector('#map-container').classList.contains('minimized')
  } catch (ex) {}

  return (
    <Button
      id='minimize'
      className={minimized ? 'minimized' : ''}
      onClick={onMinimize}
    >
      {minimized ? 'maximize' : 'minimize'}
    </Button>
  )
}

export default MinimizeButton
