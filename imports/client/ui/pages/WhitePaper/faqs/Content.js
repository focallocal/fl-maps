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
      {i18n.Whitepaper.Faqs.faq.map((item, index) => {
        return (
          <Col key={index} className="ml-5 pl-5 mt-5 FAQ-list" xs={11}>
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
        );
      })}
    </React.Fragment>
  )
};

export default Content
