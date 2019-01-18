import React from "react";
import { Container, Row, Col } from "reactstrap";
import i18n from "/imports/both/i18n/en";
import Members from "./Members";

const Index = () => (
  <React.Fragment>
    <Container className="mt-5">
      <h1>Team</h1>
      <p>Meet the amazing people who made BTM</p>
    </Container>
    <Members />
  </React.Fragment>
);

export default Index;
