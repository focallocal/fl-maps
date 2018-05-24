import { hot } from 'react-hot-loader'
import React, { Component, Fragment } from 'react'
import { Router, Route } from 'react-router-dom'
import history from '../utils/history'

// Includes
import MainMenu from './includes/MainMenu'

// Pages
import Home from './pages/Home'
import Authentication from './pages/Authentication'
import Map_ from './pages/Map'
import NewEventModal from './components/NewEventModal'
import CongratsModal from './components/NewEventModal/CongratsModal'

class App extends Component {
  render () {
    return (
      <Router history={history}>
        <Fragment>
          <MainMenu />

          <Route exact path='/' component={Home} />
          <Route path='/map' component={Map_} />
          <Route exact path='/thank-you' component={CongratsModal} />

          <Route path='*' component={NewEventModal} />
          <Authentication />
        </Fragment>
      </Router>
    )
  }
}

export default hot(module)(App)
