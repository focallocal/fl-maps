import React from "react";
import { Container, Row, Col } from "reactstrap";
import i18n from "/imports/both/i18n/en";
import Members from "./Members";

const Index = () => (
  <React.Fragment>
    <Container className="mt-5">
      <h1>Dev Team</h1>
      <p>Meet the amazing people building this platform and Movement</p>
    </Container>
    <Members />
  </React.Fragment>
);


export default Index;
