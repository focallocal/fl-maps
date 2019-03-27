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
9. Security<br/>
	9.1. Levels of Trust<br/>
	9.2.. Community Administrators<br/>
	9.3. Project Administrators<br/>
	9.4. Mining Limits<br/>
	9.5. Cold Storage and Key Holders<br/>
<br/>
10. Marketing Strategy<br/>
	10.1. A New Level of Hash Tagging<br/>
	10.2. Bus Tour<br/>
	10.3.. Public Happiness Channel<br/>
	10.4. Happy Cam<br/>
	10.5. Public Happiness Partners<br/>
	10.6. Online Supporters<br/>
	10.7. Contests<br/>
	10.8. Collectables<br/>
<br/>
11.  Automated Token Distribution Matrix<br/>
	11.1. Weighted Mining<br/>
	11.2. Hard Cap<br/>
	11.3. Adjusting the Balancing<br/>
	11.4. Token Release<br/>
	11.5. Mining Table<br/>
	11.6. Experience Multipliers<br/>
	11.7. Token Distribution<br/>
	11.8. Further Matrix Considerations<br/>
 <br/>
12. Team<br/>
	12.1. Current Team Members<br/>
	12.2. Positions Open<br/>
	12.3. Remuneration<br/>
	12.4. Facilities<br/>
 <br/>
13. Platform Technicals<br/>
	13.1. Crypto Linking Bridges<br/>
	13.2. Trello vs Wekan vs Other Solutions<br/>
	13.3. Leaflet.js vs Google Maps API<br/>
	13.4. Switching the Platform to the Dapps Network<br/>
<br/>
14. Doomsday Protocol<br/>
	14.1. Huge Market Crash<br/>
	14.2. Quantum Security<br/>
	14.3. Massive Hack<br/>
	14.4. Zombie Apocalypse<br/>
<br/>
15. Giving Back to Open-source<br/>
16. Timeline<br/>
17. White Paper Reviewed By<br/>
18. Questions to be Resolved<br/>
 </p>
  </div>
 </React.Fragment>
 )
  

const markdownSection1 = md.render(`
<p style="text-align: center;"># Public Happiness Movement Token</p>
<p style="text-align: center;"># Whitepaper</p>

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
# Markdown contents
				   
The World Needs This Because
1. [Abstract](#test)
	1.1. [Background](#test2)
	1.2. [Public Happiness Movement Token Introduction](#test3)

2. Problem Statement 
	2.1. Issues we aim to solv
	2.2. Primary Goa
	2.3. Secondary Goa
	2.4. Relation to Universal Basic Income

3. Educating the Public about Blockchain
	3.1. Current State of Public Understanding
				   `)

const markdownSection3 = md.render(`## Some paragraph <a name="test"></a>"INSERT SECTION 3 HEre`)
const markdownSection4 = md.render(`## Some paragraph <a name="test2"></a>"INSERT SECTION 3 HEre`)
const markdownSection5 = md.render(`## Some paragraph <a name="test4"></a>"INSERT SECTION 3 HEre`)
const markdownSection6 = md.render(`## Some paragraph <a name="test5"></a>"INSERT SECTION 3 HEre`)
const markdownSection7 = md.render(`## Some paragraph <a name="test6"></a>"INSERT SECTION 3 HEre`)
const markdownSection8 = md.render(`## Some paragraph <a name="test7"></a>"INSERT SECTION 3 HEre`)
const markdownSection9 = md.render(`## Some paragraph <a name="test8"></a>"INSERT SECTION 3 HEre`)
const markdownSection10 = md.render(`## Some paragraph <a name="test9"></a>"INSERT SECTION 3 HEre`)
const markdownSection11 = md.render(`## Some paragraph <a name="test10"></a>"INSERT SECTION 3 HEre`)
const markdownSection12 = md.render(`## Some paragraph <a name="test11"></a>"INSERT SECTION 3 HEre`)
const markdownSection13 = md.render(`## Some paragraph <a name="test12"></a>"INSERT SECTION 3 HEre`)
const markdownSection14 = md.render(`## Some paragraph <a name="test13"></a>"INSERT SECTION 3 HEre`)
const markdownSection15 = md.render(`## Some paragraph <a name="test14"></a>"INSERT SECTION 3 HEre`)
const markdownSection16 = md.render(`## Some paragraph <a name="test15"></a>"INSERT SECTION 3 HEre`)
const markdownSection17 = md.render(`## Some paragraph <a name="test16"></a>"INSERT SECTION 3 HEre`)
				   




const index = (props) => {
  return (
    <Container className="mt-5">
			<Contents />
      <div dangerouslySetInnerHTML={{ __html: markdownSection1 }} />
      <DCSBalloon title="Insert title" subtitle="Insert subtitle" balloonId="bal" display="inline" dcsTags={props.dcsTags} />
      <div dangerouslySetInnerHTML={{ __html: markdownSection2 }} />
      <DCSBalloon title="Insert title" subtitle="Insert subtitle" balloonId="ba1" display="inline" dcsTags={props.dcsTags} />
      <div dangerouslySetInnerHTML={{ __html: markdownSection3 }} />
      <DCSBalloon title="Insert title" subtitle="Insert subtitle" balloonId="bal1" display="inline" dcsTags={props.dcsTags} />
      <div dangerouslySetInnerHTML={{ __html: markdownSection4 }} />
      <DCSBalloon title="Insert title" subtitle="Insert subtitle" balloonId="ba1" display="inline" dcsTags={props.dcsTags} />
      <div dangerouslySetInnerHTML={{ __html: markdownSection5 }} />      
    </Container>

  );
};

export default index;
