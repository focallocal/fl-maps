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


const Title = () => (
   <React.Fragment>
       <h2 className='Title' style={{textAlign: 'center'}}>Public Happiness Movement<br />Token Whitepaper</h2>
 </React.Fragment>
 )


const Contents = () => (
   <React.Fragment>
       <h2 className='title' style={{textAlign: 'center'}}>Welcome to the 1st Draft!</h2>
       <div className="contentspage">
            <p>Contents</p>
<p> 
Foreword <br />
Intro<br />
Contents<br /
<a href="#The World Needs This Because: (v1)">The World Needs This Because: (v1)</a><br />
<a href="#The World Needs This Because: (v2)">The World Needs This Because: (v1)</a><br />
<br />
1. <a href="#Abstract">Abstract</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	1.1. <a href="#Background">Background</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	1.2. <a href="#Public Happiness Movement Token Introduction">Public Happiness Movement Token Introduction</a><br />
<br />
2. <a href="#Problem Statement">Problem Statement</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.1. <a href="#Issues we Aim to Solve">Issues we Aim to Solve</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.2. <a href="#Primary Goal">Primary Goal</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.3. <a href="#Secondary Goal">Secondary Goal</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	2.4. <a href="#Relation to Universal Basic Income">Relation to Universal Basic Income</a><br />
<br />
3. <a href="#Educating the Public about Blockchain">Educating the Public about Blockchain</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	3.1. <a href="#Current State of Public Understanding">Current State of Public Understanding</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	3.2. <a href="#Reaching a New Audience">Reaching a New Audience</a><br />
<br />
4. <a href="#The Public Happiness Movement Token">The Public Happiness Movement Token</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	4.1. <a href="#Token Overview">Token Overview</a><br />
<br />
5. <a href="#Public Happiness Movement Token ICO">Public Happiness Movement Token ICO</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.1. <a href="#ICO Strategy">ICO Strategy</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.2. <a href="#ICO Stages">ICO Stages</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.3. <a href="#Ongoing Funding for Specific Projects and Experts">Ongoing Funding for Specific Projects and Experts</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	5.4. <a href="#ICO Marketing">ICO Marketing</a><br />
<br />
6. <a href="#Public Happiness – Background">Public Happiness – Background</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	6.1. <a href="#Community Background">Community Background</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	6.2. <a href="#The Public Happiness Movement Community">The Public Happiness Movement Community</a><br />
<br />
7. <a href="#Platform Overview">Platform Overview</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.1. <a href="#The Public Happiness Map">The Public Happiness Map</a>(public actions for increasing human and society well-being)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.2. <a href="#Action Center">Action Center</a>(microvolunteering)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.3. <a href="#Community News">Community News</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.4. <a href="#Active Happiness Shop">Active Happiness Shop</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.5. <a href="#Who Defines What is Accepted as ‘Public Happiness’">Who Defines What is Accepted as ‘Public Happiness’</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.6. <a href="#Evidence Based and Peer Reviewed Actions">Evidence Based and Peer Reviewed Actions</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.7. <a href="#Who can Participate on the Platform">Who can Participate on the Platform</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.8. <a href="#Pre-existing Communities with Similar Values">Pre-existing Communities with Similar Values</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.9. <a href="#Languages">Languages</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.10. <a href="#Decentralised Governance and Voting">Decentralised Governance and Voting</a><br />
<br />
8. <a href="#The Path to Decentralisation">The Path to Decentralisation</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.1. <a href="#Benevolent Dictatorship vs Complete Community Governance">Benevolent Dictatorship vs Complete Community Governance</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.2. <a href="#Example Scenario: Outside Collusion">Example Scenario: Outside Collusion</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.3. <a href="#Lines of Defence">Lines of Defence</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	8.4. <a href="#Conclusion">Conclusion</a><br />
<br />
9. <a href="#Security">Security</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.1. <a href="#Levels of Trust">Levels of Trust</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.2. <a href="#Community Administrators">Community Administrators</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.3. <a href="#Project Administrators">Project Administrators</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.4. <a href="#Mining Limits">Mining Limits</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	9.5. <a href="#Cold Storage and Key Holders">Cold Storage and Key Holders</a><br />
<br />
10. <a href="#Marketing Strategy">Marketing Strategy</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.1. <a href="#A New Level of Hash Tagging">A New Level of Hash Tagging</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.2. <a href="#Bus Tour">Bus Tour</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.3. <a href="#Public Happiness Channel">Public Happiness Channel</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.4. <a href="#Happy Cam">Happy Cam</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.5. <a href="#Public Happiness Partners">Public Happiness Partners</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.6. <a href="#Online Supporters">Online Supporters</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.7. <a href="#Contests">Contests</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	10.8. <a href="#Collectables">Collectables</a><br />
<br />
11. <a href="#Automated Token Distribution Matrix">Automated Token Distribution Matrix</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.1. <a href="#Weighted Mining">Weighted Mining</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.2. <a href="#Hard Cap">Hard Cap</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.3. <a href="#Adjusting the Balancing">Adjusting the Balancing</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.4. <a href="#Token Release">Token Release</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.5. <a href="#Mining Table">Mining Table</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.6. <a href="#Experience Multipliers">Experience Multipliers</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.7. <a href="#Token Distribution">Token Distribution</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	11.8. <a href="#Further Matrix Considerations">Further Matrix Considerations</a><br />
<br />
12. <a href="#Team">Team</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.1. <a href="#Current Team Members">Current Team Members</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.2. <a href="#Positions Open">Positions Open</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.3. <a href="#Remuneration">Remuneration</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	12.4. <a href="#Facilities">Facilities</a><br />
<br /> 
13. <a href="#Platform Technicals">Platform Technicals</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.1. <a href="#Crypto Linking Bridges">Crypto Linking Bridges</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.2. <a href="#Trello vs Wekan vs Other Solutions">Trello vs Wekan vs Other Solutions</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.3. <a href="#Leaflet.js vs Google Maps API">Leaflet.js vs Google Maps API</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	13.4. <a href="#Switching the Platform to the Dapps Network">Switching the Platform to the Dapps Network</a><br />
<br />
14. <a href="#Doomsday Protocol">Doomsday Protocol</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.1. <a href="#Huge Market Crash">Huge Market Crash</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.2. <a href="#Quantum Security">Quantum Security</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.3. <a href="#Massive Hack">Massive Hack</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	14.4. <a href="#Zombie Apocalypse">Zombie Apocalypse</a><br />
<br />
15. <a href="#Giving Back to Open-source">Giving Back to Open-source</a><br />
<br />
16. <a href="#Timeline">Timeline</a><br />
<br />
17. <a href="#Key Supporters and Team">Key Supporters and Team</a><br />
<br />
18. <a href="#Questions to be Resolved">Questions to be Resolved</a><br />
 </p>
  </div>
 </React.Fragment>
 )
  

const markdownSection1 = md.render(`

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

Note: This white paper is quite long. The most effective way to contribute is by reading the intro and why ‘the world needs this’, and then clicking the sections in the contents page which you’d most like to contribute to. To discuss a section and make suggestions, click on the red balloons.

`)


const markdownSection100 = md.render(`

[Version 1 - please discuss which version is best]

1. Our ‘profit at all cost’ GDP based economy has failed to provide healthy communities to live in, and it has damaged our planet. It has borrowed from its children's wealth, creating nations where entire generations are largely unable to own a home. It has created a work/life balance where people are living under so much pressure that they push back basic human norms, like starting a family, because it's too expensive. 

We aim to provide a balancing effect. Creating a new economic system where people are rewarded for doing the essential work needed to produce healthy and happy communities for us all to enjoy.

2. Decentralised Governance in blockchain suffers because players can utilise fiat to buy influence over the ecosystem’s direction and decision making; or centralised founders hold onto power. Undermining the decentralised goals they were founded upon.

We create reputation weighted governance earned through contributions to the ecosystem’s mission; also opening our governance model up to people outside of the fin-tech community

3. Volunteers by nature normally contribute a little, then move on. Leaving most volunteer projects constantly training new team members, at the heavy expense of efficiency. 

We incentivise and increasingly reward long-term commitment. Creating micro-volunteering towards good causes, with the efficiency of the for-profit world. Platform users are rewarded for taking positive actions which benefit our local, and global societies. Supercharging the network effect of the Public Happiness Movement and its impact locally, and globally. Rapidly growing the community through an incentivised ecosystem, directing energy into finding more effective ways to achieve positive societal and cultural change, ideas that we can’t even imagine yet – but can’t wait to see!

4. Those with beautiful and inspirational ideas for creating a change to benefit humanity lose far, far too much energy chasing funding so they can bring it to the world. Far too many ingenious ideas currently falter and fade out at the bitter expense of every human alive, because someone lacked the skills and connections to fund bringing their vision to life. 

Our community debates the merits of ideas, shaping and strengthening them. The best are selected by voting to be funded and built in our micro-volunteering hub by our wider community, allowing a great idea to thrive, regardless of the experience, wealth and connections of the person who thought of it.

5. Social media gave humanity a new power. It became a place where ideas could emerge from the crowd, take form and gain a following, in ways never before possible. Where creative ideas and solutions could emerge freely, gaining traction on their own merit, and grow into large scale social events and projects. Then, gradually, they took this tool away. Making it ever more difficult for those ideas to reach an audience unless there was money behind them. Business, celebrity and big charities began dominating reach in a 'pay to play' system. 

Led by Facebook a ‘click and move-on’ culture was designed. Educating much of the world's population to ever-shorter attention spans, as faster clicks equals more ad revenue. Grass-roots change creators struggled to engage the communities they had built. Then Facebook, and others, began listening to our conversations online, and offline. Collecting our location data. Extrapolating and creating immense data sets of our most personal information to sell to the highest bidder. They used this to facilitate election hacking, undermining our democracies.

Enough is enough! Our platform returns this power to everyone, regardless of their financial backing. It brings back that ability for social movements to form freely around innovative ideas for change. It pushes back against this consumer culture, re-educating users to become active in the projects and activities they want to support. Empowering us all to realise the power we all have when uniting in mass around creative ideas for positive change. Our platform is 100% open source and will never sell users valuable personal data.

6. There is an entire emerging industry, hidden and stifled. Rarely picked up by the media, because these not-for-profit projects can't afford to ‘pay-to-play’. Yet individually it's leaders are mobilising hundreds of thousands of people each year into action to meet society's need for increasing peace, community and human connection, understanding, kindness, and well-being. None of those things are recognised, or measured in capitalist, GDP, based societies; and so it goes under the radar. It's leaders living in poverty in order to try and meet society's unmet needs - it's rising stars are often faced with a choice of eating or quitting. This platform creates a ‘Happiness Economy’ rewarding anyone creating societal value, and benefiting our lives in unconventional, non-profit ways. 

This platform allows this stifled, emerging economy to spread out its wings and take off. Opening the door for thousands, perhaps millions, to become active in improving societal well-being where they live. An economy open to anyone, not just the most stubborn who are driven to a calling regardless of the personal costs.

7. The emerging Public Happiness Movement is fragmented. The people and communities aiming to bring around a local, or global shift in culture towards more peace, connection and well-being, mostly do so independently of each other. Each pushing in the same direction, to create the same changes.

This platform combines and focuses each community's energy. Magnifying massively our combined message, amplifying our media, and reaching/inspiring a far larger audience. This platform allows that energy to stack and multiply, unleashing an unstoppable wave, as a global Movement bringing; kindness, understanding, individual and community empowerment to solve the issues we face, and human connection. Collaborations and information sharing also becomes easier, and individual dreams become a shared goal that we can reach together.

8. Tokenizing massively accelerates the effects of a network. Happiness is a great candidate for the boost a crypto-economic model can provide. Tokenizing will rapidly advance our Movement’s effect on global public happiness and well-being.

9. The Blockchain revolution is coming, but it remains inaccessible to the vast majority of the public. Those engaging in this new technology rarely come from outside the fin-tech, or investor/speculator sectors. It is boxed off by the technical skills and interest needed to understand it. It's a revolution that is only scratching the surface. 

Our Token and Platform take Blockchain onto the streets to engage and interact with people in their everyday life, all across the world. It provides a gentle on-ramp to understand the world of Blockchain and Cryptocurrency requiring no special technical skills at all in the beginning. It is a desperately needed bridge to open the Blockchain community up to the wider world and begin teaching how it can impact their lives, and will shape our future.

10. Greedy founders are enriching themselves massively through ICO's, before, and unfortunately regularly, in place of, actually building a useful project. Whales coming in early often own significant percentages of their total tokens.

Our project is a non-profit with our core team's reimbursement decided by outside adjudication firm. It is against our user terms for anyone to own more than 0.5% of our total released tokens, and if an individual is discovered to have done so they will be advised to sell part, or lose it. In a decentralised economy no-one individual should own more than that amount. There will be no pre-sale to angel investors

11. In a time and age where climate change is our 'cold war', with over 60% of our planets wildlife lost since 1970, we are facing down the barrel of potentially cataclysmic times. That certain Cryptocurrencies use more energy in mining than entire medium sized nations, is perhaps the biggest issue the industry faces. A global explosion in the industry would be damaging, perhaps even devastating to the world we live in, leading to heavy and needed regulation on the industry. This critical issue must be solved before that inevitable growth occurs.

Our Token is pre-mined and then gradually released to create liquidity. The platform will be moved onto the DAPPS network when it scales, not requiring servers. Our proof-of-work is a conceptual construct which users perform mostly in the real world, rather than by performing power hungry mathematical problems on their computers/mining rigs. The Token is built upon Ethereum and will benefit from the upcoming change to Proof of Stake. Our project and token is designed to consume less power than most standard website of similar scale.

12. Dangerous messages are being amplified on other media platforms, and used to divide communities for political aims, or to increase profits. Important movements for equality and respect for our shared human experience are being diverted and used to attack each other and drive a wedge in our communities. Misinformation is everywhere. Volume has come to be seen as equal to expertise by far too many people.

We create an energetic space where all activities focus on what unites us as human beings, and are rooted in the peer reviewed science to direct action by the best of current human understanding.

13. Many high profile projects and platforms, with multi-billion dollar market caps, average utterly embarrassing numbers of users daily, weekly, or monthly. It's like a dirty secret we aren't supposed to talk about.

The platform you are here to read about on boards existing communities of hundreds of thousands of people, offering them far more effective tools than they use currently to pursue their existing positive missions. It also offers them shared ownership, and a stake in determining the future development of those tools.

This paper is an early non-technical outline of how this can be realised, to provide a foundation for discussion. The platform also already exists, built by a team of over 130 volunteer web developers who believe in our vision. It is built to the minimal stage to begin onboarding the community who will shape it.

If you've been invited to read this, and agree with what I've written so far, then I invite you you to become a partner, or advisor, and to help shape what follows into a polished white paper ready for the rest of the world to see. 


Welcome into my dream of a brighter future. I hope it will become our dream, and then become reality for millions of others.

Founder, Andy Tulett


`)

				   
const markdownSection101 = md.render(`

**Public Happiness Token: 
A New Cryptocurrency Intrinsically tied to Creating Societal Good**

Public Happiness Token is a currency which is intrinsically tied to creating social good. The more its traded, mined and earned, the more our network benefits local communities around the world, building a friendlier, safer and happier future. 

**Problems the Public Happiness Token Aims to Solve:**

Positive Societal and Cultural Change:

Supercharging the network effect of the Public Happiness Movement. Rapidly growing the community through an incentivised ecosystem, directing energy into finding more effective ways to achieve positive societal and cultural change, ideas that we can’t even imagine yet – but can’t wait to see! 

Currencies benefiting Communities:
Cryptocurrencies give us the ability to choose to use/support a currency because we agree with its ethical value and effects on society. Public Happiness Token aims to demonstrate this to the public by creating an alternative currency with its value distinctly and inseparably tied to positive impacts towards a healthier society where its used and mined.


Human Well-being:

Our crypto-enhanced ecosystem directs energy and creativity onto solving issues critical to a healthy local and global society, incentivising action on issues that reduce human well-being which are largely overlooked by today’s GDP based societies.

Distribution: 
Our Public Happiness activities and projects get people onto the streets reaching people in their daily life and engaging a much wider and more diversified audience into the world of blockchain. Our token is a big step forwards in mass-adoption outside of the current crypto markets. 

Educating the Public: 
We demonstrate how cryptocurrencies can impact people’s daily lives and communities in a positive way, and teach them how they can engage with it. Using our network and platform we will lead new users on a journey of discovery, culminating in a greater understanding of the world of blockchain and decentralisation.

Decentralised Governance:
Our platform creates a decentralised self-governing and evolving community focused on positive cultural change. Grandfathering in a reputation weighted community voting system and gradually opening up all areas of the project to decentralised governance, while maintaining a clear direction by guiding members to weigh all decisions against a [Community Values ](https://news.focallocal.org/the-focallocal-community-values/)statement which all users agree to upon joining the community. 


Our ecosystem and mission rewards positive behaviour towards each other and society with a higher influence on voting, ensuring a governance culture rooted in that positivity which is resistant to attempts to subvert the token/original mission; as has befallen other decentralised projects.

Super-Charged Network Effect:
Tokenizing massively accelerates the effects of a network. Happiness is a great candidate for the boost a crypto-economic model can provide. Tokenizing will rapidly advance our Movement’s effect on global public happiness and well-being.

An Evolving Platform:

The platform is being built to a minimum usable product. After that users will direct and build the platform they need to maximise their effectiveness. Voting on the best plans to improve it.

Culture and Foundations laid by Top Experts:

Our ICO will be used to fund top-level staff to bring their skills in and lead the platforms 1st users. Facilitating a smooth growth, until the community is mature enough to self-govern.

Reaching New Audiences:

Teaching users core concepts of the crypto-economic model, our token can operate as a bridge between blockchain and other parts of the non-digital world, through its ability to reach a far broader, and less tech-savvy audience than other coins and tokens.

Wider Acceptance of Blockchain:
Our platform aims to educate users as to how blockchain will change the world they live in, and how they can understand and interact with it. Attracting a wider community and an ecosystem to create positive societal change we can't even imagine yet.

The paper below is a working first draft, intended to explain the direction and ethos of the Public Happiness Token to the experts joining the project to apply expertise from their specialist area and create a Whitepaper ready for public release. It is currently word heavy and technical expertise light, you’re here to improve that.

`)				   
				   

const markdownSection2 = md.render(`

## 
1.1.

**Background**

Today’s society is based on GDP, with almost every political decision weighed against this to see if it should go ahead. The founder of GDP, Simon Kuznets campaigned against its use as a primary tool, arguing that it was never intended to be the base our societies were built upon. He designed GDP in 1937 solely for the post war recovery and believed it was entirely unsuitable as the main measure of societal success/well-being because it undervalued and ignored large areas that are critical to a healthy, functioning society. 

*‘the welfare of a nation can scarcely be inferred **from** a measurement of national income as defined by the GDP’* - Simon Kuznets

The Charity model exists largely to paper over these cracks, but has rarely been able to resolve a serious societal issue. That is because the fuel causing these issues is that our societies use GDP as their primary measure of success, and solving these issues rarely produces a direct GDP increase. Consider the issue of homelessness, where a vast amounts of money have been donated to charities doing excellent work supporting those who are homeless... yet people are still living on the streets in every major city in the World. GDP has a painfully obvious blind spot here which the charity model is unable to resolve. Our nations are getting ever more wealthy and yet people still regularly freeze to death on the streets.

Crypto-economics is the golden opportunity to redress these economic imbalances and blind-spots. Preventing the hurt and misery they’ve caused to so many humans, all across the world from continuing.  

The Public Happiness Token aims to be a pillar in beginning that essential re-balance, by incentivizing action. both globally, and locally. To identify to resolve these critical and overlooked areas essential to a healthy society – and by doing so from the people, upwards. Totally bypassing slow-moving, and too often corrupt governmental process.

*‘We need to move beyond Gross Domestic Product (GDP) as our main measure of progress and fashion a sustainable development index that puts people first’* - at the time UN Secretary General, Ban Ki Moon

You can read more about [the token background here](https://news.focallocal.org/token-background/)

`)

const markdownSection3 = md.render(`

## 
1.2.

**Public Happiness Token****: Introduction **

Public Happiness Token is an ERC20 Token created from Ethereum blockchain. The Token itself will have few modifications, with its value to society, and for trading, coming from its unique use in engaging users in activities and projects to create a happier, safer and friendlier society for their local community.

All Public Action is organised via our platform focallocal.org and app. Our web-based platform has been built entirely by volunteers who support the vision and is already operational in Beta, early-launch stage. 

Integration of an ERC20 Token into the platform will fuel a rapidly growing community, using the platform and ecosystem to create projects and activities to bring positive change into the world that we can’t even imagine yet!

The Public Happiness Token can be ‘mined’ by using our platform to take action on local societal issues to create greater well-being nearby. Action which occurs in the real world, is tracked through hash-tagging photos and videos on social media, and via feedback from other users. 

The Token is also mined by taking actions essential to the smooth functioning, and growth of the platform, crypto-economic network, and community (for example, bounty hunting for people trying to game the system, or by completing micro-volunteering tasks to build projects).

Founder Andy has always built the Public Happiness Movement Public Happiness project based upon people rather than money, because of the negative effect its presence and pressures often have on people, and societies. Choosing to live an extremely frugal lifestyle in order to focus full-time on Public Happiness; living in a van and working side jobs where needed to support it rather than applying for funding or running crowd-funders. The Focallocal Community was built and maintained for 7 years almost entirely on the concept of avoiding money wherever possible. 

Blockchain creates a new and intriguing possibility to super-charge our positive impact by creating a currency which is intrinsically linked to creating individual, and societal well-being; bringing more peace and happiness to the world each and every time it is used. Public Happiness Token aims to be that currency.


**Disclaimer: **Please note that this white paper does not create any legally binding obligations, it is presented here purely for informational purposes. For more information please read our terms of use

[Add link for terms of use]
				   
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


				   
const Anchor1  = () => <Fragment><h2 id="Abstract" style={{margin: 'auto'}}>Abstract</h2><div dangerouslySetInnerHTML={{ __html: markdownSection1 }} /></Fragment>
const Anchor2  = () => <Fragment><h2 id="Background" style={{margin: 'auto'}}>Background</h2><div dangerouslySetInnerHTML={{ __html: markdownSection2 }} /></Fragment>
const Anchor3  = () => <Fragment><h2 id="Public Happiness Movement Token Introduction" style={{margin: 'auto'}}>Public Happiness Movement Token Introduction</h2><div dangerouslySetInnerHTML={{ __html: markdownSection3 }} /></Fragment>
const Anchor4  = () => <Fragment><h2 id="Problem Statement" style={{margin: 'auto'}}>Problem Statement</h2><div dangerouslySetInnerHTML={{ __html: markdownSection4 }} /></Fragment>
const Anchor5  = () => <Fragment><h2 id="Issues we Aim to Solve" style={{margin: 'auto'}}>Issues we Aim to Solve</h2><div dangerouslySetInnerHTML={{ __html: markdownSection5 }} /></Fragment>
const Anchor6  = () => <Fragment><h2 id="Primary Goal" style={{margin: 'auto'}}>Primary Goal</h2><div dangerouslySetInnerHTML={{ __html: markdownSection6 }} /></Fragment>
const Anchor7  = () => <Fragment><h2 id="Secondary Goal" style={{margin: 'auto'}}>Secondary Goal</h2><div dangerouslySetInnerHTML={{ __html: markdownSection7 }} /></Fragment>
const Anchor8  = () => <Fragment><h2 id="Relation to Universal Basic Income" style={{margin: 'auto'}}>Relation to Universal Basic Income</h2><div dangerouslySetInnerHTML={{ __html: markdownSection8 }} /></Fragment>
const Anchor9  = () => <Fragment><h2 id="Educating the Public about Blockchain" style={{margin: 'auto'}}></h2><div dangerouslySetInnerHTML={{ __html: markdownSection9 }} /></Fragment>
const Anchor10 = () => <Fragment><h2 id="Current State of Public Understanding" style={{margin: 'auto'}}>Current State of Public Understanding</h2><div dangerouslySetInnerHTML={{ __html: markdownSection10 }} /></Fragment>
const Anchor11 = () => <Fragment><h2 id="Reaching a New Audience" style={{margin: 'auto'}}>Reaching a New Audience</h2><div dangerouslySetInnerHTML={{ __html: markdownSection11 }} /></Fragment>
const Anchor12 = () => <Fragment><h2 id="The Public Happiness Movement Token" style={{margin: 'auto'}}>The Public Happiness Movement Token</h2><div dangerouslySetInnerHTML={{ __html: markdownSection12 }} /></Fragment>
const Anchor13 = () => <Fragment><h2 id="Token Overview" style={{margin: 'auto'}}>Token Overview</h2><div dangerouslySetInnerHTML={{ __html: markdownSection13 }} /></Fragment>
const Anchor14 = () => <Fragment><h2 id="Public Happiness Movement Token ICO" style={{margin: 'auto'}}></h2><div dangerouslySetInnerHTML={{ __html: markdownSection14 }} /></Fragment>
const Anchor15 = () => <Fragment><h2 id="ICO Strategy" style={{margin: 'auto'}}>ICO Strategy</h2><div dangerouslySetInnerHTML={{ __html: markdownSection15 }} /></Fragment>
const Anchor16 = () => <Fragment><h2 id="ICO Stages" style={{margin: 'auto'}}>ICO Stages</h2><div dangerouslySetInnerHTML={{ __html: markdownSection16 }} /></Fragment>
const Anchor17 = () => <Fragment><h2 id="Ongoing Funding for Specific Projects and Experts" style={{margin: 'auto'}}>Ongoing Funding for Specific Projects and Experts</h2><div dangerouslySetInnerHTML={{ __html: markdownSection17 }} /></Fragment>
const Anchor18 = () => <Fragment><h2 id="ICO Marketing" style={{margin: 'auto'}}>ICO Marketing</h2><div dangerouslySetInnerHTML={{ __html: markdownSection18 }} /></Fragment>
const Anchor19 = () => <Fragment><h2 id="Public Happiness – Background" style={{margin: 'auto'}}>Public Happiness – Background</h2><div dangerouslySetInnerHTML={{ __html: markdownSection19 }} /></Fragment>
const Anchor20 = () => <Fragment><h2 id="Community Background" style={{margin: 'auto'}}>Community Background</h2><div dangerouslySetInnerHTML={{ __html: markdownSection20 }} /></Fragment>
const Anchor21 = () => <Fragment><h2 id="The Public Happiness Movement Community" style={{margin: 'auto'}}>The Public Happiness Movement Community</h2><div dangerouslySetInnerHTML={{ __html: markdownSection21 }} /></Fragment>
const Anchor22 = () => <Fragment><h2 id="Platform Overview" style={{margin: 'auto'}}>Platform Overview</h2><div dangerouslySetInnerHTML={{ __html: markdownSection22 }} /></Fragment>
const Anchor23 = () => <Fragment><h2 id="The Public Happiness Map" style={{margin: 'auto'}}>The Public Happiness Map (public actions for increasing human and society well-being)</h2><div dangerouslySetInnerHTML={{ __html: markdownSection23 }} /></Fragment>
const Anchor24 = () => <Fragment><h2 id="Action Center" style={{margin: 'auto'}}>Action Center (microvolunteering)</h2><div dangerouslySetInnerHTML={{ __html: markdownSection24 }} /></Fragment>
const Anchor25 = () => <Fragment><h2 id="Community News" style={{margin: 'auto'}}>Community News</h2><div dangerouslySetInnerHTML={{ __html: markdownSection25 }} /></Fragment>
const Anchor26 = () => <Fragment><h2 id="Active Happiness Shop" style={{margin: 'auto'}}>Active Happiness Shop</h2><div dangerouslySetInnerHTML={{ __html: markdownSection26 }} /></Fragment>
const Anchor27 = () => <Fragment><h2 id="Who Defines What is Accepted as ‘Public Happiness’" style={{margin: 'auto'}}>Who Defines What is Accepted as ‘Public Happiness’</h2><div dangerouslySetInnerHTML={{ __html: markdownSection27 }} /></Fragment>
const Anchor28 = () => <Fragment><h2 id="Evidence Based and Peer Reviewed Actions" style={{margin: 'auto'}}>Evidence Based and Peer Reviewed Actions</h2><div dangerouslySetInnerHTML={{ __html: markdownSection28 }} /></Fragment>
const Anchor29 = () => <Fragment><h2 id="Who can Participate on the Platform" style={{margin: 'auto'}}>Who can Participate on the Platform</h2><div dangerouslySetInnerHTML={{ __html: markdownSection29 }} /></Fragment>
const Anchor30 = () => <Fragment><h2 id="Pre-existing Communities with Similar Values" style={{margin: 'auto'}}>Pre-existing Communities with Similar Values</h2><div dangerouslySetInnerHTML={{ __html: markdownSection30 }} /></Fragment>
const Anchor31 = () => <Fragment><h2 id="Languages" style={{margin: 'auto'}}>Languages</h2><div dangerouslySetInnerHTML={{ __html: markdownSection31 }} /></Fragment>
const Anchor32 = () => <Fragment><h2 id="Decentralised Governance and Voting" style={{margin: 'auto'}}>Decentralised Governance and Voting</h2><div dangerouslySetInnerHTML={{ __html: markdownSection32 }} /></Fragment>
const Anchor33 = () => <Fragment><h2 id="The Path to Decentralisation" style={{margin: 'auto'}}>The Path to Decentralisation</h2><div dangerouslySetInnerHTML={{ __html: markdownSection33 }} /></Fragment>
const Anchor34 = () => <Fragment><h2 id="Benevolent Dictatorship vs Complete Community Governance" style={{margin: 'auto'}}>Benevolent Dictatorship vs Complete Community Governance</h2><div dangerouslySetInnerHTML={{ __html: markdownSection34 }} /></Fragment>
const Anchor35 = () => <Fragment><h2 id="Example Scenario: Outside Collusion" style={{margin: 'auto'}}>Example Scenario: Outside Collusion</h2><div dangerouslySetInnerHTML={{ __html: markdownSection35 }} /></Fragment>
const Anchor36 = () => <Fragment><h2 id="Lines of Defence" style={{margin: 'auto'}}>Lines of Defence</h2><div dangerouslySetInnerHTML={{ __html: markdownSection36 }} /></Fragment>
const Anchor37 = () => <Fragment><h2 id="Conclusion" style={{margin: 'auto'}}>Conclusion</h2><div dangerouslySetInnerHTML={{ __html: markdownSection37 }} /></Fragment>
const Anchor38 = () => <Fragment><h2 id="Security" style={{margin: 'auto'}}>Security</h2><div dangerouslySetInnerHTML={{ __html: markdownSection38 }} /></Fragment>
const Anchor39 = () => <Fragment><h2 id="Levels of Trust" style={{margin: 'auto'}}>Levels of Trust</h2><div dangerouslySetInnerHTML={{ __html: markdownSection39 }} /></Fragment>
const Anchor40 = () => <Fragment><h2 id="Community Administrators" style={{margin: 'auto'}}>Community Administrators</h2><div dangerouslySetInnerHTML={{ __html: markdownSection40 }} /></Fragment>
const Anchor41 = () => <Fragment><h2 id="Project Administrators" style={{margin: 'auto'}}>Project Administrators</h2><div dangerouslySetInnerHTML={{ __html: markdownSection41 }} /></Fragment>
const Anchor42 = () => <Fragment><h2 id="Mining Limits" style={{margin: 'auto'}}>Mining Limits</h2><div dangerouslySetInnerHTML={{ __html: markdownSection42 }} /></Fragment>
const Anchor43 = () => <Fragment><h2 id="Cold Storage and Key Holders" style={{margin: 'auto'}}>Cold Storage and Key Holders</h2><div dangerouslySetInnerHTML={{ __html: markdownSection43 }} /></Fragment>
const Anchor44 = () => <Fragment><h2 id="Marketing Strategy" style={{margin: 'auto'}}>Marketing Strategy</h2><div dangerouslySetInnerHTML={{ __html: markdownSection44 }} /></Fragment>
const Anchor45 = () => <Fragment><h2 id="A New Level of Hash Tagging" style={{margin: 'auto'}}>A New Level of Hash Tagging</h2><div dangerouslySetInnerHTML={{ __html: markdownSection45 }} /></Fragment>
const Anchor46 = () => <Fragment><h2 id="Bus Tour" style={{margin: 'auto'}}>Bus Tour</h2><div dangerouslySetInnerHTML={{ __html: markdownSection46 }} /></Fragment>
const Anchor47 = () => <Fragment><h2 id="Public Happiness Channel" style={{margin: 'auto'}}>Public Happiness Channel</h2><div dangerouslySetInnerHTML={{ __html: markdownSection47 }} /></Fragment>
const Anchor48 = () => <Fragment><h2 id="Happy Cam" style={{margin: 'auto'}}>Happy Cam</h2><div dangerouslySetInnerHTML={{ __html: markdownSection48 }} /></Fragment>
const Anchor49 = () => <Fragment><h2 id="Public Happiness Partners" style={{margin: 'auto'}}>Public Happiness Partners</h2><div dangerouslySetInnerHTML={{ __html: markdownSection49 }} /></Fragment>
const Anchor50 = () => <Fragment><h2 id="Online Supporters" style={{margin: 'auto'}}>Online Supporters</h2><div dangerouslySetInnerHTML={{ __html: markdownSection50 }} /></Fragment>
const Anchor51 = () => <Fragment><h2 id="Contests" style={{margin: 'auto'}}>Contests</h2><div dangerouslySetInnerHTML={{ __html: markdownSection51 }} /></Fragment>
const Anchor52 = () => <Fragment><h2 id="Collectables" style={{margin: 'auto'}}>Collectables</h2><div dangerouslySetInnerHTML={{ __html: markdownSection52 }} /></Fragment>
const Anchor53 = () => <Fragment><h2 id="Automated Token Distribution Matrix" style={{margin: 'auto'}}>Automated Token Distribution Matrix</h2><div dangerouslySetInnerHTML={{ __html: markdownSection53 }} /></Fragment>
const Anchor54 = () => <Fragment><h2 id="Weighted Mining" style={{margin: 'auto'}}>Weighted Mining</h2><div dangerouslySetInnerHTML={{ __html: markdownSection54 }} /></Fragment>
const Anchor55 = () => <Fragment><h2 id="Hard Cap" style={{margin: 'auto'}}>Hard Cap</h2><div dangerouslySetInnerHTML={{ __html: markdownSection55 }} /></Fragment>
const Anchor56 = () => <Fragment><h2 id="Adjusting the Balancing" style={{margin: 'auto'}}>Adjusting the Balancing</h2><div dangerouslySetInnerHTML={{ __html: markdownSection56 }} /></Fragment>
const Anchor57 = () => <Fragment><h2 id="Token Release" style={{margin: 'auto'}}>Token Release</h2><div dangerouslySetInnerHTML={{ __html: markdownSection57 }} /></Fragment>
const Anchor58 = () => <Fragment><h2 id="Mining Table" style={{margin: 'auto'}}>Mining Table</h2><div dangerouslySetInnerHTML={{ __html: markdownSection58 }} /></Fragment>
const Anchor59 = () => <Fragment><h2 id="Experience Multipliers" style={{margin: 'auto'}}>Experience Multipliers</h2><div dangerouslySetInnerHTML={{ __html: markdownSection59 }} /></Fragment>
const Anchor60 = () => <Fragment><h2 id="Token Distribution" style={{margin: 'auto'}}>Token Distribution</h2><div dangerouslySetInnerHTML={{ __html: markdownSection60 }} /></Fragment>
const Anchor61 = () => <Fragment><h2 id="Further Matrix Considerations" style={{margin: 'auto'}}>Further Matrix Considerations</h2><div dangerouslySetInnerHTML={{ __html: markdownSection61 }} /></Fragment>
const Anchor62 = () => <Fragment><h2 id="Team" style={{margin: 'auto'}}>Team</h2><div dangerouslySetInnerHTML={{ __html: markdownSection62 }} /></Fragment>
const Anchor63 = () => <Fragment><h2 id="Current Team Members" style={{margin: 'auto'}}>Current Team Members</h2><div dangerouslySetInnerHTML={{ __html: markdownSection63 }} /></Fragment>
const Anchor64 = () => <Fragment><h2 id="Positions Open" style={{margin: 'auto'}}>Positions Open</h2><div dangerouslySetInnerHTML={{ __html: markdownSection64 }} /></Fragment>
const Anchor65 = () => <Fragment><h2 id="Remuneration" style={{margin: 'auto'}}>Remuneration</h2><div dangerouslySetInnerHTML={{ __html: markdownSection65 }} /></Fragment>
const Anchor66 = () => <Fragment><h2 id="Facilities" style={{margin: 'auto'}}>Facilities</h2><div dangerouslySetInnerHTML={{ __html: markdownSection66 }} /></Fragment>
const Anchor67 = () => <Fragment><h2 id="Platform Technicals" style={{margin: 'auto'}}>Platform Technicals</h2><div dangerouslySetInnerHTML={{ __html: markdownSection67 }} /></Fragment>
const Anchor68 = () => <Fragment><h2 id="Crypto Linking Bridges" style={{margin: 'auto'}}>Crypto Linking Bridges</h2><div dangerouslySetInnerHTML={{ __html: markdownSection68 }} /></Fragment>
const Anchor69 = () => <Fragment><h2 id="Trello vs Wekan vs Other Solutions" style={{margin: 'auto'}}>Trello vs Wekan vs Other Solutions</h2><div dangerouslySetInnerHTML={{ __html: markdownSection69 }} /></Fragment>
const Anchor70 = () => <Fragment><h2 id="Leafletjs vs Google Maps API" style={{margin: 'auto'}}>Leafletjs vs Google Maps API</h2><div dangerouslySetInnerHTML={{ __html: markdownSection70 }} /></Fragment>
const Anchor71 = () => <Fragment><h2 id="Switching the Platform to the Dapps Network" style={{margin: 'auto'}}>Switching the Platform to the Dapps Network</h2><div dangerouslySetInnerHTML={{ __html: markdownSection71 }} /></Fragment>
const Anchor72 = () => <Fragment><h2 id="Doomsday Protocol" style={{margin: 'auto'}}>Doomsday Protocol</h2><div dangerouslySetInnerHTML={{ __html: markdownSection72 }} /></Fragment>
const Anchor73 = () => <Fragment><h2 id="Huge Market Crash" style={{margin: 'auto'}}>Huge Market Crash</h2><div dangerouslySetInnerHTML={{ __html: markdownSection73 }} /></Fragment>
const Anchor74 = () => <Fragment><h2 id="Quantum Security" style={{margin: 'auto'}}>Quantum Security</h2><div dangerouslySetInnerHTML={{ __html: markdownSection74 }} /></Fragment>
const Anchor75 = () => <Fragment><h2 id="Massive Hack" style={{margin: 'auto'}}>Massive Hack</h2><div dangerouslySetInnerHTML={{ __html: markdownSection75 }} /></Fragment>
const Anchor76 = () => <Fragment><h2 id="Zombie Apocalypse" style={{margin: 'auto'}}>Zombie Apocalypse</h2><div dangerouslySetInnerHTML={{ __html: markdownSection76 }} /></Fragment>
const Anchor77 = () => <Fragment><h2 id="Giving Back to Open-source" style={{margin: 'auto'}}>Giving Back to Open-source</h2><div dangerouslySetInnerHTML={{ __html: markdownSection77 }} /></Fragment>
const Anchor78 = () => <Fragment><h2 id="Timeline" style={{margin: 'auto'}}>Timeline</h2><div dangerouslySetInnerHTML={{ __html: markdownSection78 }} /></Fragment>
const Anchor79 = () => <Fragment><h2 id="Key Supporters and Team" style={{margin: 'auto'}}>Key Supporters and Team</h2><div dangerouslySetInnerHTML={{ __html: markdownSection79 }} /></Fragment>
const Anchor80 = () => <Fragment><h2 id="Questions to be Resolved" style={{margin: 'auto'}}>Questions to be Resolved</h2><div dangerouslySetInnerHTML={{ __html: markdownSection80 }} /></Fragment>
const Anchor100 = () => <Fragment><h2 id="The World Needs This Because: (v1)" style={{margin: 'auto'}}>The World Needs This Because: (v1)</h2><div dangerouslySetInnerHTML={{ __html: markdownSection100 }} /></Fragment>
const Anchor101 = () => <Fragment><h2 id="The World Needs This Because: (v2)" style={{margin: 'auto'}}>The World Needs This Because: (v2)</h2><div dangerouslySetInnerHTML={{ __html: markdownSection101 }} /></Fragment>





const index = (props) => {
  return (
    <Container className="mt-5">
			<Title />
      <Anchor1  /><DCSBalloon balloonId="bal1" display="inline" dcsTags={props.dcsTags} />
			<Contents /><DCSBalloon title="click balloons to comment" balloonId="bal" display="inline" dcsTags={props.dcsTags} />
		<Anchor100  /><DCSBalloon balloonId="bal" display="inline" dcsTags={props.dcsTags} />
		<Anchor101  /><DCSBalloon balloonId="bal" display="inline" dcsTags={props.dcsTags} />
      <Anchor2  /><DCSBalloon balloonId="bal1" display="inline" dcsTags={props.dcsTags} />
      <Anchor3  /><DCSBalloon balloonId="bal1" display="inline" dcsTags={props.dcsTags} />
	  
	  <Anchor4  /><DCSBalloon balloonId="bal2" display="inline" dcsTags={props.dcsTags} />
      <Anchor5  /><DCSBalloon balloonId="bal2" display="inline" dcsTags={props.dcsTags} />
      <Anchor6  /><DCSBalloon balloonId="bal2" display="inline" dcsTags={props.dcsTags} />
	  <Anchor7  /><DCSBalloon balloonId="bal2" display="inline" dcsTags={props.dcsTags} />
      <Anchor8  /><DCSBalloon balloonId="bal2" display="inline" dcsTags={props.dcsTags} />
      
	  <Anchor9  /><DCSBalloon balloonId="bal3" display="inline" dcsTags={props.dcsTags} />
	  <Anchor10 /><DCSBalloon balloonId="bal3" display="inline" dcsTags={props.dcsTags} />
      <Anchor11 /><DCSBalloon balloonId="bal3" display="inline" dcsTags={props.dcsTags} />
      
	  <Anchor12 /><DCSBalloon balloonId="bal4" display="inline" dcsTags={props.dcsTags} />
      <Anchor13 /><DCSBalloon balloonId="bal4" display="inline" dcsTags={props.dcsTags} />
	  
	  <Anchor14 /><DCSBalloon balloonId="bal5" display="inline" dcsTags={props.dcsTags} />
      <Anchor15 /><DCSBalloon balloonId="bal5" display="inline" dcsTags={props.dcsTags} />
      <Anchor16 /><DCSBalloon balloonId="bal5" display="inline" dcsTags={props.dcsTags} />
	  <Anchor17 /><DCSBalloon balloonId="bal5" display="inline" dcsTags={props.dcsTags} />
      <Anchor18 /><DCSBalloon balloonId="bal5" display="inline" dcsTags={props.dcsTags} />
      
	  <Anchor19 /><DCSBalloon balloonId="bal6" display="inline" dcsTags={props.dcsTags} />
	  <Anchor20 /><DCSBalloon balloonId="bal6" display="inline" dcsTags={props.dcsTags} />
	  <Anchor21 /><DCSBalloon balloonId="bal6" display="inline" dcsTags={props.dcsTags} />
      
	  <Anchor22 /><DCSBalloon balloonId="bal7" display="inline" dcsTags={props.dcsTags} />
      <Anchor23 /><DCSBalloon balloonId="bal7" display="inline" dcsTags={props.dcsTags} />
	  <Anchor24 /><DCSBalloon balloonId="bal7" display="inline" dcsTags={props.dcsTags} />
      <Anchor25 /><DCSBalloon balloonId="bal7" display="inline" dcsTags={props.dcsTags} />
      <Anchor26 /><DCSBalloon balloonId="bal7" display="inline" dcsTags={props.dcsTags} />
	  <Anchor27 /><DCSBalloon balloonId="bal7" display="inline" dcsTags={props.dcsTags} />
      <Anchor28 /><DCSBalloon balloonId="bal7" display="inline" dcsTags={props.dcsTags} />
      <Anchor29 /><DCSBalloon balloonId="bal7" display="inline" dcsTags={props.dcsTags} />
	  <Anchor30 /><DCSBalloon balloonId="bal7" display="inline" dcsTags={props.dcsTags} />
	  <Anchor31 /><DCSBalloon balloonId="bal7" display="inline" dcsTags={props.dcsTags} />
      <Anchor32 /><DCSBalloon balloonId="bal7" display="inline" dcsTags={props.dcsTags} />
      
	  <Anchor33 /><DCSBalloon balloonId="bal8" display="inline" dcsTags={props.dcsTags} />
	  <Anchor34 /><DCSBalloon balloonId="bal8" display="inline" dcsTags={props.dcsTags} />
      <Anchor35 /><DCSBalloon balloonId="bal8" display="inline" dcsTags={props.dcsTags} />
      <Anchor36 /><DCSBalloon balloonId="bal8" display="inline" dcsTags={props.dcsTags} />
	  <Anchor37 /><DCSBalloon balloonId="bal8" display="inline" dcsTags={props.dcsTags} />
      
	  <Anchor38 /><DCSBalloon balloonId="bal9" display="inline" dcsTags={props.dcsTags} />
      <Anchor39 /><DCSBalloon balloonId="bal9" display="inline" dcsTags={props.dcsTags} />
	  <Anchor40 /><DCSBalloon balloonId="bal9" display="inline" dcsTags={props.dcsTags} />
	  <Anchor41 /><DCSBalloon balloonId="bal9" display="inline" dcsTags={props.dcsTags} />
      <Anchor42 /><DCSBalloon balloonId="bal9" display="inline" dcsTags={props.dcsTags} />
      <Anchor43 /><DCSBalloon balloonId="bal9" display="inline" dcsTags={props.dcsTags} />
	  
	  <Anchor44 /><DCSBalloon balloonId="bal10" display="inline" dcsTags={props.dcsTags} />
      <Anchor45 /><DCSBalloon balloonId="bal10" display="inline" dcsTags={props.dcsTags} />
      <Anchor46 /><DCSBalloon balloonId="bal10" display="inline" dcsTags={props.dcsTags} />
	  <Anchor47 /><DCSBalloon balloonId="bal10" display="inline" dcsTags={props.dcsTags} />
      <Anchor48 /><DCSBalloon balloonId="bal10" display="inline" dcsTags={props.dcsTags} />
      <Anchor49 /><DCSBalloon balloonId="bal10" display="inline" dcsTags={props.dcsTags} />
	  <Anchor50 /><DCSBalloon balloonId="bal10" display="inline" dcsTags={props.dcsTags} />
	  <Anchor51 /><DCSBalloon balloonId="bal10" display="inline" dcsTags={props.dcsTags} />
      <Anchor52 /><DCSBalloon balloonId="bal10" display="inline" dcsTags={props.dcsTags} />
	  
      <Anchor53 /><DCSBalloon balloonId="bal11" display="inline" dcsTags={props.dcsTags} />
	  <Anchor54 /><DCSBalloon balloonId="bal11" display="inline" dcsTags={props.dcsTags} />
      <Anchor55 /><DCSBalloon balloonId="bal11" display="inline" dcsTags={props.dcsTags} />
      <Anchor56 /><DCSBalloon balloonId="bal11" display="inline" dcsTags={props.dcsTags} />
	  <Anchor57 /><DCSBalloon balloonId="bal11" display="inline" dcsTags={props.dcsTags} />
      <Anchor58 /><DCSBalloon balloonId="bal11" display="inline" dcsTags={props.dcsTags} />
      <Anchor59 /><DCSBalloon balloonId="bal11" display="inline" dcsTags={props.dcsTags} />
	  <Anchor60 /><DCSBalloon balloonId="bal11" display="inline" dcsTags={props.dcsTags} />
	  <Anchor61 /><DCSBalloon balloonId="bal11" display="inline" dcsTags={props.dcsTags} />
      
	  <Anchor62 /><DCSBalloon balloonId="bal12" display="inline" dcsTags={props.dcsTags} />
      <Anchor63 /><DCSBalloon balloonId="bal12" display="inline" dcsTags={props.dcsTags} />
	  <Anchor64 /><DCSBalloon balloonId="bal12" display="inline" dcsTags={props.dcsTags} />
      <Anchor65 /><DCSBalloon balloonId="bal12" display="inline" dcsTags={props.dcsTags} />
      <Anchor66 /><DCSBalloon balloonId="bal12" display="inline" dcsTags={props.dcsTags} />
	  
	  <Anchor67 /><DCSBalloon balloonId="bal13" display="inline" dcsTags={props.dcsTags} />
      <Anchor68 /><DCSBalloon balloonId="bal13" display="inline" dcsTags={props.dcsTags} />
      <Anchor69 /><DCSBalloon balloonId="bal13" display="inline" dcsTags={props.dcsTags} />
	  <Anchor70 /><DCSBalloon balloonId="bal13" display="inline" dcsTags={props.dcsTags} />
	  <Anchor71 /><DCSBalloon balloonId="bal13" display="inline" dcsTags={props.dcsTags} />
      
	  <Anchor72 /><DCSBalloon balloonId="bal14" display="inline" dcsTags={props.dcsTags} />
      <Anchor73 /><DCSBalloon balloonId="bal14" display="inline" dcsTags={props.dcsTags} />
	  <Anchor74 /><DCSBalloon balloonId="bal14" display="inline" dcsTags={props.dcsTags} />
      <Anchor75 /><DCSBalloon balloonId="bal14" display="inline" dcsTags={props.dcsTags} />
      <Anchor76 /><DCSBalloon balloonId="bal14" display="inline" dcsTags={props.dcsTags} />
	  
	  <Anchor77 /><DCSBalloon balloonId="bal15" display="inline" dcsTags={props.dcsTags} />
      <Anchor78 /><DCSBalloon balloonId="bal16" display="inline" dcsTags={props.dcsTags} />
      <Anchor79 /><DCSBalloon balloonId="bal17" display="inline" dcsTags={props.dcsTags} />
	  <Anchor80 /><DCSBalloon balloonId="bal18" display="inline" dcsTags={props.dcsTags} />
    </Container>


  );
};

export default index;
