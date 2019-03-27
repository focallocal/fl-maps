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


<h2 className='title'>Welcome to the 1st Draft!</h2>
const markdownSection1 = md.render("
#Public Happiness Movement Token
#Whitepaper

**Foreword:**

I've lived about as frugal a life as is possible in the Western World because I've always disliked money.  It so often seems to have a negative effect on people and society.

The crypto-world has me intensely curious, because money can be different there. I wanted to learn more and see if it's possible to design a form of money that is intrinsically tied to creating societal value.  Something to act as a band-aid on today’s ‘profit at all costs’ capitalism which has blind-spots for large areas critical to producing healthy, happy societies. This is caused by foundations measuring all progress and success as an increase in GDP. Anything which doesn’t is, by design, an after-thought.

GDP was designed by Simon Kuznets, in 1937 as a temporary post war recovery system, but the beast got out of control. The damage caused to humanity by basing our decision making processes on measurements of GDP isn’t even contentious anymore. [Here’s a list](http://ec.europa.eu/environment/beyond_gdp/key_quotes_en.html) of global and economic leaders stating the need to move past it.

This token is an effort to create a new monetary and economic system. One which focuses energy onto these essential societal areas which are currently overlooked. An effort to create a healthier and happier world.

**Intro:**

If the right people get behind this it will have a profound effect on increasing peace, happiness, and reducing human-suffering across the world. If you’re reading this it because we believe that you have the skills to contribute, and a passion to create positive change for humanity.

"Those who love peace must learn to organize as effectively as those who love war"  - Martin Luther King


Our community of volunteers has been gradually building a platform to host this vision for over 3 years now. The platform is for groups from around the world, anyone who is using positive actions to promote peace and wellbeing through building human and community connection. 

It's provides a space for our individual networks to grow into something larger. A global movement for a world with more peace and happiness in it. We’ve reached the point where it is ready to begin hosting communities who will contribute to it governance and improving the platform. You can take a look here: [focallocal.org ](https://focallocal.org)

Note: This white paper is quite long. The most effective way to contribute is by reading the intro and why ‘the world needs this’, and then clicking the sections in the contents page which you’d most like to contribute to. To discuss a section and make suggestions, click on the red balloons.")
  <div className="contentspage">
            <p>Contents<br/>
The World Needs This Because: (v1)<br/>
The World Needs This Because: (v2)<br/>
<br/>
1. Abstract<br/>
1.1. Background<br/>
	1.2. Public Happiness Movement Token Introduction<br/>
<br/>
2. Problem Statement <br/>
	2.1. Issues we aim to solve<br/>
	2.2. Primary Goal<br/>
	2.3. Secondary Goal<br/>
	2.4. Relation to Universal Basic Income<br/>
<br/>
3. Educating the Public about Blockchain<br/>
	3.1. Current State of Public Understanding<br/>
	3.2. Reaching a New Audience<br/>
<br/>
4. The Public Happiness Movement Token<br/>
	4.1. Token Overview<br/>
<br/>
5. Public Happiness Movement Token ICO<br/>
	5.1. ICO Strategy<br/>
	5.2. ICO Stages<br/>
	5.3. Ongoing Funding for Specific Projects and Experts<br/>
	5.4. ICO Marketing<br/>
<br/>
6. Public Happiness – Background<br/>
	6.1. Community Background<br/>
	6.2. The Public Happiness Movement Community<br/>
<br/>
7. Platform Overview<br/>
	7.1. The Public Happiness Map (public actions for increasing human and society well-being)<br/>
	7.2. Action Center (Microvolunteering)<br/>
	7.3. Community News<br/>
	7.4. Active Happiness Shop<br/>
	7.5. Who Defines What is Accepted as ‘Public Happiness’<br/>
	7.6. Evidence Based and Peer Reviewed Actions<br/>
	7.7. Who can Participate on the Platform<br/>
	7.8. Pre-existing Communities with Similar Values<br/>
	7.9. Languages<br/>
	7.10. Decentralised Governance and Voting<br/>
<br/>
8. The Path to Decentralisation<br/>
	8.1. Benevolent Dictatorship vs Complete Community Governance<br/>
	8.2. Example Scenario: Outside Collusion<br/>
	8.3. Lines of Defence<br/>
	8.4. Conclusion<br/>
<br/>
9. Security
	9.1. Levels of Trust
	9.2.. Community Administrators
	9.3. Project Administrators
	9.4. Mining Limits
	9.5. Cold Storage and Key Holders

10. Marketing Strategy
	10.1. A New Level of Hash tagging
	10.2. Bus Tour	
	10.3.. Public Happiness Channel
	10.4. Happy Cam
	10.5. Public Happiness Partners
	10.6. Online Supporters
	10.7. Contests
	10.8. Collectables

11.  Automated Token Distribution Matrix
	11.1. Weighted Mining
	11.2. Hard Cap
	11.3. Adjusting the Balancing
	11.4. Token Release
	11.5. Mining Table
	11.6. Experience Multipliers
	11.7. Token Distribution
	11.8. Further Matrix Considerations
 
12. Team
	12.1. Current Team Members
	12.2. Positions Open
	12.3. Remuneration
	12.4. Facilities 
 
13. Platform Technical's
	13.1. Crypto Linking Bridges
	13.2. Trello vs Wekan vs Other Solutions
	13.3. Leaflet.js vs Google Maps API
	13.4. Switching the Platform to the Dapps Network

14. Doomsday Protocol
	14.1. Huge Market Crash
	14.2. Quantum Security
	14.3. Massive Hack
	14.4. Zombie Apocalypse

15. Giving Back to Open-source 
16. Timeline
17. White Paper Reviewed By
18. Questions to be Resolved
 </p>
  </div>


const markdownSection2 = md.render("INSERT SECTION 2 HERE")
const markdownSection3 = md.render("INSERT SECTION 3 HERE")
const markdownSection4 = md.render("INSERT SECTION 4 HERE")

const index = (props) => {
  return (
    <Container className="mt-5">
      <div dangerouslySetInnerHTML={{ __html: markdownSection1 }} />
      <DCSBalloon title="Insert title" subtitle="Insert subtitle" balloonId="bal" display="inline" dcsTags={props.dcsTags} />
      <div dangerouslySetInnerHTML={{ __html: markdownSection2 }} />
      <DCSBalloon title="Insert title" subtitle="Insert subtitle" balloonId="bal1" display="inline" dcsTags={props.dcsTags} />
      <div dangerouslySetInnerHTML={{ __html: markdownSection3 }} />
      <DCSBalloon title="Insert title" subtitle="Insert subtitle" balloonId="bal2" display="inline" dcsTags={props.dcsTags} />
      <div dangerouslySetInnerHTML={{ __html: markdownSection4 }} />       
    </Container>

  );
};

export default index;
