import React from "react"
import { Container, Row, Col } from "reactstrap"
import i18n from "/imports/both/i18n/en"
import Members from "./Members"

const Index = () => (
  <React.Fragment>
    <Container classid="mt-5">
      <h1>Meet the Team</h1>
      <p>Find out more about the amazing people building this platform and movement</p>
      <a href="#project">Project and Community Management</a>
      <a href="#web">Web Development</a>
      <a href="#marketing">Marketing</a>
      <a href="#token">Blockchain/Token Development</a>
      <a href="#advisors">Project Advisors</a>
    </Container>

    <div className='header-divider' />

    <Container classid="mt-5" id="project">
      <h2>Project and Community Management</h2>
    </Container>
    <Members team="project" />

    <Container classid="mt-5" id="web">
      <h2>Web Development</h2>
    </Container>
    <Members team="web" />

    <Container classid="mt-5" id="marketing">
      <h2>Marketing</h2>
    </Container>
    <Members team="marketing" />

    <Container classid="mt-5" id="token">
      <h2>Blockchain/Token Development</h2>
    </Container>
    <Members team="token" />

    <Container classid="mt-5" id="advisors">
      <h2>Project Advisors</h2>
    </Container>
    <Members team="advisors" />

  </React.Fragment>
);


export default Index;
