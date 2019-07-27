// External Libraries
import React from 'react'
import { Container, Col } from 'reactstrap'

// Internal Imports
import DCSLink from '/imports/client/ui/components/DCSLink/index.js'
import i18n from '/imports/both/i18n/en/'

const Content = (props) => {
  return (
    <React.Fragment>
      <Container className="mt-5">
        <h1>Looking for answers?</h1>
        <p>
          Take a look at frequently asked questions
        </p>
      </Container>
      {i18n.Faq.faq.map((item, index) => {
        return (
          <Col key={index} className="ml-5 pl-5 mt-5 FAQ-list" xs={11}>
            <h3>{item.heading} </h3>
            <li className="mb-3 text-left">{item.text}</li>
            <DCSLink badge="true" format="speech-bubble" title=" " subtitle="discuss" triggerId={`question${index + 1}`} display="inline" />
          </Col>
        )
      })}
    </React.Fragment>
  )
};

export default Content
