//Imports
import React from "react";
import { Container, Row, Col } from "reactstrap";
import i18n from "/imports/both/i18n/en/";
import DCSBalloon from '/imports/client/ui/components/DCSBalloon/index.js'

const Content = (props) => {
  return (
    <React.Fragment>
      <Container className="mt-5">
        <h1>The World Needs a Public Happiness Economy Because:</h1>
        <br/>
        <h3>Short</h3>
      </Container>
      {i18n.Whitepaper.Why.short.map((item, index) => {
        return (
          <Col key={index} className="pl-5 mt-5 wp-item" xs={11}>
            <h5>{item.heading} </h5>
            <li className="mb-3 text-left">{item.text}</li>
            <DCSBalloon title=" " subtitle="discuss" balloonId="bal1" display="inline" dcsTags={props.dcsTags} />
          </Col>
        );
      })}
      <Container className="mt-5">
        <h3>Longer</h3>
      </Container>  
      {i18n.Whitepaper.Why.longer.map((item, index) => {
        return (
          <Col key={index} className="pl-5 mt-5 wp-item" xs={11}>
            <h5>{item.heading} </h5>
            <li className="mb-3 text-left">{item.text}</li>
            <li className="mb-3 text-left">{item.answer}</li>
            <DCSBalloon title=" " subtitle="discuss" balloonId="bal2" display="inline" dcsTags={props.dcsTags} />
          </Col>
        );
      })}

    </React.Fragment>
  );
};

export default Content;
