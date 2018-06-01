import React from 'react'
import Loadable from 'react-loadable'

const LoadableComponent = Loadable({
  loader: () => import('./index'),
  render (loaded, props) {
    let Component = loaded.default
    return <Component { ...props } />
  },
  loading () { return <div /> }
})

export default LoadableComponent
