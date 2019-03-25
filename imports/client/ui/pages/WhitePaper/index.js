import React from "react";
import { Container } from "reactstrap";
import './styles.scss'
import DCSBalloon from '/imports/client/ui/components/DCSBalloon/index.js'
const Remarkable = require('remarkable');

const md = new Remarkable();
md.set({
  breaks: true,
  linkify: true
});

const markdownSection1 = md.render("INSERT SECTION 1 HERE")
const markdownSection2 = md.render("INSERT SECTION 2 HERE")
const markdownSection3 = md.render("INSERT SECTION 3 HERE")
const markdownSection4 = md.render("INSERT SECTION 4 HERE")

const index = () => {
  return (
    <Container className="mt-5">
      <div dangerouslySetInnerHTML={{ __html: markdownSection1 }} />
      <DCSBalloon title="Insert title" subtitle="Insert subtitle" balloonId="bal" display="inline"/>
      <div dangerouslySetInnerHTML={{ __html: markdownSection2 }} />
      <DCSBalloon title="Insert title" subtitle="Insert subtitle" balloonId="bal" display="inline" />
      <div dangerouslySetInnerHTML={{ __html: markdownSection3 }} />
      <DCSBalloon title="Insert title" subtitle="Insert subtitle" balloonId="bal" display="inline" />
      <div dangerouslySetInnerHTML={{ __html: markdownSection4 }} />       
    </Container>

  );
};

export default index;
