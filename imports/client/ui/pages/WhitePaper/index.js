
import React from "react";
import { Container } from "reactstrap";
import './styles.scss'
import DCSBalloon from '/imports/client/ui/components/DCSBalloon/index.js'

//import './white_paper.js';



var Remarkable = require('remarkable');
var md = new Remarkable();
md.set({
  breaks: true,
  linkify: true
});
var markdown = md.render("# Public Happiness Movement Whitepaper \n  \n**Foreword:**  \n  \as is possible in the Western World because d in the section, and cross-posted into the forum's voting section for community-wide visibility. One thread for arguments for, and one for arguments against the change.   \n  \nStage 3: \  \nUsers are all welcome to comment their argument in the threads for and against, the threads will be ordered by likes received so the strongest arguments float to the top.  \n  \nStage 4: \  \nAfter reading the topic users can vote on the topic 'for' or 'against' the change, if the 'for' topic receives more than 55% the change is agreed to be inducted offline will be required to post hashtags on social media of photos and videos taken at their activity as proof of work, which are tracked by our bot, linked to their account, and published in a list of pending tokens earned, making it simple for other users and bounty hunters to check if they think something suspicious is going on (the requirement for posting and hashtags is also fantastic opro mounted, so that viewers can tune in to our Youtube and watch clips of life travelling the world with a community in a bus/van fleet, and creating public happiness, from the perspective of a very happy dog.  \n  ");//"# Welcome to the 1st Draft"
//console.log(markdown);


const index = () => {
  return (
    <Container className="mt-5">
     <div dangerouslySetInnerHTML={{__html: markdown}} />       
    </Container>

  );
};


 
export default index;
