import { hot } from 'react-hot-loader'
import { Meteor } from 'meteor/meteor'
import React, { Component, Fragment } from 'react'
import { Router, Route, Redirect } from 'react-router-dom'
import history from '../utils/history'
import qs from 'query-string'

// Includes
import MainMenu from './includes/MainMenu'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Authentication from './pages/Authentication'
import Map_ from './pages/Map'
import NewEventLoadable from './pages/NewEvent/loadable'
import CongratsModal from './pages/NewEvent/CongratsModal'
import Page from './pages/Page'

// Components
import ScrollToTop from './components/ScrollToTop'

class App extends Component {
  componentDidMount () {
    setTimeout(() => {
      document.querySelector('#root').classList.toggle('show')
    }, 100) // add a fading effect on the inital loading
  }

  render () {
    return (
      <Router history={history}>
        <Fragment>
          <MainMenu />

          <ScrollToTop>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route path='/map' component={Map_} />
            <Route path='*' render={this.renderNewEvent} />
            <Route exact path='/thank-you' component={CongratsModal} />
            <Route exact path='/page/:id' component={Page} />
            <Authentication />
          </ScrollToTop>
        </Fragment>
      </Router>
    )
  }

  renderNewEvent = ({ location, history }) => {
    const { new: new_, edit } = qs.parse(location.search)
    const isOpen = Boolean(new_ === '1' || (edit === '1' && window.__editData))

    if (isOpen && !Meteor.userId()) {
      sessionStorage.setItem('redirect', '/?new=1')
      return <Redirect to='/sign-in' />
    }

    return <NewEventLoadable isOpen={isOpen} location={location} history={history} />
  }
}

export default hot(module)(App)
