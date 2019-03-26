//Imports
import React from "react";
import { Container, Row, Col } from "reactstrap";
import i18n from "../../../../both/i18n/en";
import DCSBalloon from '/imports/client/ui/components/DCSBalloon/index.js'

const Content = (props) => {
  return (
    <React.Fragment>
      <Container className="mt-5">
        <h1>Looking for answers?</h1>
        <p>
          Take a look at frequently asked questions
          <DCSBalloon title="Test Title" subtitle="Test Subtitle" balloonId="bal1" display="inline" dcsTags={props.dcsTags} />
        </p>
      </Container>
      {i18n.Faq.faq.map((item, index) => {
        return (
          <Col key={index} className="ml-5 pl-5 mt-5" xs={11}>
            <h3>{item.heading} </h3>
            <li className="mb-3 text-left">{item.text}</li>
          </Col>
        );
      })}
    </React.Fragment>
  );
};

export default Content;
