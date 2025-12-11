// NPM Libraries
import { Meteor } from 'meteor/meteor'
import React, { Component, Fragment, Suspense } from 'react'
import { lazy } from 'react'
import { Router, Route, Redirect } from 'react-router-dom'
import history from '../utils/history'
import qs from 'query-string'

// Includes/Fragments
import MainMenu from './includes/MainMenu'

// Pages
import Home from './pages/Home'
import Whitepaper from './pages/WhitePaper'
import Team from './pages/TeamMembers'
import Faq from './pages/Faq'
import Partners from './pages/Partners'
import About from './pages/About'
import Map_ from './pages/Map'
import CongratsModal from './pages/NewEvent/CongratsModal'
import Page from './pages/Page'
import { Error404 } from './pages/Errors'

import WPIntro from './pages/WhitePaper/Intro'
import WPWhy from './pages/WhitePaper/Why'
import WPFAQs from './pages/WhitePaper/faqs'

// Components
import ScrollToTop from './components/ScrollToTop'
import Admin from './pages/Admin/index'

// Docuss
import { comToPlugin, inIFrame } from 'dcs-client'
import { SimpleRouteMatcher } from 'meteor/sylque:dcs-simple-route-matcher'
import { runReactRouterSync } from 'dcs-react-router-sync'
import websiteJSON from '../../../public/dcs-website.json'

// Styles and Other
import './styles.scss'
import Loading from './pages/NewEvent/Loading.js'
const NewEventModal = lazy(() => import('./pages/NewEvent/NewEventModal.js'));

// ------------------------------------------------------------------------------
// Debug Timing System - Receives toggle from Discourse parent
// ------------------------------------------------------------------------------

const FlMapsTiming = {
  enabled: false,
  
  init() {
    // Listen for timing toggle from Discourse parent
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'dcs-timing-toggle') {
        this.enabled = event.data.enabled
        console.log(`⏱️ [fl-maps] Timing ${this.enabled ? 'enabled' : 'disabled'}`)
      }
    })
  },
  
  log(eventName, details = null) {
    if (!this.enabled) return
    console.log(`⏱️ [fl-maps] ${eventName}`, details || '')
    
    // Send to parent Discourse window
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'dcs-timing',
        source: 'fl-maps',
        event: eventName,
        details: details,
        timestamp: Date.now()
      }, '*')
    }
  }
}

// Initialize timing system
FlMapsTiming.init()

// Expose globally for use in other components
window.FlMapsTiming = FlMapsTiming

// ------------------------------------------------------------------------------

class App extends Component {
  componentDidMount () {
    // Add the touch-screen flag to the <html> tag
    const touchScreen =
      !!('ontouchstart' in window) || window.navigator.msMaxTouchPoints > 0
    if (touchScreen) {
      document.documentElement.classList.add('touch-screen')
    }

    setTimeout(() => {
      document.querySelector('#root').classList.toggle('show')
    }, 100) // add a fading effect on the inital loading

    // Listen for pauseVideo messages from Docuss
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'pauseVideo') {
        console.log('📥 Received pauseVideo message from Docuss')
        FlMapsTiming.log('Received pauseVideo message')
        // Find all YouTube iframes and pause them
        const iframes = document.querySelectorAll('iframe[src*="youtube.com"]')
        iframes.forEach(iframe => {
          try {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
            console.log('⏸️ Paused YouTube video in iframe')
          } catch (e) {
            console.warn('Failed to pause video:', e)
          }
        })
      }
      
      // Listen for dcsOpenForm messages from Docuss to open forms with specific formType
      if (event.data && event.data.type === 'dcsOpenForm') {
        const formType = event.data.formType || 1
        console.log('📥 Received dcsOpenForm message from Docuss, formType:', formType)
        FlMapsTiming.log('Received dcsOpenForm message', { formType })
        
        // Wait a bit for SSO to complete if in progress, then navigate
        const tryOpenForm = (retries = 0) => {
          if (Meteor.userId()) {
            // User is logged in, navigate to form
            FlMapsTiming.log('User logged in, opening form', { formType })
            const newUrl = `/map?new=1&formType=${formType}`
            history.push(newUrl)
          } else if (retries < 10) {
            // Wait for SSO login to complete (check every 500ms, max 5 seconds)
            console.log('⏳ Waiting for SSO login... attempt', retries + 1)
            FlMapsTiming.log('Waiting for SSO login', { attempt: retries + 1 })
            setTimeout(() => tryOpenForm(retries + 1), 500)
          } else {
            // SSO didn't complete, show login prompt
            console.log('⚠️ SSO login not completed, prompting user')
            FlMapsTiming.log('SSO login timeout')
            alert('You need to login before you can create an event')
          }
        }
        tryOpenForm()
      }
      
      // Listen for dcs-topic-posted messages from Discourse to update bubble counts
      if (event.data && event.data.type === 'dcs-topic-posted') {
        const triggerId = event.data.triggerId
        console.log('📨 Received dcs-topic-posted message for trigger:', triggerId)
        FlMapsTiming.log('Received dcs-topic-posted', { triggerId })
        
        // Trigger a route refresh to update DCS counts
        // This causes dcs-react-router-sync to refetch topic counts
        setTimeout(() => {
          const currentPath = window.location.pathname + window.location.search
          window.history.pushState({}, '', currentPath)
          window.dispatchEvent(new PopStateEvent('popstate'))
          console.log('🔄 Triggered route refresh to update DCS counts')
          FlMapsTiming.log('Triggered route refresh for DCS counts')
        }, 1000) // Wait 1 second for Discourse to index the new topic
      }
    })
  }

  render () {
    const routePaths = {
      root: '/',
      home: '/home',
      team: '/team',
      partners: '/partners',
      whitepaper: '/whitepaper',
      faq: '/faq',
      about: '/about',
      map: '/map',
      admin: '/admin',
      thankyou: '/thank-you',
      page: '/page',
      signin: '/sign-in',
      signup: '/sign-up',
      change_password: '/change-password',
      forgot_password: '/forgot-password',
      sso_auth: '/sso_auth',

      whitepaper_intro: '/whitepaper/intro',
      whitepaper_why: '/whitepaper/why',
      whitepaper_faqs: '/whitepaper/faqs'
    }
    const standaloneMode = !inIFrame()

    return (
      <Router history={history}>
        <Fragment>
          {standaloneMode && <MainMenu />}
          <ScrollToTop>
            <Route exact path={routePaths.root} component={Home} />
            <Route exact path={routePaths.home} component={Home} />
            <Route exact path={routePaths.team} component={Team} />
            <Route exact path={routePaths.partners} component={Partners} />
            <Route exact path={routePaths.whitepaper} component={Whitepaper} />
            <Route exact path={routePaths.faq} component={Faq} />
            <Route exact path={routePaths.about} component={About} />
            <Route path={routePaths.map} component={Map_} />
            <Route exact path={routePaths.admin} render={props => <Admin {...props} />} />
            <Route exact path={routePaths.thankyou} component={CongratsModal} />
            <Route exact path={`${routePaths.page}/:id`} component={Page} />

            <Route exact path={routePaths.whitepaper_intro} component={WPIntro} />
            <Route exact path={routePaths.whitepaper_why} render={WPWhy} />
            <Route exact path={routePaths.whitepaper_faqs} render={WPFAQs} />

            <Route path="*" render={() => this.check404Route(Object.values(routePaths))} />
          </ScrollToTop>
        </Fragment>
      </Router>
    )
  }

  renderNewEvent = ({ location, history }) => {
    const { new: new_, edit, formType } = qs.parse(location.search)
    const isOpen = Boolean(new_ === '1' || (edit === '1' && window.__editData))
    const formTypeNum = parseInt(formType, 10) || 1  // Default to form type 1

    if (isOpen && !Meteor.userId()) {
      /*
      sessionStorage.setItem("redirect", "/?new=1");
      return <Redirect to="/sign-in" />;
      */
      alert('You need to login before you can create an event')
      return null
    }
    /*
    else if(!isOpen){
      return <Redirect to='/home' />
    }
    */
    console.log('passed in loc:\n', location)
    console.log('passed in hist:\n', history)
    console.log('formType:', formTypeNum)
    return (
      <Suspense fallback={<Loading />}>
        <NewEventModal isOpen={isOpen} location={location} history={history} formType={formTypeNum} />
      </Suspense>
    )
  };

  /**
   * This function manages the 'catch-all' route, serving two purposes.
   * (1) open a model to create/edit event when there is the appropriate search string in the URL
   * (2) for all other routes not specified, it will redirect to a 404 page
   * Ideally we should be using React-router Switch to create a fallback 404 page...
   * But this would require opening the new event modal without using the URL as a hook
   * And this may break interactions with Docus (e.g. editing an event directly from the forum)
   */
  check404Route = (routes) => {
    const search = window.location.search
    // Check for new=1 with optional formType parameter
    if (search.startsWith('?new=1') || search === '?edit=1') {
      return this.renderNewEvent({ location: window.location, history })
    }
    if (!routes.some(e => e === window.location.pathname) &&
      !window.location.pathname.includes('/page/') &&
      !window.location.pathname.includes('reset-password')) {
      return <Error404 />
    }
    return null
  }
}

export default App;

// ------------------------------------------------------------------------------

// Docuss

if (inIFrame()) {
  comToPlugin.connect({
    discourseOrigin: '*',
    timeout: 10000,
    onTimeout: () => console.log('Could not connect to the Docuss plugin')
  })

  // Set Docuss-generated topic to have pre-populated category
  comToPlugin.onDiscourseRoutePushed(({ route }) => {
    const topicCategory =
      route.pageName === 'm_about' ? 'The About Page Discussion'
        : route.pageName === 'whitepaper' ? 'Public Happiness Token'
          : route.pageName === 'wp_why' ? 'Public Happiness Token'
            : route.pageName === 'wp_intro' ? 'Public Happiness Token'
              : route.pageName === 'wp_faqs' ? 'Public Happiness Token'
                : route.pageName === 'm_gather' ? 'General'
                  : route.pageName === 'm_gather2' ? 'General'
                    : route.pageName === 'm_gather3' ? 'General'
                      : route.pageName === 'summit' ? 'The Happier World Economies Summit'
                        : 'General'
    comToPlugin.postSetRouteProps({ category: topicCategory })
  })
}

export const routeMatcher = new SimpleRouteMatcher({
  maxPageNameLength: websiteJSON.dcsTag.maxPageNameLength,
  forceLowercase: websiteJSON.dcsTag.forceLowercase,
  predefinedPageNames: websiteJSON.pages.map(p => ({
    pageName: p.name,
    pathname: p.url // This works because we know our urls are all relative urls, i.e. pathname = url
  })),
  otherPagesPrefix: websiteJSON.webApp.otherPagesPrefix
})

runReactRouterSync({ browserHistory: history, routeMatcher })

// ------------------------------------------------------------------------------
