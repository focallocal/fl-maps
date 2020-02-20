import React from 'react'
import { Button } from 'reactstrap'
import './styles.scss'

export default class MinimizeButton extends React.Component {
  constructor() {
    super()
    this.state = {
      minimized: false
    }
  }

  componentDidMount() {
    //  Comment this out for test failing(MinimizeButton.test). Not sure if will still need?
    // document.body.querySelector('#minimize').classList.toggle('minimized')
  }

  toggleMinimize = () => {
    this.setState({ minimized: !this.state.minimized })
  }

  render() {
    const { minimized } = this.state
    return (
      <Button
        id='minimize'
        className={minimized ? 'minimized' : ''}
        onClick={this.toggleMinimize}
      >
        {minimized ? 'restore' : 'minimize'}
      </Button>
    )
  }
}
