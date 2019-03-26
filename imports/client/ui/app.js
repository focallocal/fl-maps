import { hot } from "react-hot-loader";
import { Meteor } from "meteor/meteor";
import React, { Component, Fragment } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import history from "../utils/history";
import qs from "query-string";

// DOCUSS
import "./style.scss";
import { dcs } from "/imports/client/utils/dcs-master";
const discourseUrl = "https://discuss.focallocal.org/";
//const discourseUrl = 'http://vps465971.ovh.net:3000'

// Includes
import MainMenu from "./includes/MainMenu";

// Pages
import Home from "./pages/Home";
import Whitepaper from "./pages/WhitePaper";
import Team from "./pages/TeamMembers";
import Faq from "./pages/Faq";
import Partners from "./pages/Partners";
import About from "./pages/About";
import Authentication from "./pages/Authentication";
import Map_ from "./pages/Map";
import NewEventLoadable from "./pages/NewEvent/loadable";
import CongratsModal from "./pages/NewEvent/CongratsModal";
import Page from "./pages/Page";

// Components
import ScrollToTop from "./components/ScrollToTop";

class App extends Component {
  constructor() {
    super();
    // DOCUSS
    this.state = {
      showRightPanel: false,
      balloonId: false,
      dcsTags: null,
      leftRightTransition: false
    };
  }

  componentDidMount() {
    // Add the touch-screen flag to the <html> tag
    const touchScreen =
      !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0;
    if (touchScreen) {
      document.documentElement.classList.add("touch-screen");
    }

    setTimeout(() => {
      document.querySelector("#root").classList.toggle("show");
    }, 100); // add a fading effect on the inital loading

    // Hide the ghost when transition is over
    const dcsGhost = document.getElementById("dcs-ghost");
    dcsGhost.addEventListener("transitionend", () => {
      this.setState({ leftRightTransition: false });
    });

    // Connect to the plugin in Discourse
    dcs
      .connect({
        discourseWindow: document.getElementById("dcs-right").contentWindow,
        discourseOrigin: new URL(discourseUrl).origin,
        timeout: 15000
      })
      .catch(err => {
        // Timeout error
        console.log(err);
      });

    // Set up callbacks to handle Discourse route changes (when the user
    // clicks on something (ex: his profile) in Discourse)
    dcs.onHome(() => {
      this.triggeredByDiscourse = true;
      changeHistory({
        params: { r: "1", b: null, t: null, d: null },
        push: false
      });
    });
    dcs.onPath(path => {
      this.triggeredByDiscourse = true;
      changeHistory({
        params: { r: undefined, b: null, t: null, d: path },
        push: false
      });
    });
    dcs.onTagOrTopic((tag, topicId) => {
      Meteor.call("Events.getEventId", { discourseTag: tag }, (err, res) => {
        if (err) {
          console.log("Events.getEventId Error:", err);
        } else {
          this.triggeredByDiscourse = true;
          changeHistory({
            pathname: "/page/" + res,
            params: { r: "1", b: tag.substring(17), t: topicId || null },
            push: false
          });
        }
      });
    });

    // Setup callbacks to handle other Discourse events
    dcs.onUserChange(user => {
      //user && console.log('Unread notifications: ', user.unreadNotifications)
    });
    dcs.onDcsTags(dcsTags => {
      this.setState({ dcsTags });
    });

    // Update the Discourse route. DON'T DO THIS IMMEDIATELY, otherwise
    // transitions won't trigger between the two states
    setTimeout(() => {
      this.dcsUpdateFromUrl();
    }, 0);
    history.listen(() => {
      this.dcsUpdateFromUrl();
    });
  }

  dcsUpdateFromUrl() {
    const { r, b, t, d } = qs.parse(window.location.search);
    if (!this.triggeredByDiscourse) {
      // Required to no changing the route again
      if (t) {
        dcs.gotoTopic(t);
      } else if (b) {
        const prefix = "/page/";
        if (window.location.pathname.startsWith(prefix)) {
          const pageId = window.location.pathname.substring(prefix.length);
          const tag = "dcs-" + pageId.substring(0, 12).toLowerCase() + "-" + b;
          dcs.gotoTag(tag);
        } else if (window.location.pathname.startsWith('/')) {
          const pathname = window.location.pathname
          const endIndex = pathname.search('\\?') > -1 ? pathname.search('\\?') : pathname.length
          const tagLocation = pathname.slice(pathname.search('/') + 1, endIndex)
          const tag = "dcs-" + tagLocation + "-" + b
          dcs.gotoTag(tag)
        }
      } else if (d) {
        dcs.gotoPath(d);
      } else {
        dcs.gotoHome();
      }
    }
    this.triggeredByDiscourse = false;
    // Don't set leftRightTransition if you're not sure this will trigger a transition!
    const layoutChange =
      r !== this.state.showRightPanel || !!b !== !!this.state.balloonId;
    if (layoutChange) {
      this.setState({
        showRightPanel: r,
        balloonId: b,
        leftRightTransition: true
      });
    }
  }

  render() {
    let dcsClass = "";
    if (this.state.showRightPanel) {
      dcsClass += "dcs-show-right ";
    }
    if (this.state.balloonId) {
      dcsClass += "dcs-sel ";
    }

    const dcsProps = {
      dcsTags: this.state.dcsTags,
      dcsClick: this.dcsClick.bind(this)
    };

    return (
      <div id="dcs-root" className={dcsClass}>
        <div
          id="dcs-ghost"
          style={{
            visibility: this.state.leftRightTransition ? "visible" : "hidden"
          }}
        >
          <div className="dcs-ghost-splitbar" />
        </div>

        <div id="dcs-left">
          <Router history={history}>
            <Fragment>
              <MainMenu />

              <ScrollToTop>
                <Route exact path="/(home)?" component={Home} />
                <Route exact path="/team" render={props => <Team {...props} {...dcsProps} />} />
                <Route exact path="/partners" render={props => <Partners {...props} {...dcsProps} />} />
                <Route exact path="/whitepaper" render={props => <Whitepaper {...props} {...dcsProps} />} />
                <Route exact path="/faq" render={props => <Faq {...props} {...dcsProps} />}/>
                <Route exact path="/about" render={props => <About {...props} {...dcsProps} />}/>
                <Route path="/map" component={Map_} />
                <Route path="*" render={this.renderNewEvent} />
                <Route exact path="/thank-you" component={CongratsModal} />
                <Route exact path="/page/:id" render={props => <Page {...props} {...dcsProps} />}
                />

                <Authentication />
              </ScrollToTop>
            </Fragment>
          </Router>
        </div>
        <div id="dcs-splitbar">
          <div id="dcs-logo">
            <img src="/images/dcs-logo.png" />
          </div>
          <div style={{ flex: "1 0 0" }} />
          <div id="dcs-splitbar-btn" onClick={this.onDcsSplitbarClick}>
            <div style={{ flex: "1 0 0" }} />
            <div id="dcs-splitbar-btn-text">&gt;</div>
            <div style={{ flex: "1 0 0" }} />
          </div>
          <div style={{ flex: "1 0 0" }} />
        </div>

        <iframe
          id="dcs-right"
          width="0"
          frameBorder="0"
          style={{ minWidth: 0 }}
          src={discourseUrl}
        />
      </div>
    );
  }

  onDcsSplitbarClick = () => {
    const showRightPanel = !this.state.showRightPanel;
    changeHistory({ params: { r: showRightPanel ? "1" : null }, push: true });
  };

  dcsClick(balloonId) {
    if (balloonId) {
      if (balloonId.length > 3 || balloonId.toLowerCase() !== balloonId) {
        throw new Error(`Invalid balloonId "${balloonId}"`);
      }
      changeHistory({
        params: { r: "1", b: balloonId, t: null, d: null },
        push: true
      });
    } else {
      changeHistory({
        params: { r: null, b: null, t: null, d: null },
        push: true
      });
    }
  }

  renderNewEvent = ({ location, history }) => {
    const { new: new_, edit } = qs.parse(location.search);
    const isOpen = Boolean(new_ === "1" || (edit === "1" && window.__editData));

    if (isOpen && !Meteor.userId()) {
      sessionStorage.setItem("redirect", "/?new=1");
      return <Redirect to="/sign-in" />;
    }
    /*
    else if(!isOpen){
      return <Redirect to='/home' />
    }
    */

    return (
      <NewEventLoadable isOpen={isOpen} location={location} history={history} />
    );
  };
}

export default hot(module)(App);

// A falsy pathname means the pathname won't be changed
// An undefined query params means the query param won't be changed
// A null query params means the query param will be removed
function changeHistory({ pathname = null, params, push }) {
  const p = Object.assign(params);
  Object.keys(p).forEach(key => p[key] === undefined && delete p[key]);
  const s = qs.parse(window.location.search);
  Object.assign(s, p);
  Object.keys(s).forEach(key => s[key] === null && delete s[key]);
  const search = qs.stringify(s);
  //############################################################################
  // TERRIBLE WORKAROUND FOR ISSUE https://github.com/focallocal/fl-maps/issues/742
  if (pathname && pathname !== location.pathname) {
    console.log("##########", pathname + "?" + search);
    location.href = pathname + "?" + search;
    return;
  }
  //############################################################################
  pathname = pathname || window.location.pathname;
  if (push) {
    history.push({ pathname, search });
  } else {
    history.replace({ pathname, search });
  }
}
