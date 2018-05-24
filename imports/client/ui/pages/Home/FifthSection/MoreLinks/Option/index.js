import React, { Component } from 'react'
import './styles.scss'

class Option extends Component {
  render () {
    return (
      <div className="link-item">
        <a href={this.props.link} className="link-button">{this.props.text}</a>
      </div>
    )
  }
}

export default Option
