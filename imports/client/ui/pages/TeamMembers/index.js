import React from "react"
import { Container, Row, Col } from "reactstrap"
import i18n from "/imports/both/i18n/en"
import Members from "./Members"

const Index = () => (
  <React.Fragment>
    <Container classid="mt-5">
      <h1>Meet the Team</h1>
      <p>Find out more about the amazing people building this platform and movement</p>
      <a href="#project">Project and Community Leaders</a>
      <a href="#web">Web Development</a>
      <a href="#marketing">Marketing</a>
      <a href="#summit">The Public Happiness Economy World Summit</a>
      <a href="#token">Token Team and Advisors</a>
      <a href="#documentary">Movement Documentary: Cannes Film Festival 2020 Launch</a>
  
    </Container>

    <div className='header-divider' />

    <Container classid="mt-5" id="project">
      <h2>Project and Community Leaders</h2>
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
  
   <Container classid="mt-5" id="summit">
      <h2>The Public Happiness Economy World Summit</h2>
    </Container>
    <Members team="summit" />

    <Container classid="mt-5" id="token">
      <h2>Blockchain/Token Development</h2>
    </Container>
    <Members team="token" />

    <Container classid="mt-5" id="documentary">
      <h2>Movement Documentary: Cannes Film Festival 2020 Launch</h2>
    </Container>
    <Members team="documentary" />

  </React.Fragment>
);


export default Index;
