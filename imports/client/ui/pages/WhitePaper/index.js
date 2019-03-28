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


const Contents = () => (
   <React.Fragment>
       <h2 className='title'>Welcome to the 1st Draft!</h2>
       <div className="contentspage">
            <p style="text-align: center;">Contents<br/></p>
<p> The World Needs This Because: (v1)<br/>
The World Needs This Because: (v2)<br/>
<br/>
1. <a href="#Abstract">Abstract</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	1.1. <a href="#Background">Background</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	1.2. <a href="#Public Happiness Movement Token Introduction">Public Happiness Movement Token Introduction</a><br/>
<br/>
2. <a href="#Problem Statement">Problem Statement</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.1. <a href="#Issues we Aim to Solve">Issues we Aim to Solve</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.2. <a href="#Primary Goal">Primary Goal</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.3. <a href="#Secondary Goal">Secondary Goal</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.4. <a href="#Relation to Universal Basic Income">Relation to Universal Basic Income</a><br/>
<br/>
3. <a href="#Educating the Public about Blockchain"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	3.1. <a href="#Current State of Public Understanding">Current State of Public Understanding</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	3.2. <a href="#Reaching a New Audience">Reaching a New Audience</a><br/>
<br/>
4. <a href="#The Public Happiness Movement Token">The Public Happiness Movement Token</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	4.1. <a href="#Token Overview">Token Overview</a><br/>
<br/>
5. <a href="#Public Happiness Movement Token ICO"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.1. <a href="#ICO Strategy">ICO Strategy</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.2. <a href="#ICO Stages">ICO Stages</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.3. <a href="#Ongoing Funding for Specific Projects and Experts">Ongoing Funding for Specific Projects and Experts</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.4. <a href="#ICO Marketing">ICO Marketing</a><br/>
<br/>
6. <a href="#Public Happiness – Background">Public Happiness – Background</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	6.1. <a href="#Community Background">Community Background</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	6.2. <a href="#The Public Happiness Movement Community">The Public Happiness Movement Community</a><br/>
<br/>
7. <a href="#Platform Overview">Platform Overview</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.1. <a href="#The Public Happiness Map">The Public Happiness Map</a>(public actions for increasing human and society well-being)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.2. <a href="#Action Center">Action Center</a>(microvolunteering)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.3. <a href="#Community News">Community News</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.4. <a href="#Active Happiness Shop">Active Happiness Shop</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.5. <a href="#Who Defines What is Accepted as ‘Public Happiness’">Who Defines What is Accepted as ‘Public Happiness’</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.6. <a href="#Evidence Based and Peer Reviewed Actions">Evidence Based and Peer Reviewed Actions</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.7. <a href="#Who can Participate on the Platform">Who can Participate on the Platform</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.8. <a href="#Pre-existing Communities with Similar Values">Pre-existing Communities with Similar Values</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.9. <a href="#Languages">Languages</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.10. <a href="#Decentralised Governance and Voting">Decentralised Governance and Voting</a><br/>
<br/>
8. <a href="#The Path to Decentralisation">The Path to Decentralisation</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.1. <a href="#Benevolent Dictatorship vs Complete Community Governance">Benevolent Dictatorship vs Complete Community Governance</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.2. <a href="#Example Scenario: Outside Collusion"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.3. <a href="#Lines of Defence"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.4. <a href="#Conclusion"></a><br/>
<br/>
9. Security"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.1. <a href="#Levels of Trust"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.2. <a href="#Community Administrators"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.3. <a href="#Project Administrators"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.4. <a href="#Mining Limits"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.5. <a href="#Cold Storage and Key Holders"></a><br/>
<br/>
10. <a href="#Marketing Strategy<br/>"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.1. <a href="#A New Level of Hash Tagging"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.2. <a href="#Bus Tour"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.3. <a href="#Public Happiness Channel"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.4. <a href="#Happy Cam"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.5. <a href="#Public Happiness Partners"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.6. <a href="#Online Supporters"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.7. <a href="#Contests"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.8. <a href="#Collectables"></a><br/>
<br/>
11. <a href="#Automated Token Distribution Matrix"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.1. <a href="#Weighted Mining"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.2. <a href="#Hard Cap"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.3. <a href="#Adjusting the Balancing"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.4. <a href="#Token Release"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.5. <a href="#Mining Table"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.6. <a href="#Experience Multipliers"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.7. <a href="#Token Distribution"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.8. <a href="#Further Matrix Considerations"></a><br/>
 <br/>
12. <a href="#Team"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.1. <a href="#Current Team Members"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.2. <a href="#Positions Open"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.3. <a href="#Remuneration"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.4. <a href="#Facilities"></a><br/>
 <br/>
13. <a href="#Platform Technicals"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.1. <a href="#Crypto Linking Bridges"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.2. <a href="#Trello vs Wekan vs Other Solutions"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.3. <a href="#Leaflet.js vs Google Maps API"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.4. <a href="#Switching the Platform to the Dapps Network<br/>
<br/>
14. <a href="#Doomsday Protocol"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.1. <a href="#Huge Market Crash"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.2. <a href="#Quantum Security"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.3. <a href="#Massive Hack"></a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.4. <a href="#Zombie Apocalypse"></a><br/>
<br/>
15. <a href="#Giving Back to Open-source"></a><br/>
16. <a href="#Timeline"></a><br/>
17. <a href="#Key Supporters and Team"></a><br/>
18. <a href="#Questions to be Resolved"></a><br/>
 </p>
  </div>
 </React.Fragment>
 )
  

const markdownSection1 = md.render(`
# Public Happiness Movement Token
# Whitepaper

**Foreword:**

I've lived about as frugal a life as is possible in the Western World because I've always disliked money.  It so often seems to have a negative effect on people and society.

The crypto-world has me intensely curious, because money can be different there. I wanted to learn more and see if it's possible to design a form of money that is intrinsically tied to creating societal value.  Something to act as a band-aid on today’s ‘profit at all costs’ capitalism which has blind-spots for large areas critical to producing healthy, happy societies. This is caused by foundations measuring all progress and success as an increase in GDP. Anything which doesn’t is, by design, an after-thought.

GDP was designed by Simon Kuznets, in 1937 as a temporary post war recovery system, but the beast got out of control. The damage caused to humanity by basing our decision making processes on measurements of GDP isn’t even contentious anymore. [Here’s a list](http://ec.europa.eu/environment/beyond_gdp/key_quotes_en.html) of global and economic leaders stating the need to move past it.

This token is an effort to create a new monetary and economic system. One which focuses energy onto these essential societal areas which are currently overlooked. An effort to create a healthier and happier world.


**Intro:**
If the right people get behind this it will have a profound effect on increasing peace, happiness, and reducing human-suffering across the world. If you’re reading this it because we believe that you have the skills to contribute, and a passion to create positive change for humanity.

> "Those who love peace must learn to organize as effectively as those who love war"  - Martin Luther King


Our community of volunteers has been gradually building a platform to host this vision for over 3 years now. The platform is for groups from around the world, anyone who is using positive actions to promote peace and wellbeing through building human and community connection. 

It's provides a space for our individual networks to grow into something larger. A global movement for a world with more peace and happiness in it. We’ve reached the point where it is ready to begin hosting communities who will contribute to it governance and improving the platform. You can take a look here: [focallocal.org ](https://focallocal.org)

Note: This white paper is quite long. The most effective way to contribute is by reading the intro and why ‘the world needs this’, and then clicking the sections in the contents page which you’d most like to contribute to. To discuss a section and make suggestions, click on the red balloons.
`)

const markdownSection2 = md.render(`

text

text
				   `)
const markdownSection3 = md.render(`

text

text
				   
`)
const markdownSection4 = md.render(` test2 INSERT SECTION 3 HEre`)
const markdownSection5 = md.render(` test4 INSERT SECTION 3 HEre`)
const markdownSection6 = md.render(` Some paragraph NSERT SECTION 3 HEre`)
const markdownSection7 = md.render(` Some paragraph INSERT SECTION 3 HEre`)
const markdownSection8 = md.render(` Some paragraph INSERT SECTION 3 HEre`)
const markdownSection9 = md.render(` Some paragraph INSERT SECTION 3 HEre`)
const markdownSection10 = md.render(` Some paragraphINSERT SECTION 3 HEre`)
const markdownSection11 = md.render(` Some paragraphINSERT SECTION 3 HEre`)
const markdownSection12 = md.render(` Some paragraph ERT SECTION 3 HEre`)
const markdownSection13 = md.render(` Some paragraph NSERT SECTION 3 HEre`)
const markdownSection14 = md.render(` Some paragraph NSERT SECTION 3 HEre`)
const markdownSection15 = md.render(` Some paragraph SERT SECTION 3 HEre`)
const markdownSection16 = md.render(` Some paragraph INSERT SECTION 3 HEre`)
const markdownSection17 = md.render(` Some paragraph INSERT SECTION 3 HEre`)
				   

const anchor2 = <a id="Abstract"><h5>Abstract</h5></a>
const anchor3 = <a id="Background"><h2>Background</h2></a>




const index = (props) => {
  return (
    <Container className="mt-5">
			<Contents />
      <div dangerouslySetInnerHTML={{ __html: markdownSection1 }} />
      <DCSBalloon title="Click balloons to comment" balloonId="bal" display="inline" dcsTags={props.dcsTags} />
      <div dangerouslySetInnerHTML={{ __html: markdownSection2 }} />
      <DCSBalloon balloonId="bal1" display="inline" dcsTags={props.dcsTags} />
      <div dangerouslySetInnerHTML={{ __html: markdownSection3 }} />
      <DCSBalloon balloonId="bal1" display="inline" dcsTags={props.dcsTags} />
      <div dangerouslySetInnerHTML={{ __html: markdownSection4 }} />
      <DCSBalloon balloonId="bal1" display="inline" dcsTags={props.dcsTags} />
      <div dangerouslySetInnerHTML={{ __html: markdownSection5 }} />      
    </Container>


  );
};

export default index;
