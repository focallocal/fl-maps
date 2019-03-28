import React, { Fragment } from "react";
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
       <h2 className='title' style={{textAlign: 'center'}}>Welcome to the 1st Draft!</h2>
       <div className="contentspage">
            <p style={{textAlign: 'center'}}>Contents</p>
<p> The World Needs This Because: (v1)
The World Needs This Because: (v2)
<br />
1. <a href="#Abstract">Abstract</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	1.1. <a href="#Background">Background</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	1.2. <a href="#Public Happiness Movement Token Introduction">Public Happiness Movement Token Introduction</a><br />

2. <a href="#Problem Statement">Problem Statement</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.1. <a href="#Issues we Aim to Solve">Issues we Aim to Solve</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.2. <a href="#Primary Goal">Primary Goal</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.3. <a href="#Secondary Goal">Secondary Goal</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.4. <a href="#Relation to Universal Basic Income">Relation to Universal Basic Income</a><br />

3. <a href="#Educating the Public about Blockchain">Educating the Public about Blockchain</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	3.1. <a href="#Current State of Public Understanding">Current State of Public Understanding</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	3.2. <a href="#Reaching a New Audience">Reaching a New Audience</a><br />

4. <a href="#The Public Happiness Movement Token">The Public Happiness Movement Token</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	4.1. <a href="#Token Overview">Token Overview</a><br />

5. <a href="#Public Happiness Movement Token ICO">Public Happiness Movement Token ICO</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.1. <a href="#ICO Strategy">ICO Strategy</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.2. <a href="#ICO Stages">ICO Stages</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.3. <a href="#Ongoing Funding for Specific Projects and Experts">Ongoing Funding for Specific Projects and Experts</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.4. <a href="#ICO Marketing">ICO Marketing</a><br />

6. <a href="#Public Happiness – Background">Public Happiness – Background</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	6.1. <a href="#Community Background">Community Background</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	6.2. <a href="#The Public Happiness Movement Community">The Public Happiness Movement Community</a><br />

7. <a href="#Platform Overview">Platform Overview</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.1. <a href="#The Public Happiness Map">The Public Happiness Map</a><br />(public actions for increasing human and society well-being)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.2. <a href="#Action Center">Action Center</a><br />(microvolunteering)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.3. <a href="#Community News">Community News</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.4. <a href="#Active Happiness Shop">Active Happiness Shop</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.5. <a href="#Who Defines What is Accepted as ‘Public Happiness’">Who Defines What is Accepted as ‘Public Happiness’</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.6. <a href="#Evidence Based and Peer Reviewed Actions">Evidence Based and Peer Reviewed Actions</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.7. <a href="#Who can Participate on the Platform">Who can Participate on the Platform</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.8. <a href="#Pre-existing Communities with Similar Values">Pre-existing Communities with Similar Values</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.9. <a href="#Languages">Languages</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.10. <a href="#Decentralised Governance and Voting">Decentralised Governance and Voting</a><br />

8. <a href="#The Path to Decentralisation">The Path to Decentralisation</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.1. <a href="#Benevolent Dictatorship vs Complete Community Governance">Benevolent Dictatorship vs Complete Community Governance</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.2. <a href="#Example Scenario: Outside Collusion">Example Scenario: Outside Collusion</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.3. <a href="#Lines of Defence">Lines of Defence</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.4. <a href="#Conclusion">Conclusion</a><br />

9. <a href="#Security">Security</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.1. <a href="#Levels of Trust">Levels of Trust</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.2. <a href="#Community Administrators">Community Administrators</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.3. <a href="#Project Administrators">Project Administrators</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.4. <a href="#Mining Limits">Mining Limits</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.5. <a href="#Cold Storage and Key Holders">Cold Storage and Key Holders</a><br />

10. <a href="#Marketing Strategy">Marketing Strategy</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.1. <a href="#A New Level of Hash Tagging">A New Level of Hash Tagging</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.2. <a href="#Bus Tour">Bus Tour</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.3. <a href="#Public Happiness Channel">Public Happiness Channel</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.4. <a href="#Happy Cam">Happy Cam</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.5. <a href="#Public Happiness Partners">Public Happiness Partners</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.6. <a href="#Online Supporters">Online Supporters</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.7. <a href="#Contests">Contests</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.8. <a href="#Collectables">Collectables</a><br />

11. <a href="#Automated Token Distribution Matrix">Automated Token Distribution Matrix</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.1. <a href="#Weighted Mining">Weighted Mining</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.2. <a href="#Hard Cap">Hard Cap</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.3. <a href="#Adjusting the Balancing">Adjusting the Balancing</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.4. <a href="#Token Release">Token Release</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.5. <a href="#Mining Table">Mining Table</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.6. <a href="#Experience Multipliers">Experience Multipliers</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.7. <a href="#Token Distribution">Token Distribution</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.8. <a href="#Further Matrix Considerations">Further Matrix Considerations</a><br />
 
12. <a href="#Team">Team</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.1. <a href="#Current Team Members">Current Team Members</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.2. <a href="#Positions Open">Positions Open</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.3. <a href="#Remuneration">Remuneration</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.4. <a href="#Facilities">Facilities</a><br />
 
13. <a href="#Platform Technicals">Platform Technicals</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.1. <a href="#Crypto Linking Bridges">Crypto Linking Bridges</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.2. <a href="#Trello vs Wekan vs Other Solutions">Trello vs Wekan vs Other Solutions</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.3. <a href="#Leaflet.js vs Google Maps API">Leaflet.js vs Google Maps API</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.4. <a href="#Switching the Platform to the Dapps Network">Switching the Platform to the Dapps Network</a><br />

14. <a href="#Doomsday Protocol">Doomsday Protocol</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.1. <a href="#Huge Market Crash">Huge Market Crash</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.2. <a href="#Quantum Security">Quantum Security</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.3. <a href="#Massive Hack">Massive Hack</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.4. <a href="#Zombie Apocalypse">Zombie Apocalypse</a><br />

15. <a href="#Giving Back to Open-source">Giving Back to Open-source</a><br />
16. <a href="#Timeline">Timeline</a><br />
17. <a href="#Key Supporters and Team">Key Supporters and Team</a><br />
18. <a href="#Questions to be Resolved">Questions to be Resolved</a><br />
 </p>
  </div>
 </React.Fragment>
 )
  
// PART 2: The following constants will contain the markdown text for each section
// These will be individually rendered inside a div in each Anchor item in section 3
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

const markdownSection5  = md.render(` INSERT SECTION HEre`)
const markdownSection6  = md.render(` INSERT SECTION HEre`)
const markdownSection7  = md.render(` INSERT SECTION HEre`)
const markdownSection8  = md.render(` INSERT SECTION HEre`)
const markdownSection9  = md.render(` INSERT SECTION HEre`)
const markdownSection10 = md.render(` INSERT SECTION HEre`)
const markdownSection11 = md.render(` INSERT SECTION HEre`)
const markdownSection12 = md.render(` INSERT SECTION HEre`)
const markdownSection13 = md.render(` INSERT SECTION HEre`)
const markdownSection14 = md.render(` INSERT SECTION HEre`)
const markdownSection15 = md.render(` INSERT SECTION HEre`)
const markdownSection16 = md.render(` INSERT SECTION HEre`)
const markdownSection17 = md.render(` INSERT SECTION HEre`)
const markdownSection18 = md.render(` INSERT SECTION HEre`)
const markdownSection19 = md.render(` INSERT SECTION HEre`)
const markdownSection20 = md.render(` INSERT SECTION HEre`)
const markdownSection21 = md.render(` INSERT SECTION HEre`)
const markdownSection22 = md.render(` INSERT SECTION HEre`)
const markdownSection23 = md.render(` INSERT SECTION HEre`)
const markdownSection24 = md.render(` INSERT SECTION HEre`)
const markdownSection25 = md.render(` INSERT SECTION HEre`)
const markdownSection26 = md.render(` INSERT SECTION HEre`)
const markdownSection27 = md.render(` INSERT SECTION HEre`)
const markdownSection28 = md.render(` INSERT SECTION HEre`)
const markdownSection29 = md.render(` INSERT SECTION HEre`)
const markdownSection30 = md.render(` INSERT SECTION HEre`)
const markdownSection31 = md.render(` INSERT SECTION HEre`)
const markdownSection32 = md.render(` INSERT SECTION HEre`)
const markdownSection33 = md.render(` INSERT SECTION HEre`)
const markdownSection34 = md.render(` INSERT SECTION HEre`)
const markdownSection35 = md.render(` INSERT SECTION HEre`)
const markdownSection36 = md.render(` INSERT SECTION HEre`)
const markdownSection37 = md.render(` INSERT SECTION HEre`)
const markdownSection38 = md.render(` INSERT SECTION HEre`)
const markdownSection39 = md.render(` INSERT SECTION HEre`)
const markdownSection40 = md.render(` INSERT SECTION HEre`)
const markdownSection41 = md.render(` INSERT SECTION HEre`)
const markdownSection42 = md.render(` INSERT SECTION HEre`)
const markdownSection43 = md.render(` INSERT SECTION HEre`)
const markdownSection44 = md.render(` INSERT SECTION HEre`)
const markdownSection45 = md.render(` INSERT SECTION HEre`)
const markdownSection46 = md.render(` INSERT SECTION HEre`)
const markdownSection47 = md.render(` INSERT SECTION HEre`)
const markdownSection48 = md.render(` INSERT SECTION HEre`)
const markdownSection49 = md.render(` INSERT SECTION HEre`)
const markdownSection50 = md.render(` INSERT SECTION HEre`)
const markdownSection51 = md.render(` INSERT SECTION HEre`)
const markdownSection52 = md.render(` INSERT SECTION HEre`)
const markdownSection53 = md.render(` INSERT SECTION HEre`)
const markdownSection54 = md.render(` INSERT SECTION HEre`)
const markdownSection55 = md.render(` INSERT SECTION HEre`)
const markdownSection56 = md.render(` INSERT SECTION HEre`)
const markdownSection57 = md.render(` INSERT SECTION HEre`)
const markdownSection58 = md.render(` INSERT SECTION HEre`)
const markdownSection59 = md.render(` INSERT SECTION HEre`)
const markdownSection60 = md.render(` INSERT SECTION HEre`)
const markdownSection61 = md.render(` INSERT SECTION HEre`)
const markdownSection62 = md.render(` INSERT SECTION HEre`)
const markdownSection63 = md.render(` INSERT SECTION HEre`)
const markdownSection64 = md.render(` INSERT SECTION HEre`)
const markdownSection65 = md.render(` INSERT SECTION HEre`)
const markdownSection66 = md.render(` INSERT SECTION HEre`)
const markdownSection67 = md.render(` INSERT SECTION HEre`)
const markdownSection68 = md.render(` INSERT SECTION HEre`)
const markdownSection69 = md.render(` INSERT SECTION HEre`)
const markdownSection70 = md.render(` INSERT SECTION HEre`)
const markdownSection71 = md.render(` INSERT SECTION HEre`)
const markdownSection72 = md.render(` INSERT SECTION HEre`)
const markdownSection73 = md.render(` INSERT SECTION HEre`)
const markdownSection74 = md.render(` INSERT SECTION HEre`)
const markdownSection75 = md.render(` INSERT SECTION HEre`)
const markdownSection76 = md.render(` INSERT SECTION HEre`)
const markdownSection77 = md.render(` INSERT SECTION HEre`)
const markdownSection78 = md.render(` INSERT SECTION HEre`)
const markdownSection79 = md.render(` INSERT SECTION HEre`)
const markdownSection80 = md.render(` INSERT SECTION HEre`)


				   

const Anchor1  = () => <Fragment><u id="Abstract"><h2>Abstract</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection1 }} /></Fragment>
const Anchor2  = () => <Fragment><u id="Background"><h2>Background</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection2 }} /></Fragment>
const Anchor3  = () => <Fragment><u id="Public Happiness Movement Token Introduction"><h2>Public Happiness Movement Token Introduction</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection3 }} /></Fragment>
const Anchor4  = () => <Fragment><u id="Problem Statement"><h2>Problem Statement</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection4 }} /></Fragment>
const Anchor5  = () => <Fragment><u id="Issues we Aim to Solve"><h2>Issues we Aim to Solve</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection5 }} /></Fragment>
const Anchor6  = () => <Fragment><u id="Primary Goal"><h2>Primary Goal</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection6 }} /></Fragment>
const Anchor7  = () => <Fragment><u id="Secondary Goal"><h2>Secondary Goal</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection7 }} /></Fragment>
const Anchor8  = () => <Fragment><u id="Relation to Universal Basic Income"><h2>Relation to Universal Basic Income</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection8 }} /></Fragment>
const Anchor9  = () => <Fragment><u id="Educating the Public about Blockchain"><h2></h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection9 }} /></Fragment>
const Anchor10 = () => <Fragment><u id="Current State of Public Understanding"><h2>Current State of Public Understanding</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection10 }} /></Fragment>
const Anchor11 = () => <Fragment><u id="Reaching a New Audience"><h2>Reaching a New Audience</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection11 }} /></Fragment>
const Anchor12 = () => <Fragment><u id="The Public Happiness Movement Token"><h2>The Public Happiness Movement Token</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection12 }} /></Fragment>
const Anchor13 = () => <Fragment><u id="Token Overview"><h2>Token Overview</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection13 }} /></Fragment>
const Anchor14 = () => <Fragment><u id="Public Happiness Movement Token ICO"><h2></h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection14 }} /></Fragment>
const Anchor15 = () => <Fragment><u id="ICO Strategy"><h2>ICO Strategy</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection15 }} /></Fragment>
const Anchor16 = () => <Fragment><u id="ICO Stages"><h2>ICO Stages</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection16 }} /></Fragment>
const Anchor17 = () => <Fragment><u id="Ongoing Funding for Specific Projects and Experts"><h2>Ongoing Funding for Specific Projects and Experts</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection17 }} /></Fragment>
const Anchor18 = () => <Fragment><u id="ICO Marketing"><h2>ICO Marketing</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection18 }} /></Fragment>
const Anchor19 = () => <Fragment><u id="Public Happiness – Background"><h2>Public Happiness – Background</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection19 }} /></Fragment>
const Anchor20 = () => <Fragment><u id="Community Background"><h2>Community Background</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection20 }} /></Fragment>
const Anchor21 = () => <Fragment><u id="The Public Happiness Movement Community"><h2>The Public Happiness Movement Community</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection21 }} /></Fragment>
const Anchor22 = () => <Fragment><u id="Platform Overview"><h2>Platform Overview</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection22 }} /></Fragment>
const Anchor23 = () => <Fragment><Fragment><u id="The Public Happiness Map"><h2>The Public Happiness Map</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection23 }} /></Fragment>(public actions for increasing human and society well-being)<br /></Fragment>
const Anchor24 = () => <Fragment><Fragment><u id="Action Center"><h2>Action Center</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection24 }} /></Fragment>(microvolunteering)</Fragment>
const Anchor25 = () => <Fragment><u id="Community News"><h2>Community News</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection25 }} /></Fragment>
const Anchor26 = () => <Fragment><u id="Active Happiness Shop"><h2>Active Happiness Shop</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection26 }} /></Fragment>
const Anchor27 = () => <Fragment><u id="Who Defines What is Accepted as ‘Public Happiness’"><h2>Who Defines What is Accepted as ‘Public Happiness’</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection27 }} /></Fragment>
const Anchor28 = () => <Fragment><u id="Evidence Based and Peer Reviewed Actions"><h2>Evidence Based and Peer Reviewed Actions</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection28 }} /></Fragment>
const Anchor29 = () => <Fragment><u id="Who can Participate on the Platform"><h2>Who can Participate on the Platform</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection29 }} /></Fragment>
const Anchor30 = () => <Fragment><u id="Pre-existing Communities with Similar Values"><h2>Pre-existing Communities with Similar Values</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection30 }} /></Fragment>
const Anchor31 = () => <Fragment><u id="Languages"><h2>Languages</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection31 }} /></Fragment>
const Anchor32 = () => <Fragment><u id="Decentralised Governance and Voting"><h2>Decentralised Governance and Voting</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection32 }} /></Fragment>
const Anchor33 = () => <Fragment><u id="The Path to Decentralisation"><h2>The Path to Decentralisation</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection33 }} /></Fragment>
const Anchor34 = () => <Fragment><u id="Benevolent Dictatorship vs Complete Community Governance"><h2>Benevolent Dictatorship vs Complete Community Governance</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection34 }} /></Fragment>
const Anchor35 = () => <Fragment><u id="Example Scenario: Outside Collusion"><h2>Example Scenario: Outside Collusion</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection35 }} /></Fragment>
const Anchor36 = () => <Fragment><u id="Lines of Defence"><h2>Lines of Defence</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection36 }} /></Fragment>
const Anchor37 = () => <Fragment><u id="Conclusion"><h2>Conclusion</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection37 }} /></Fragment>
const Anchor38 = () => <Fragment><u id="Security"><h2>Security</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection38 }} /></Fragment>
const Anchor39 = () => <Fragment><u id="Levels of Trust"><h2>Levels of Trust</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection39 }} /></Fragment>
const Anchor40 = () => <Fragment><u id="Community Administrators"><h2>Community Administrators</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection40 }} /></Fragment>
const Anchor41 = () => <Fragment><u id="Project Administrators"><h2>Project Administrators</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection41 }} /></Fragment>
const Anchor42 = () => <Fragment><u id="Mining Limits"><h2>Mining Limits</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection42 }} /></Fragment>
const Anchor43 = () => <Fragment><u id="Cold Storage and Key Holders"><h2>Cold Storage and Key Holders</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection43 }} /></Fragment>
const Anchor44 = () => <Fragment><u id="Marketing Strategy"><h2>Marketing Strategy</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection44 }} /></Fragment>
const Anchor45 = () => <Fragment><u id="A New Level of Hash Tagging"><h2>A New Level of Hash Tagging</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection45 }} /></Fragment>
const Anchor46 = () => <Fragment><u id="Bus Tour"><h2>Bus Tour</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection46 }} /></Fragment>
const Anchor47 = () => <Fragment><u id="Public Happiness Channel"><h2>Public Happiness Channel</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection47 }} /></Fragment>
const Anchor48 = () => <Fragment><u id="Happy Cam"><h2>Happy Cam</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection48 }} /></Fragment>
const Anchor49 = () => <Fragment><u id="Public Happiness Partners"><h2>Public Happiness Partners</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection49 }} /></Fragment>
const Anchor50 = () => <Fragment><u id="Online Supporters"><h2>Online Supporters</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection50 }} /></Fragment>
const Anchor51 = () => <Fragment><u id="Contests"><h2>Contests</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection51 }} /></Fragment>
const Anchor52 = () => <Fragment><u id="Collectables"><h2>Collectables</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection52 }} /></Fragment>
const Anchor53 = () => <Fragment><u id="Automated Token Distribution Matrix"><h2>Automated Token Distribution Matrix</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection53 }} /></Fragment>
const Anchor54 = () => <Fragment><u id="Weighted Mining"><h2>Weighted Mining</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection54 }} /></Fragment>
const Anchor55 = () => <Fragment><u id="Hard Cap"><h2>Hard Cap</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection55 }} /></Fragment>
const Anchor56 = () => <Fragment><u id="Adjusting the Balancing"><h2>Adjusting the Balancing</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection56 }} /></Fragment>
const Anchor57 = () => <Fragment><u id="Token Release"><h2>Token Release</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection57 }} /></Fragment>
const Anchor58 = () => <Fragment><u id="Mining Table"><h2>Mining Table</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection58 }} /></Fragment>
const Anchor59 = () => <Fragment><u id="Experience Multipliers"><h2>Experience Multipliers</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection59 }} /></Fragment>
const Anchor60 = () => <Fragment><u id="Token Distribution"><h2>Token Distribution</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection60 }} /></Fragment>
const Anchor61 = () => <Fragment><u id="Further Matrix Considerations"><h2>Further Matrix Considerations</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection61 }} /></Fragment>
const Anchor62 = () => <Fragment><u id="Team"><h2>Team</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection62 }} /></Fragment>
const Anchor63 = () => <Fragment><u id="Current Team Members"><h2>Current Team Members</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection63 }} /></Fragment>
const Anchor64 = () => <Fragment><u id="Positions Open"><h2>Positions Open</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection64 }} /></Fragment>
const Anchor65 = () => <Fragment><u id="Remuneration"><h2>Remuneration</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection65 }} /></Fragment>
const Anchor66 = () => <Fragment><u id="Facilities"><h2>Facilities</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection66 }} /></Fragment>
const Anchor67 = () => <Fragment><u id="Platform Technicals"><h2>Platform Technicals</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection67 }} /></Fragment>
const Anchor68 = () => <Fragment><u id="Crypto Linking Bridges"><h2>Crypto Linking Bridges</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection68 }} /></Fragment>
const Anchor69 = () => <Fragment><u id="Trello vs Wekan vs Other Solutions"><h2>Trello vs Wekan vs Other Solutions</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection69 }} /></Fragment>
const Anchor70 = () => <Fragment><u id="Leafletjs vs Google Maps API"><h2>Leafletjs vs Google Maps API</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection70 }} /></Fragment>
const Anchor71 = () => <Fragment><u id="Switching the Platform to the Dapps Network"><h2>Switching the Platform to the Dapps Network</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection71 }} /></Fragment>
const Anchor72 = () => <Fragment><u id="Doomsday Protocol"><h2>Doomsday Protocol</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection72 }} /></Fragment>
const Anchor73 = () => <Fragment><u id="Huge Market Crash"><h2>Huge Market Crash</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection73 }} /></Fragment>
const Anchor74 = () => <Fragment><u id="Quantum Security"><h2>Quantum Security</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection74 }} /></Fragment>
const Anchor75 = () => <Fragment><u id="Massive Hack"><h2>Massive Hack</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection75 }} /></Fragment>
const Anchor76 = () => <Fragment><u id="Zombie Apocalypse"><h2>Zombie Apocalypse</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection76 }} /></Fragment>
const Anchor77 = () => <Fragment><u id="Giving Back to Open-source"><h2>Giving Back to Open-source</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection77 }} /></Fragment>
const Anchor78 = () => <Fragment><u id="Timeline"><h2>Timeline</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection78 }} /></Fragment>
const Anchor79 = () => <Fragment><u id="Key Supporters and Team"><h2>Key Supporters and Team</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection79 }} /></Fragment>
const Anchor80 = () => <Fragment><u id="Questions to be Resolved"><h2>Questions to be Resolved</h2></u><div dangerouslySetInnerHTML={{ __html: markdownSection80 }} /></Fragment>




const index = (props) => {
  return (
    <Container className="mt-5">
			<Contents /><DCSBalloon title="click balloons to comment" balloonId="bal" display="inline" dcsTags={props.dcsTags} />
      <Anchor1 /><DCSBalloon balloonId="bal1" display="inline" dcsTags={props.dcsTags} />
      <Anchor2 /><DCSBalloon balloonId="bal2" display="inline" dcsTags={props.dcsTags} />
      <Anchor3 /><DCSBalloon balloonId="bal3" display="inline" dcsTags={props.dcsTags} />
    </Container>


  );
};

export default index;
