//Imports
import React from "react";
import { Container, Row, Col } from "reactstrap";
import i18n from "../../../../both/i18n/en";

const Content = () => {
  return (
    <React.Fragment>
      <Container className="mt-5">
        <h1>Looking for answers?</h1>
        <p>Take a look at frequently asked questions</p>
      </Container>
      {i18n.Faq.faq.map((item, index) => {
        return (
          <Col className="ml-5 pr-5 mt-5 pb-4" xs={11}>
            <h3> {item.heading} </h3>
            <li className="mb-3 text-left"> {item.text} </li>
          </Col>
        );
      })}
    </React.Fragment>
  );
};

export default Content;
