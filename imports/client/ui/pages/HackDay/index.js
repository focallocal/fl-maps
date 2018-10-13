import React, { Fragment } from 'react'
import './styles.scss'

const HackDay = () => (
  <Fragment>
    <div className="container">
      <div className="hero">
        <h1 className="name">
          <strong>Hacking</strong> Homelessness
        </h1>
        <span className="job-title">
          On the 20th and 21st October 2018 Join us for a Remote HAckathin to
          Launch The Brighter Tomorrow Map
        </span>
        <span className="email">contact@focallocal.org</span>

        <h2 className="lead">
          A volunteer led effort to transofrm Homelessness around the World
          through increased community connection
        </h2>
      </div>
    </div>
    <div className="container">
      <div className="sections">
        <h2 className="section-title">Skills Needed</h2>

        <div className="list-card">
          <span className="exp">Web Dev Team</span>
          <div>
            <h3>Platform building</h3>
            <span>Meteor/Reactjs, Html, Css, Wordpress, Discourse, …</span>
          </div>
        </div>

        <div className="list-card">
          <span className="exp">Marketing Team</span>
          <div>
            <h3>
              Inviting the world to use our Platform to help peole who are
              homeless nearby
            </h3>
            <span>Social Media, Press/Media Relations, Graphic Design</span>
          </div>
        </div>

        <div className="list-card">
          <span className="exp">Video Creation Team</span>
          <div>
            <h3>Antimated, or other Explainer Videos</h3>
            <span>
              One explainer video on using the platform, One viral video telling
              users of a new tool they can use to support people who are
              homeless nearby
            </span>
          </div>
        </div>
      </div>
      <div className="sections">
        <h2 className="section-title">Foot Soldiers and Activists</h2>

        <div className="list-card">
          <div>
            <h3>Getting the Map to people who are Homeless</h3>
            <span>
              Inviting Related Groups, Coordinating Teams to Put Posters up in
              Shelters and Public Places, Finding Free Resources to Poulate the
              Map
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="container">
      <ol className="timeline">
        <li>
          <span className="point" />
          <p className="description">
            Probably this sction should show how to join. Github, Trello, etc.
          </p>
          <span className="date">something here</span>
        </li>

        <li>
          <p className="line">Alternate Project</p>
          <span className="point" />
          <p className="description">
            Focallocal.org - The micro-volunteering platform that built the
            Brighter Tomorrow Map, and other similar projects
          </p>
          <span className="date">something here</span>
        </li>

        <li>
          <p className="line">something here</p>
          <span className="point" />
          <p className="description">something here</p>
          <span className="date">something here</span>
        </li>

        <li>
          <span className="point" />
          <p className="description">something here</p>
          <span className="date">2013 - 2008</span>
        </li>
      </ol>
    </div>

    <br />
    <br />

    <footer className="container" />
  </Fragment>
)

export default HackDay
