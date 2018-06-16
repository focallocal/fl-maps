import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

class Loader extends Component {
  render () {
    const className = this.props.className

    return (
      <div className={'va-center loader ' + className || ''}>
        <div className='ball-beat'>
          <div /><div /><div />
        </div>
      </div>
    )
  }
}

class Wrapper extends Component {
  componentDidMount () {
    const div = document.createElement('div')
    div.setAttribute('id', 'loader')
    div.setAttribute('class', this.props.className || '')
    document.body.appendChild(div)

    ReactDOM.render(
      <Loader />,
      document.getElementById('loader')
    )
  }

  componentWillUnmount () {
    document.querySelector('#loader').remove()
  }

  render () { return null }
}

export default Wrapper
export { Loader }
