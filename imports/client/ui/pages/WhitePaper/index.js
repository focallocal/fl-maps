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
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	1.1. <a href="Background">Background</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	1.2. Public Happiness Movement Token Introduction<br/>
<br/>
2. Problem Statement <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.1. Issues we aim to solve<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.2. Primary Goal<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.3. Secondary Goal<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.4. Relation to Universal Basic Income<br/>
<br/>
3. Educating the Public about Blockchain<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	3.1. Current State of Public Understanding<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	3.2. Reaching a New Audience<br/>
<br/>
4. The Public Happiness Movement Token<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	4.1. Token Overview<br/>
<br/>
5. Public Happiness Movement Token ICO<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.1. ICO Strategy<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.2. ICO Stages<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.3. Ongoing Funding for Specific Projects and Experts<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.4. ICO Marketing<br/>
<br/>
6. Public Happiness – Background<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	6.1. Community Background<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	6.2. The Public Happiness Movement Community<br/>
<br/>
7. Platform Overview<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.1. The Public Happiness Map (public actions for increasing human and society well-being)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.2. Action Center (Microvolunteering)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.3. Community News<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.4. Active Happiness Shop<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.5. Who Defines What is Accepted as ‘Public Happiness’<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.6. Evidence Based and Peer Reviewed Actions<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.7. Who can Participate on the Platform<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.8. Pre-existing Communities with Similar Values<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.9. Languages<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.10. Decentralised Governance and Voting<br/>
<br/>
8. The Path to Decentralisation<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.1. Benevolent Dictatorship vs Complete Community Governance<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.2. Example Scenario: Outside Collusion<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.3. Lines of Defence<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.4. Conclusion<br/>
<br/>
9. Security<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.1. Levels of Trust<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.2.. Community Administrators<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.3. Project Administrators<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.4. Mining Limits<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.5. Cold Storage and Key Holders<br/>
<br/>
10. Marketing Strategy<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.1. A New Level of Hash Tagging<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.2. Bus Tour<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.3.. Public Happiness Channel<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.4. Happy Cam<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.5. Public Happiness Partners<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.6. Online Supporters<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.7. Contests<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.8. Collectables<br/>
<br/>
11.  Automated Token Distribution Matrix<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.1. Weighted Mining<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.2. Hard Cap<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.3. Adjusting the Balancing<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.4. Token Release<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.5. Mining Table<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.6. Experience Multipliers<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.7. Token Distribution<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.8. Further Matrix Considerations<br/>
 <br/>
12. Team<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.1. Current Team Members<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.2. Positions Open<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.3. Remuneration<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.4. Facilities<br/>
 <br/>
13. Platform Technicals<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.1. Crypto Linking Bridges<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.2. Trello vs Wekan vs Other Solutions<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.3. Leaflet.js vs Google Maps API<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.4. Switching the Platform to the Dapps Network<br/>
<br/>
14. Doomsday Protocol<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.1. Huge Market Crash<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.2. Quantum Security<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.3. Massive Hack<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.4. Zombie Apocalypse<br/>
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

const anchor2 = <h5><a id="Abstract"></a>Abstract</h5>
const markdownSection2 = md.render(`

text

text
				   `)
const anchor3 = <h2><a id="Background"></a>Background</h2>
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
