// External Libraries
import React from 'react'
import { Container, Col } from 'reactstrap'

// Internal Imports
import DCSLink from '/imports/client/ui/components/DCSLink/index.js'
import i18n from '/imports/both/i18n/en/'

const Content = (props) => {
  return (
    <React.Fragment>
      <Container className="mt-5 mb-4">
        <h1>The World Needs a Public Happiness Economy Because:</h1>
        <br />
        <h3>Short</h3>
      </Container>
      {i18n.Whitepaper.Why.concise.map((item, index) => {
        return (
          <Col key={index} className="pl-5 mt-3 wp-item" xs={11}>
            <details>
              <summary>
                <h5>{item.heading} </h5>
                <DCSLink
                  badge="true"
                  format="speech-bubble"
                  title=" "
                  subtitle="discuss"
                  triggerId={`short${index + 1}`}
                  display="inline"
                />
              </summary>
              <li className="mb-1 mt-2 text-left">{item.text}</li>
            </details>
          </Col>
        )
      })}
      <Container className="mt-5  mb-4">
        <h3>Longer</h3>
      </Container>
      {i18n.Whitepaper.Why['more depth'].map((item, index) => {
        return (
          <Col key={index} className="pl-5 mt-3 wp-item" xs={11}>
            <details>
              <summary>
                <h5>{item.heading} </h5>
                <DCSLink
                  badge="true"
                  format="speech-bubble"
                  title=" "
                  subtitle="discuss"
                  triggerId={`longer${index + 1}`}
                  display="inline"
                />
              </summary>
              <li className="mb-1 mt-2 text-left">{item.text}</li>
              <li className="mb-1 text-left">{item.answer}</li>
            </details>
          </Col>
        )
      })}
    </React.Fragment>
  )
}

export default Content
