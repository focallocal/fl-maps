import React from "react";
import { Container } from "reactstrap";
//import './white_paper.js';

var Remarkable = require('remarkable');
var md = new Remarkable();
var markdown = '# Remarkable rulezz!';//"# Welcome to the 1st Draft"

//console.log(md.render('# Remarkable rulezz!'));
// => <h1>Remarkable rulezz!</h1>

const index = () => {
  return (
    <Container className="mt-5">
      <h1> Whitepaper </h1>
      <div dangerouslySetInnerHTML={{__html: md.render(markdown)}} />
    </Container>
  );
};

export default index;
