import { hot } from 'react-hot-loader'
import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Includes
import MainMenu from './includes/MainMenu'

// Pages
import Home from './pages/Home'
import Authentication from './pages/Authentication'
import Map_ from './pages/Map'
import CongratsModal from './components/NewEventModal/CongratsModal'

class App extends Component {
  render () {
    return (
      <Router>
        <Fragment>
          <MainMenu />

          <Route exact path='/' component={Home} />
          <Route exact path='/map' component={Map_} />
          <Route exact path='/thank-you' component={CongratsModal} />
          <Authentication />
        </Fragment>
      </Router>
    )
  }
}

export default hot(module)(App)
