import React from 'react'
import { Button } from 'reactstrap'
import './styles.scss'

const MinimizeButton = ({ onMinimize, minimized }) => {
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
