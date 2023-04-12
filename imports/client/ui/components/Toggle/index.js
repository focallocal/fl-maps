import React, { Component } from 'react'

class Toggle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: false
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.isShow !== this.props.isShow) {
      this.setState({ isShow: this.props.isShow })
    }
  }

  toggle = () => {
    this.setState({ isShow: !this.sate.isShow })
  }
  render () {
    const { componentToToggle } = this.props
    return (
      <React.Fragment>
        {componentToToggle({ isShow: this.state.isShow, toggle: this.toggle })}
      </React.Fragment>
    )
  }
}

export default Toggle
