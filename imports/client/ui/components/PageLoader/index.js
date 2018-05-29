import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

class PageLoader extends Component {
  render () {
    return (
      <div className='va-center loader'>
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
    document.body.appendChild(div)

    ReactDOM.render(
      <PageLoader />,
      document.getElementById('loader')
    )
  }

  componentWillUnmount () {
    document.querySelector('#loader').remove()
  }

  render () { return null }
}

export default Wrapper
