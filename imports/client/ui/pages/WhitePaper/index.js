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
       <h2 className='Title' style={{textAlign: 'center'}}>Welcome to the 1st Draft!</h2>
 </React.Fragment>
 )


const Contents = () => (
   <React.Fragment>
       <h2 className='title' style={{textAlign: 'center'}}>Public Happiness Movement<br />Token Whitepaper</h2>
       <div className="contentspage">
            
<p> 
i. Foreword <br />
ii. Intro<br />
iii. Contents<br />
iv. <a href="#The World Needs This Because: (v1)">The World Needs This Because: (v1)</a><br />
v. <a href="#The World Needs This Because: (v2)">The World Needs This Because: (v1)</a><br />
<br />
1. <a href="#Abstract">Abstract</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	1.1. <a href="#Background">Background</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	1.2. <a href="#Public Happiness Token Introduction">Public Happiness Token Introduction</a><br />
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
4. <a href="#The Public Happiness Token">The Public Happiness Token</a><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	4.1. <a href="#Token Overview">Token Overview</a><br />
<br />
5. <a href="#Public Happiness Token ICO">Public Happiness Token ICO</a><br />
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
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.1. <a href="#The Public Happiness Map">The Public Happiness Map</a> (public actions for increasing human and society well-being)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	7.2. <a href="#Action Center">Action Center</a> (microvolunteering)<br />
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
  

const markdownSection103 = md.render(`

**Foreword:**
I've lived about as frugal a life as is possible in the Western World because I've always disliked money.  It so often seems to have a negative effect on people and society.

The crypto-world has me intensely curious, because money can be different there. I wanted to learn more and see if it's possible to design a form of money that is intrinsically tied to creating societal value.  Something to act as a band-aid on today’s ‘profit at all costs’ capitalism which has blind-spots for large areas critical to producing healthy, happy societies. This is caused by foundations measuring all progress and success as an increase in GDP. Anything which doesn’t is, by design, an after-thought.

GDP was designed by Simon Kuznets, in 1937 as a temporary post war recovery system, but the beast got out of control. The damage caused to humanity by basing our decision making processes on measurements of GDP isn’t even contentious anymore. [Here’s a list](http://ec.europa.eu/environment/beyond_gdp/key_quotes_en.html) of global and economic leaders stating the need to move past it.

This token is an effort to create a new monetary and economic system. One which focuses energy onto these essential societal areas which are currently overlooked. An effort to create a healthier and happier world.


**Intro:**
If the right people get behind this it will have a profound effect on increasing peace, happiness, and reducing human-suffering across the world. If you’re reading this it because we believe that you have the skills to contribute, and a passion to create positive change for humanity.

*'Those who love peace must learn to organize as effectively as those who love war'*  - Martin Luther King


Our community of volunteers has been gradually building a platform to host this vision for over 3 years now. The platform is for groups from around the world, anyone who is using positive actions to promote peace and wellbeing through building human and community connection. 

It's provides a space for our individual networks to grow into something larger. A global movement for a world with more peace and happiness in it. We’ve reached the point where it is ready to begin hosting communities who will contribute to it governance and improving the platform. You can take a look here: [focallocal.org ](https://focallocal.org)

Note: This white paper is quite long. The most effective way to contribute is by reading the intro and why ‘the world needs this’, and then clicking the sections in the contents page which you’d most like to contribute to. To discuss a section and make suggestions, click on the red balloons underneath each section.

`)


const markdownSection100 = md.render(`

[Version 1 - please discuss which version is best]

1. Our ‘profit at all cost’ GDP based economy has failed to provide healthy communities to live in, and it has damaged our planet. It has borrowed from its children's wealth, creating nations where entire generations are largely unable to own a home. It has created a work/life balance where people are living under so much pressure that they push back basic human norms, like starting a family, because it's too expensive. 

   We aim to provide a balancing effect. Creating a new economic system where people are rewarded for doing the essential work needed to produce healthy and happy communities for us all to enjoy.
---
2. Decentralised Governance in blockchain suffers because players can utilise fiat to buy influence over the ecosystem’s direction and decision making; or centralised founders hold onto power. Undermining the decentralised goals they were founded upon.

   We create reputation weighted governance earned through contributions to the ecosystem’s mission; also opening our governance model up to people outside of the fin-tech community
---
3. Volunteers by nature normally contribute a little, then move on. Leaving most volunteer projects constantly training new team members, at the heavy expense of efficiency. 

   We incentivise and increasingly reward long-term commitment. Creating micro-volunteering towards good causes, with the efficiency of the for-profit world. Platform users are rewarded for taking positive actions which benefit our local, and global societies. Supercharging the network effect of the Public Happiness Movement and its impact locally, and globally. Rapidly growing the community through an incentivised ecosystem, directing energy into finding more effective ways to achieve positive societal and cultural change, ideas that we can’t even imagine yet – but can’t wait to see!
---
4. Those with beautiful and inspirational ideas for creating a change to benefit humanity lose far, far too much energy chasing funding so they can bring it to the world. Far too many ingenious ideas currently falter and fade out at the bitter expense of every human alive, because someone lacked the skills and connections to fund bringing their vision to life. 

   Our community debates the merits of ideas, shaping and strengthening them. The best are selected by voting to be funded and built in our micro-volunteering hub by our wider community, allowing a great idea to thrive, regardless of the experience, wealth and connections of the person who thought of it.
---
5. Social media gave humanity a new power. It became a place where ideas could emerge from the crowd, take form and gain a following, in ways never before possible. Where creative ideas and solutions could emerge freely, gaining traction on their own merit, and grow into large scale social events and projects. Then, gradually, they took this tool away. Making it ever more difficult for those ideas to reach an audience unless there was money behind them. Business, celebrity and big charities began dominating reach in a 'pay to play' system. 

   Led by Facebook a ‘click and move-on’ culture was designed. Educating much of the world's population to ever-shorter attention spans, as faster clicks equals more ad revenue. Grass-roots change creators struggled to engage the communities they had built. Then Facebook, and others, began listening to our conversations online, and offline. Collecting our location data. Extrapolating and creating immense data sets of our most personal information to sell to the highest bidder. They used this to facilitate election hacking, undermining our democracies.

   Enough is enough! Our platform returns this power to everyone, regardless of their financial backing. It brings back that ability for social movements to form freely around innovative ideas for change. It pushes back against this consumer culture, re-educating users to become active in the projects and activities they want to support. Empowering us all to realise the power we all have when uniting in mass around creative ideas for positive change. Our platform is 100% open source and will never sell users valuable personal data.
---
6. There is an entire emerging industry, hidden and stifled. Rarely picked up by the media, because these not-for-profit projects can't afford to ‘pay-to-play’. Yet individually it's leaders are mobilising hundreds of thousands of people each year into action to meet society's need for increasing peace, community and human connection, understanding, kindness, and well-being. None of those things are recognised, or measured in capitalist, GDP, based societies; and so it goes under the radar. It's leaders living in poverty in order to try and meet society's unmet needs - it's rising stars are often faced with a choice of eating or quitting. This platform creates a ‘Happiness Economy’ rewarding anyone creating societal value, and benefiting our lives in unconventional, non-profit ways. 

   This platform allows this stifled, emerging economy to spread out its wings and take off. Opening the door for thousands, perhaps millions, to become active in improving societal well-being where they live. An economy open to anyone, not just the most stubborn who are driven to a calling regardless of the personal costs.
---
7. The emerging Public Happiness Movement is fragmented. The people and communities aiming to bring around a local, or global shift in culture towards more peace, connection and well-being, mostly do so independently of each other. Each pushing in the same direction, to create the same changes.

   This platform combines and focuses each community's energy. Magnifying massively our combined message, amplifying our media, and reaching/inspiring a far larger audience. This platform allows that energy to stack and multiply, unleashing an unstoppable wave, as a global Movement bringing; kindness, understanding, individual and community empowerment to solve the issues we face, and human connection. Collaborations and information sharing also becomes easier, and individual dreams become a shared goal that we can reach together.
---
8. Tokenizing massively accelerates the effects of a network. Happiness is a great candidate for the boost a crypto-economic model can provide. 

   Tokenizing will rapidly advance the effect on global public happiness and well-being of everyone aligned with, and taking action towards, our Public Happiness Movement’s aims.
---
9. The Blockchain revolution is coming, but it remains inaccessible to the vast majority of the public. Those engaging in this new technology rarely come from outside the fin-tech, or investor/speculator sectors. It is boxed off by the technical skills and interest needed to understand it. It's a revolution that is only scratching the surface. 

   Our Token and Platform take Blockchain onto the streets to engage and interact with people in their everyday life, all across the world. It provides a gentle on-ramp to understand the world of Blockchain and Cryptocurrency requiring no special technical skills at all in the beginning. It is a desperately needed bridge to open the Blockchain community up to the wider world and begin teaching how it can impact their lives, and will shape our future.
---
10. Greedy founders are enriching themselves massively through ICO's, before, and unfortunately regularly, in place of, actually building a useful project. Whales coming in early often own significant percentages of their total tokens.

    Our project is a non-profit with our core team's reimbursement decided by outside adjudication firm. It is against our user terms for anyone to own more than 0.5% of our total released tokens, and if an individual is discovered to have done so they will be advised to sell part, or lose it. In a decentralised economy no-one individual should own more than that amount. There will be no pre-sale to angel investors
---
11. In a time and age where climate change is our 'cold war', with over 60% of our planets wildlife lost since 1970, we are facing down the barrel of potentially cataclysmic times. That certain Cryptocurrencies use more energy in mining than entire medium sized nations, is perhaps the biggest issue the industry faces. A global explosion in the industry would be damaging, perhaps even devastating to the world we live in, leading to heavy and needed regulation on the industry. This critical issue must be solved before that inevitable growth occurs.

    Our Token is pre-mined and then gradually released to create liquidity. The platform will be moved onto the DAPPS network when it scales, not requiring servers. Our proof-of-work is a conceptual construct which users perform mostly in the real world, rather than by performing power hungry mathematical problems on their computers/mining rigs. The Token is built upon Ethereum and will benefit from the upcoming change to Proof of Stake. Our project and token is designed to consume less power than most standard website of similar scale.
---
12. Dangerous messages are being amplified on other media platforms, and used to divide communities for political aims, or to increase profits. Important movements for equality and respect for our shared human experience are being diverted and used to attack each other and drive a wedge in our communities. Misinformation is everywhere. Volume has come to be seen as equal to expertise by far too many people.

    We create an energetic space where all activities focus on what unites us as human beings, and are rooted in the peer reviewed science to direct action by the best of current human understanding.
---
13. Many high profile projects and platforms, with multi-billion dollar market caps, average utterly embarrassing numbers of users daily, weekly, or monthly. It's like a dirty secret we aren't supposed to talk about.

    The platform you are here to read about onboards existing communities of hundreds of thousands of people, offering them far more effective tools than they use currently to pursue their existing positive missions. It also offers them shared ownership, and a stake in determining the future development of those tools.
---


This paper is an early non-technical outline of how this can be realised, to provide a foundation for discussion. The platform also already exists, built by a team of over 130 volunteer web developers who believe in our vision. It is built to the minimal stage to begin onboarding the community who will shape it.

If you've been invited to read this, and agree with what I've written so far, then I invite you you to become a partner, or advisor, and to help shape what follows into a polished white paper ready for the rest of the world to see. 


Welcome into my dream of a brighter future. I hope it will find a way to become a part of your dream for the future. Then our dream will become reality for millions.

Founder, Andy Tulett
Public Happiness Creator


`)

				   
const markdownSection101 = md.render(`
 
 
 
**A New Cryptocurrency Intrinsically tied to Creating Societal Good**
Public Happiness Token is a currency which is intrinsically tied to creating social good. The more its traded, mined and earned, the more our network benefits local communities around the world, building a friendlier, safer and happier future. 


**Problems the Public Happiness Token Aims to Solve:**

---
Positive Societal and Cultural Change:
Supercharging the network effect of the Public Happiness Movement. Rapidly growing the community through an incentivised ecosystem, directing energy into finding more effective ways to achieve positive societal and cultural change, ideas that we can’t even imagine yet – but can’t wait to see! 
---
Currencies benefiting Communities:
Cryptocurrencies give us the ability to choose to use/support a currency because we agree with its ethical value and effects on society. Public Happiness Token aims to demonstrate this to the public by creating an alternative currency with its value distinctly and inseparably tied to positive impacts towards a healthier society where its used and mined.
---
Human Well-being:
Our crypto-enhanced ecosystem directs energy and creativity onto solving issues critical to a healthy local and global society, incentivising action on issues that reduce human well-being which are largely overlooked by today’s GDP based societies.
---
Distribution: 
Our Public Happiness activities and projects get people onto the streets reaching people in their daily life and engaging a much wider and more diversified audience into the world of blockchain. Our token is a big step forwards in mass-adoption outside of the current crypto markets. 
---
Educating the Public: 
We demonstrate how cryptocurrencies can impact people’s daily lives and communities in a positive way, and teach them how they can engage with it. Using our network and platform we will lead new users on a journey of discovery, culminating in a greater understanding of the world of blockchain and decentralisation.
---
Decentralised Governance:
Our platform creates a decentralised self-governing and evolving community focused on positive cultural change. Grandfathering in a reputation weighted community voting system and gradually opening up all areas of the project to decentralised governance, while maintaining a clear direction by guiding members to weigh all decisions against a [Community Values ](https://news.focallocal.org/the-focallocal-community-values/)statement which all users agree to upon joining the community.
&nbsp;
Our ecosystem and mission rewards positive behaviour towards each other and society with a higher influence on voting, ensuring a governance culture rooted in that positivity which is resistant to attempts to subvert the token and original mission; as has befallen other decentralised projects.
---
Super-Charged Network Effect:
Tokenizing massively accelerates the effects of a network. Happiness is a great candidate for the boost a crypto-economic model can provide. Tokenizing will rapidly advance our Movement’s effect on global public happiness and well-being.
---
An Evolving Platform:
The platform is being built to a minimum usable product. After that users will direct and build the platform they need to maximise their effectiveness. Voting on the best plans to improve it.
---
Culture and Foundations laid by Top Experts:
Our ICO will be used to fund top-level staff to bring their skills in and lead the platforms 1st users. Facilitating a smooth growth, until the community is mature enough to self-govern.
---
Reaching New Audiences:
Teaching users core concepts of the crypto-economic model, our token can operate as a bridge between blockchain and other parts of the non-digital world, through its ability to reach a far broader, and less tech-savvy audience than other coins and tokens.
---
Wider Acceptance of Blockchain:
Our platform aims to educate users as to how blockchain will change the world they live in, and how they can understand and interact with it. Attracting a wider community and an ecosystem to create positive societal change we can't even imagine yet.
---

The paper below is a working first draft. Intended to explain the direction and ethos of the Public Happiness Token to the experts joining the project to apply expertise from their specialist area and create a Whitepaper ready for public release. It is currently word heavy and technical expertise light, you’re here to improve that.

`)				   
				   

const markdownSection1 = md.render(`

`)

const markdownSection2 = md.render(`

## 1.1.

**Background**
Today’s society is based on GDP, with almost every political decision weighed against this to see if it should go ahead. The founder of GDP, Simon Kuznets campaigned against its use as a primary tool, arguing that it was never intended to be the base our societies were built upon. He designed GDP in 1937 solely for the post war recovery and believed it was entirely unsuitable as the main measure of societal success/well-being because it undervalued and ignored large areas that are critical to a healthy, functioning society. 

*‘the welfare of a nation can scarcely be inferred from a measurement of national income as defined by the GDP’* - Simon Kuznets

The Charity model exists largely to paper over these cracks, but has rarely been able to fully resolve a serious societal issue. That is because the fuel causing these issues is that our societies use GDP as their primary measure of success, and solving these issues rarely produces a direct GDP increase. Consider the issue of homelessness, where a vast amounts of money have been donated to charities doing excellent work supporting those who are homeless... yet people are still living on the streets in every major city in the World. GDP has a painfully obvious blind spot here which the charity model is unable to resolve. Our nations are getting ever more wealthy and yet people still regularly freeze to death on the streets.

Crypto-economics is the golden opportunity to redress these economic imbalances and blind-spots. Preventing the hurt and misery they’ve caused to so many humans, all across the world from continuing.  

The Public Happiness Token aims to be a pillar in beginning that essential re-balance, by incentivizing action. both globally, and locally. To identify to resolve these critical and overlooked areas essential to a healthy society – and by doing so from the people, upwards. Totally bypassing slow-moving, and too often corrupt governmental process.

*‘We need to move beyond Gross Domestic Product (GDP) as our main measure of progress and fashion a sustainable development index that puts people first’* - Ban Ki Moon, at the time UN Secretary General

You can read more about [the token background here](https://news.focallocal.org/token-background/)
				   
`)

const markdownSection3  = md.render(` 

## 1.2.

**Public Happiness Token: Introduction**
Public Happiness Token is an ERC20 Token created from Ethereum blockchain. The Token itself will have few modifications, with its value to society, and for trading, coming from its unique use in engaging users in activities and projects to create a happier, safer and friendlier society for their local community.

All Public Action is organised via our platform focallocal.org and app. Our web-based platform has been built entirely by volunteers who support the vision and is already operational in Beta, early-launch stage. 

Integration of an ERC20 Token into the platform will fuel a rapidly growing community, using the platform and ecosystem to create projects and activities to bring positive change into the world that we can’t even imagine yet!

The Public Happiness Token can be ‘mined’ by using our platform to take action on local societal issues to create greater well-being nearby. Action which occurs in the real world, is tracked through hash-tagging photos and videos on social media, and via feedback from other users. 

The Token is also mined by taking actions essential to the smooth functioning, and growth of the platform, crypto-economic network, and community (for example, bounty hunting for people trying to game the system, or by completing micro-volunteering tasks to build projects).

Founder Andy has always built the Public Happiness Movement Public Happiness project based upon people rather than money, because of the negative effect its presence and pressures often have on people, and societies. Choosing to live an extremely frugal lifestyle in order to focus full-time on Public Happiness; living in a van and working side jobs where needed to support it rather than applying for funding or running crowd-funders. The Focallocal Community was built and maintained for 7 years almost entirely on the concept of avoiding money wherever possible. 

Blockchain creates a new and intriguing possibility to super-charge our positive impact by creating a currency which is intrinsically linked to creating individual, and societal well-being; bringing more peace and happiness to the world each and every time it is used. Public Happiness Token aims to be that currency.


*Disclaimer: Please note that this white paper does not create any legally binding obligations, it is presented here purely for informational purposes. For more information please read our terms of use*

[link for terms of use coming soon]

`)

const markdownSection4  = md.render(`

`)

const markdownSection5  = md.render(` 

## 2.1. 

**Issues we aim to solve**
1. Apathy towards issues troubling our society

2. Empowering individuals through education on how powerful we can all can be in creating change when uniting together around a creative and effective plan

3. Exploring and sharing the most innovative and effective ideas to create progressive societal change from across the world and incentivising people to recreate them where they live

4. Giving everyone an opportunity to use their time, passion and know-how to create a better world, through globally coordinated localised action

`)

const markdownSection6  = md.render(`

## 2.2.

**Primary Goal**
We live under a system which rewards actions which advance our society’s economic output, but largely ignores our societal well-being outside of that narrow spectrum. It increasingly pressurises humanity to focus on what advances GDP, leaving important work in the community for charities, and councils to try and patch over. 

We strongly believe that societal, and individual well-being should be treated as an equal, or even higher priority in our global society than economic. Public Happiness Token’s main goal is to provide people with an incentive to unite and work together in making their local community a happier, safer and friendlier place by tackling social issues that reduce well-being like homelessness, loneliness, crime rates, isolation, etc. 

`)

const markdownSection7  = md.render(` 

## 2.3.

**Secondary Goal**
This project also aims to empower ordinary, people regardless of their technological ability, to become fluent in cryptocurrency transactions, smart contracts and distributed ledger technology. Through their interactions with our platform and the Public Happiness Token they will gain an entry point of understanding of blockchain, the potential uses for blockchain technology, and its ability to transform society and the world they live in by building a world where creating social good is as important as manufacturing or banking. Their understanding of the fiat currencies they use daily will also be forever changed.

`)

const markdownSection8 = md.render(`

## 2.4.

**Relation to Universal Basic Income**
Universal Basic Income is another concept which has the potential to create societies where many people use their increased freedom to focus on and tackle societal issues. 
It's a sad situation when people want to do things to make their local community a better place to live, but feel too busy or too stressed about work. A situation Universal Basic Income has the potential to solve, yet UBI faces many hurdles to become accepted policy in all nations. It is likely to be a long and bumpy road and its implementation is likely to differ widely. Public Happiness Token can be considered as a step on the same path, and one which compliments UBI beautifully by incentivizing those living in societies who adopt it to utilize some of that increased freedom to focus on improving life where they live, and the human condition.

`)

const markdownSection9 = md.render(` 

`)

const markdownSection10 = md.render(` 

## 3.1. 

**Current State of Public Understanding**
The general public’s current understanding of cryptocurrency is overwhelmingly narrow. Most have heard of Bitcoin and understand it’s something like an alternative currency to Fiat. The narrative pushed by the news is rarely about the multitude of exciting technologies being built upon blockchain and smart contracts, or the ethos of decentralisation which crypto-economics was founded upon. which will shape the future of our society.  They might have heard something about a hack, Ethereum, or perhaps something about some cyber-kitties ..most people simply don’t really understand what all the fuss is about as it’s not a recognisable part of their world yet.

`)

const markdownSection11 = md.render(` 

## 3.2.

**Reaching a New Audience**
Public Happiness Token reaches an entirely new audience, as well as taking our token onto the streets to interact with the wider public and positively impact their daily lives. We aim to use this as an opportunity to introduce more people, across all different areas of society to an understanding of the basics of blockchain technology, that it has real world uses, and how it can impact the world they live in.

We intend to offer:

* An open platform which guides users on a journey from absolute beginners, to workable understanding of blockchain technology and how to interact with it.

* The opportunity to earn (mine), own, trade and understand our token and crypto-economic network.

* Introducing people to the idea that they can now choose alternatives to Fiat currencies (£,$,E) to support by adopting and using – demonstrated through the ability to use a currency which is intrinsically linked to creating societal good, Public Happiness Token.

* Guiding users to create a wallet, transfer tokens to an exchange, and trade for fiat or other cryptocurrencies. Teaching users good practices for cold storage

* Teaching users to spot scam tokens and those which run against the principles of decentralisation


Our team firmly believes the future of our society will be built on the blockchain. Right now public perception and understanding is extremely limited outside of a narrow tech-minded segment. Public Happiness Token aims to take a highly visibility and engaging token out onto the streets all across the world, reaching the lives of the general public with blockchain technology in a way that has never been done before.

Users of our platform’s 1st step to owning a cryptocurrency will via the world they already understand - public events, project building and social media - rather than purchasing on an exchange, which is difficult for those with less interest in tech or financial markets. We will then guide them to a more complete understanding.

`)

const markdownSection12 = md.render(` `)

const markdownSection13 = md.render(`

## 4.1.

**Token Overview**
7.6 Billion Public Happiness Tokens will be created as a new ERC20 token from the Ethereum Blockchain, this amount is fixed and will never change. In theory every human alive could hold one each. It's a nice thought anyway, and signals our intention of being decentralised and taking every effort to avoid whales owning large percentages of our token

People new to blockchain can find the numbers of decimal places a challenge to grasp initially. Starting with a high number of tokens and low decimal limit of 4, we will make that 1st step a little easier for newcomers, whilst still taking a small step from the standard two decimal integer of Fiat currencies.


Public Happiness Token is given value through its initial ICO, later trading of the token on stock exchanges, and the ability to use it in place of Fiat currencies in the real world (either through creating partnerships with businesses, or guiding users onto token switching payments solutions)

‘Mining’ Public Happiness Token is a process of earning it through agreed behaviours which increase happiness and well-being in the users local community, coordinating collaborative global efforts at local level change, or performing tasks essential to running and building our ecosystem.

This mining process means that the currency is naturally deflationary as set amounts are automatically released from our treasury. Initially we anticipate this deflation to be offset by a rapidly increasing value due to a low starting market cap, and later the number of tokens owned will probably make this deflationary force negligible.

Mining is built on real world action, creating a soft upper limit on how much can realistically be earned. This is designed in a way that minimises the risk of token centralisation. 

Our token is immutable, and will create a permanent record of the effort everyone has put into improve life in their local community.

`)

const markdownSection14 = md.render(` `)

const markdownSection15 = md.render(` 

## 5.1.

**ICO Strategy**
To raise funds to build/improve our network a portion of tokens will be sold off in an initial coin offering.

Many tokens limit their early sales to a small group of large investors, creating centralised tokens which are easily, and often manipulated by their wealthy ‘whale’ investors to game the system and increase their wealth, this also leads to a centralised collection of the wealth, something fundamentally against the ethos blockchain technology was founded upon. 

ICO’s have also become a hotbed for scams, junk tokens, and projects that have no need to be on blockchain at all. To avoid being in that category and to create a token which is widely and evenly distributed amongst both those engaged in crypto, and new people who haven’t yet engaged in the blockchain revolution, we will hold an ICO spread across three stages, limiting initial investments allowed per person and using platforms easily accessible to a wide audience, regardless of previous exposure to cryptocurrencies.

There will be no pre-sale to big time investors. Guaranteed opportunities for everyone to get involved, and every possible effort made to prevent whales from eating up large amounts of our token and undermining the decentralised mission of this project.

`)

const markdownSection16 = md.render(` 

## 5.2.

**ICO Stages**
Stage 1: 
Investors will have 30 days to register an Ethereum address. Once the ICO opens a preset number of tokens will be released. registered investors will be capped initially at 2 ETH that can be invested in the first 24 hours. This way, everyone that registers has 24 hours to get in, and the token should from the beginning, be decentralised among a wide crowd rather than being owned by a few big whales. 

Stage 2: 
This stage will be held on a crowdfunding website to reach those who don’t understand how to join in a traditional ICO. Investors will be rewarded set amounts for donating at increasing intervals. The top threshold of reward for donations will be set at 2 ETH per user. Users may choose to invest more to support the project, but will not receive more tokens than stated.

Stage 3: 
Midway through the crowd funder the top limit will be raised to 5 ETH, and the traditional ICO will be reopened for a second round with a limit of 10 ETH, users may invest up to the respective limit on all of the platforms concurrently

Email addresses will not be collected to prevent issues as seen in the Bee Token phishing scams during their ill-fated ICO

`)

const markdownSection17 = md.render(` 

## 5.3. 

**Ongoing Funding for Specific Projects and Experts**
Initially specialists will be employed to lead development in each area. As the community matures the allocation of funds will be opened up fully to decentralised voting on allocation. Users subscribed to the funding allocation channel will engage in discussion and voting around how to distribute funds released from our vault between issues like: 

* specific projects

* platform improvements

* experts to resolve an issue facing the community

* buying back tokens to increase their value


Reimbursements:

Team members/tasks reimbursement levels will be determined by a project finance specialist at the 1st stage of the decentralisation process - this means that the early community and specialists building it aren’t able to vote to give themselves a larger share of the token, as happened recently with the EOS community. This kind of selfish grabbing of resources by the initial team members undermines the decentralised nature, and ability to build a reputation of trust, for any blockchain community.

`)

const markdownSection18 = md.render(`

## 5.4. 
**ICO Marketing**

Crowd-funding:
The ICO will also be launched via a popular crowdfunding website, where those donating more than certain set amounts will receive a listed amount of Public Happiness Tokens as a reward. This makes our ICO more accessible than others before, to those with little understanding of Blockchain/Cryptocurrency, by using a format they are more likely to be familiar with.

Those who purchase Tokens via crowdfunding will receive instructions in how to create a crypto wallet account and guide to storing their Public Happiness Movement ERC20 tokens – Likely the 1st steps into understanding how to interact with blockchain for many.



Gifting Public Happiness Token:
Part of the ICO marketing (and ongoing marketing afterwards) will have a focus on ‘gifting’ the token to friends and relatives. Accomplished by entering their email and a message for them when purchasing. This gifting may also be made possible over popular social media platforms. 

Most people have now heard something about Cryptocurrencies, and are curious. By offering those donating the option to gift a token which benefits issues the receiver sees in their local community, we have introduced a simple way to tap into that curiosity.

Public Happiness Partners:
Existing groups who are taking action for more peace and happiness in this world, in a manner currently neglected by today's economic system; and whose actions align with our [Community Values](https://news.focallocal.org/the-focallocal-community-values/), will be invited to use our ecosystem to supercharge their network effect. Drawing more members in to join their activities. Expanding the reach of their message and media through our enhanced tools. Offering more effective methods to coordinate their followers and community into desired actions on our platform. 

They will now be rewarded financially for their continued efforts to improve human and societal well-being when it is in part, coordinated via our platform. This reward will also be selectively backdated, based upon numbers engaged in their activities and media over the past ten years. Rewarding those whose labours have made a consistent positive impact to society, and others lives, without any economic recognition for their great works. This backdated reward is not dependent upon joining our platform, but should increase onboarding by showing casing the benefits of tokenizing to create a new ‘Happiness Economy’. 

`)

const markdownSection19 = md.render(` `)

const markdownSection20 = md.render(`

## 6.1.

**Community Background**
Founder Andy worked for the past 7 years building and running a non-profit volunteer community aiming to change the world by bringing people together to give their time voluntarily to solve global issues, on a local scale. Theorising that in many situations charities are massively limited in scale, and an unstoppable wave of change could be created if it became a normal habit to give a few hours a week on resolving issues in our local communities, using the most effective ideas collected from other users around the world (local action for global change).  Creating a proactive and empowered global community who want to meet and adapt these projects to fit their culture and then replicate them to target change to societal issues like homelessness, isolation, human connection, etc,  

The past 7 years felt like swimming upstream. Many amazing people came in and did fabulous altruistic work, most were shortly pulled away by other commitments and general modern life pressures preventing momentum from really building - especially in London, the founding city. The struggle was against a world where good intentions are in constant strife against heavy pressure on our free time. 

Blockchain is a chance to incentivise that action, allowing the modern world to refocus their attention on local issues important to a healthy society, which have been marginalised under our constantly pressured, GDP based societies. Modern technology also allows us to share effective ideas in a far more intelligent way than ever before, and achieve a much greater impact than previously possible.

`)

const markdownSection21 = md.render(`

## 6.2. 

**The Focallocal Community**
Set up as a non-profit ‘charitable organisation’ in the UK, the Focallocal Community has been established since 2012. It is an open volunteer community for people wanting to take action and make the world they live in a happier, safer and friendlier place through creating public happiness activities and projects, which reach out a friendly hand to the wider community, and target issues which harm public well-being; like, homelessness, poverty, isolation. 

The community is built on the motto ‘Local Action for Global Change’ due to the core belief that local people coming together and targeting a societal issue using creative and positive ideas collected from around the world, are far more effective in most situations than outsiders coming and making change for them. They can adapt ideas to fit the local culture, while teaching people how to come together and ‘do it ourselves’ empowers us all to understand that it is the local community is ours, and together we have the power to shape it into the place we dream of living in.

Actions are always based on positivity. There are times in the world when anger and forceful action is necessary. They are fortunately rare, while action based around a clear goal, plan and built upon positivity often becomes irrepressible. Like 'Gay Pride Parades’. Action that is adaptive, agreeable, and incites more people to follow it can become impossible to argue against like swimming against a river, with nothing to grab onto. Eventually there is no other option than to give up and go with the flow.

The Public Happiness Movement was created because Facebook, and other social media platforms, made it increasingly difficult for groups engaged in trying to incite positive action for positive societal change. Maintain their efforts became ever more difficult and their reach minimised, as social media switched to a ‘pay to play’ model. This is the perfect time, and opportunity, to unite everyone working for a positive cultural shift to a society based on well-being and peace - offering. For a global movement to occur a new platform is needed, where enhanced tools and a powerful ecosystem is used to combine and magnify their message for a brighter future. 

The Focallocal Community built this ‘Public Happiness Movement’ platform and is offering it to all other groups with a shared/similar mission.

`)

const markdownSection22 = md.render(` 

The Public Happiness Movement platform currently exists as a website located at https://focallocal.org. If you’ve visited it you’ve probably noticed it is currently a highly fragmented site/platform. This is intentional, the platform has been built as a ‘minimal functional platform’ capable of supporting a community who will transform it into an effective  decentralised Public Happiness platform. who will use the tools available to redesign and reshape the platform to better fit their collective needs.

Focallocal.org, the platform, is also available as an iOS and Android app.

`)

const markdownSection23 = md.render(`

## 7.1.

[view live beta](https://focallocal.org/)
**The ‘Public Happiness Movement Map’**
An area of the platform to bring users together to connect and take our project and token to the streets. Users can create and join Public Happiness Gatherings from a list of pre-approved activities curated by the community; and contact other members nearby. Users can list themselves on the map (in an approximate location for privacy), and select all the public happiness activities they would like to be contacted for, creating a searchable map of people nearby who want to meet and take actions which bring more well-being into the world they live in.

The Map also allows users to explore approved suggestions for Public Happiness Gatherings, along with; 

* Details about the societal issue targeted

* Videos

* How to guides

* Photos of others around the world enjoying that activity

* Peer reviewed studies which support the impact that activity has on society

* Automated pre-generated descriptions of the activity/gathering being run. These partner the user created activity description and ensure that each explains how the societal issue is being targeted accurately

* Quick share buttons for creating events on other social media platforms to help build awareness, and draw more users into our ecosystem

* Leave ‘positive experience’ or ‘negative experience’ feedback on other users to offer protection from unwanted uses of the platform

Public Happiness Tokens will be distributed amongst those attending, sharing, and the organising Public Happiness Gatherings by the Token Distribution Matrix.

To receive tokens users are required to post their photos and videos to social media with the following hashtags:

#publichappiness #publichappinessmovement #publichappinesstoken #[name of gathering] #[location]. 

This can be considered ‘proof of work’. Their posts will be located autonomously and pulled into an easy to view list to be checked for suspicious behaviour by others in the ecosystem. Token awards are delayed by 2 weeks to allow time for checking. Abuse and fraud is monitored by bounty hunters within the community, and a list of all past hashtags found will be recorded with links to the content, to allow bounty hunters to review suspicious accounts/activity easily. 

`)

const markdownSection24 = md.render(`

## 7.2.

[view live beta](https://action.focallocal.org/)
**The Action Center**
An open micro-volunteering hub, and project management suite where complex projects are broken down into small tasks, or ‘Missions’ anyone can complete. Each ‘Mission’ should take a user between 30 mins and one hour, if longer is needed then it needs to be divided into smaller chunks.

Our system of breaking tasks into smaller parts removes one of the biggest problems faced by volunteer communities – well meaning people offering to complete large tasks and not following through, often leading projects to fail as others wait and wait, momentum is lost, and as frustration grows it leads to other volunteers giving up and dropping out also. 

In the Action Center users select a due date within the next two weeks when ‘accepting a mission’ (assigning themselves a task). If they miss that target the Mission returns to the ‘to do list’ for others to claim and complete preventing projects being held up by well meaning, but unreliable people as is common in traditional volunteering and Microvolunteering systems.

Tokens are distributed for completed tasks, with a two week delay so other users, and moderators can monitor for any abuse of the system.

The Action Center helps users to browse projects, see all the resources available for each, and either find ‘Missions’, or ‘Discuss’ the project with others users in our Discourse forum.

The number of currently active global projects is limited to focus attention onto the existing ones.

New ideas for Public Happiness projects can be submitted by any user, to be discussed, improved, and voted onto the platform for others users to join in and build.

Local projects are open for anyone to build/try out where they live, which may require gathering their own team early on.

`)

const markdownSection25 = md.render(` 

## 7.3.

[view live beta](https://news.focallocal.org/)
**Community News (or Happy News)**
A user generated ‘Community News’ online magazine. Open for all platform users to create their own articles or share video links. This incentives users to create, like and share content (articles, photos and videos), increasing reach and inspiring more people to join in the Movement. The user led and created media from around the world increases users sense of community, and being part of something bigger, a global Movement for positive change.

All articles submitted will be checked by experienced users who have earned a level of reputation to become moderators. Moderators will operate as copywriters with the ability to edit and improve the quality of content, guided by rules to balance quality with excess interference in content.

Moderators will mine tokens by approving content. Users will mine tokens either by sharing content, or creating it and receiving likes.

`)

const markdownSection26 = md.render(`

## 7.4. 

[view live beta](https://shop.focallocal.org/)
**The Active Happiness Shop**
An integrated Shopify store selling ‘Active Happiness Clothing’ which make a small positive change happen in the world around the wearer simply by putting the item on in the mornings. The clothing is an extension of our Public Happiness activities, with most items functioning as a passive way for each public happiness activity to occur outside of organised activities and gatherings. For example, a shirt informing others that the wearer is carrying bubbles, and inviting people around them to blow some.

Materials and Public Happiness Action Packs are also available. Profits will cover basic costs operational costs, with any excess made available for users to vote on how best to use it in aid of advancing our projects and community.

Currently hosted on shopify, this will be moved in-house shortly.

`)

const markdownSection27 = md.render(`

## 7.5.

**Who defines what is accepted as ‘Public Happiness?’**
The platform is pre-populated with projects, missions and pre-approved Public Happiness Activities. Users are invited to suggest their own ideas, or bring pre existing projects/activities. These will be discussed by other members in the forums to explore potential issues, and ways to strengthen the impact. Then reviewed by the community to make sure it aligns with our [Community Values](http://news.focallocal.org/the-focallocal-community-values/), before being voted on, using our reputation weighted community governance model, and then approved or not. This ensures the original vision is maintained, while providing space for members creativity and ability to shape their platform.

Effective ideas for positive action will be incorporated into the platform and recommended to other users as tools they can use for creating positive  social and cultural change where they live. 

`)

const markdownSection28 = md.render(`

## 7.6.

**Evidence Based and Peer Reviewed**
When users submit a new idea for a project or activity its recommended that they find peer reviewed studies to offer support for the benefits their idea will have on society. This promotes the core concept that all efforts to effect a positive cultural and societal change, should be rooted in the best current understanding of available evidence. Users will be guided to place where they are likely to find sources, as we want to build an informed and competent community. Those who are discussing and reviewing it for approval may add more sources. Part of our ecosystem will be ‘Research Bounty-Hunting’, where users are rewarded for finding new peer reviewed studies to add to already approved activities, or which lead to the removal of an outdated study. 

`)

const markdownSection29 = md.render(`

## 7.7.

**Who can Participate on the Platform**
The platform is open to anyone wanting to create well-being and happiness where they live, or support the Movement. 

Some users may choose to use it while travelling, as great way to meet positive local people. Users traveling are naturally guided towards ‘gathering’ with local people who understand the local customs and any adaptations necessary.

Pre-existing communities may wish to join the ecosystem to take advantage of the network effect, or be part of a wider community. This is discussed further in 7.8.

`)

const markdownSection30 = md.render(`

## 7.8.

**Pre-existing Communities with Similar Values**
Groups and communities already doing excellent work in creating Public Happiness and well-being projects/activities where they live, are all welcomed to use our platform and ecosystem to supercharge their positive impact on society.

They can create community pages, with tools for community building and engagement; and for guiding their members into actions which benefit their community and mission. For example, their own forum, the ability to contact their members (according to the users notification preferences) more effectively than existing community building platforms, or giving users tokens for sharing activities/created media on other social media platforms.


Their existing activities and projects will need to be submitted in the usual way, to be approved by other network users, and checked that they align with our communities ‘Core Values’ statement. 

Platform users can join groups to be informed about their activities and projects, and to be an active part of  contributing to their mission.

`)

const markdownSection31 = md.render(`

## 7.9.

**Languages**
The platform will launch in English. Adding other languages has been designed as a simple task anyone speaking the required language can complete in around 30 mins.

`)

const markdownSection32 = md.render(`

## 7.10.

**Decentralised Governance and Voting**
Each area and section of the platform will have a discussion forum linked where users can discuss improvements to the operations and design of their community and platform, creating a mass decentralised governance system.

Stage 1:
Users wanting to raise a vote on a platform or operational change can post in the attached form calling for a vote, and explaining the need. If their post receives likes from 20% of users subscribed to that thread who have been active in the past 6 months, then a vote on the proposed change takes place. The sections forum must have a minimum of 10 members subscribed, otherwise the proposer will need to encourage members to join it before suggesting a vote. (Figures will be updated as the systems norms and culture emerge).

Stage 2: 
Two threads are created in the section, and cross-posted into the forum’s voting section for community-wide visibility. One thread for arguments for, and one for arguments against the change. 

Stage 3:
Users are all welcome to comment their argument in the threads for and against, the threads will be ordered by likes received so the strongest arguments float to the top.

Stage 4:
After reading the topic users can vote on the topic ‘for’ or ‘against’ the change. If the ‘for’ topic receives more than 60% of votes, after weighting is applied, the change is agreed and will be implemented.



Protection from Brigading: 
Users votes are weighted based on the reputation they’ve built by contributing to our project, so those most closely aligned and invested to the vision laid out in the community values will have more influence on decision making as a counter to anyone seeking to manipulate voting. 

Users and the ecosystems bounty hunters are rewarded for finding any subversive coordination, while all votes are cross posted into a single voting channel where anything out if the ordinary can be spotted easily and brought to the attention of the wider community. 

For more information on security, see Chapter 8.

Lack of Understanding:
Users aren’t all expected to be experts on blockchain or community governance. They will naturally gravitate to areas of their interests and expertise, leading to more people with an understanding on a topic being subscribed to that section when a vote is called. This gives them the ‘first mover’ advantage to get informed arguments in to give a greater understanding to those joining in from the main voting category in the forum.
 
`)

const markdownSection33 = md.render(` `)

const markdownSection34 = md.render(`

## 8.1.

**Benevolent Dictatorship vs Complete Community Governance**
Primarily, we expect platform users/community members who rise to higher rankings through their actions to increase human and societal well-being, to be invested in the overall vision by the time they reach the upper levels. Their greater influence on decision making will lead the ecosystems culture, creating a force to protect the platform from abuse and actions which run against our Core Values. 

It would be poor planning not to also consider more 'attack' scenarios, and ways to mitigate the risks, while assessing how our platform, ecosystem, and community could be impacted. Then to use this information in deciding on how we best to weigh the ideological value of complete decentralisation, against the importance of introducing our members to the concepts of community governance in measured stages to ensure the integrity of the vision. 

`)

const markdownSection35 = md.render(` 

## 8.2.

**Example Scenario: Outside Collusion**
A significantly sized outside group infiltrate our platform, operating as model members, or pretending to and avoiding detection. Once reaching a high enough rank to influence a vote they collude to state that ‘watching tv and drinking beer’ meets with our Core Values and should be approved as a Public Happiness Activity.

Or more concerningly perhaps ‘Rallies supporting a religious hard-line political candidate’ meet the criteria.

`)

const markdownSection36 = md.render(`

## 8.3.

**Lines of Defence**
1st Line: 
The culture of a community built from members focused on creating ‘social good’ will lead those reaching a higher level to be benevolent with their increased influence.

2nd Line: 
Our ‘Bounty Hunting’ model incentivises users to monitor unusual behaviour patterns, and to find external groups coordinating action outside of the scrutiny of the wider community. Then to report it bringing it to everyone's attention. 

3rd Line: 
On-chain governance usually means influence can be bought. Instead a weighted governance model is created based on a users contributions to the mission and ecosystem. Thereby those most committed to the vision will become the ones with most influence in guiding it. Most of the platform and ecosystem will become open to redesign by community voting. 

Some aspects should be protected by the founding members to safeguard from potential attacks and degradation of the initial vision, for example; the Core Values can be influenced by a vote calling for an improvement, but not changed directly. The founders would need to give an extremely strong reason for resisting a popular change, or risk undermining the trust of their community.

4th Line: 
In our terms and conditions we’re making it banned for any one person to amass more than 0.5% of our token. It's not possible to reach that through activity on the platform, or investing during the ICO. Only through a heavy investment of fiat.  Human greed has tainted all major decentralised projects so far, with reports that there are individuals owning more than 1% of both Ethereum and Bitcoin. Thus having a fail safe seems prudent to preserve a truly decentralised economy.

If it can be proven that any one individual owns more than 0.5% of all tokens (outside of the central vault), our terms and conditions state that the excess tokens will be frozen, after every reasonable effort has been made to contact the owner advising them to sell.

Last Line: 
Founder Andy retains a veto vote. Intended never to be used, it serves as a last line of defence against subversion of the platform and community away from its core vision. 

In the case Andy is unable to use it, the veto vote will pass to 7 secretly designated members. Their identities unknown even to each other. These members have been determined by a personal judgement on integrity, reliability, and commitment to both the mission, and it's values. 4 members are required to use the veto on a decision, and reasons it was used must be explained fully to the community.
 
`)

const markdownSection37 = md.render(`

## 8.4.

**Conclusion**
To meet our goals and teach users the core concepts crypto-economics and blockchain, our community needs to move towards a culture of decentralised decision making. Doing so immediately, or fully, would open the platform up to abuse and security risks. For that reason decentralisation will be grandfathered in as the community grows, with the founding team assessing it’s current ability to protect itself from abuse while working towards increasing decentralisation and allowing greater community led governance. 

Some core areas of the project will always remain closed to change via community voting as a final line of defence from abuse, for example, the ‘Core Values’ which the community is based upon. To trigger a necessary change to these protected areas community members could create a vote to bring attention of the core team and put pressure on them to initiate the change, or to engage in further public discussions. 

`)

const markdownSection38 = md.render(` `)

const markdownSection39 = md.render(`

## 9.1.

**Levels of Trust**
Implementing levels of trust, where platform users rise in ranks by performing tasks to maintain and grow the Public Happiness network and ecosystem, means that scammers would be receiving a small sum, unless they first put in much work beneficial to the community to reach to a higher level.  (See section 11.1. for more info on weighted mining).

Community voting will maintain this balance between security vs the incentive for new members joining in. 

A two week holding period before mined tokens are released gives time for bounty hunters and other community members to find and report scams.

Miners creating public activities where much of the work is conducted offline will be required to post hashtags on social media of photos and videos taken at their activity as proof of work, which are tracked by our bot, linked to their account, and published in a list of pending tokens earned, making it simple for other users and bounty hunters to check if they think something suspicious is going on (the requirement for posting and hashtags is also fantastic marketing for the community and movement).

Our network is designed to make cheating the system more difficult than actually doing the required work.
 
`)

const markdownSection40 = md.render(`

## 9.2.

**Community Administrators**
Experienced members who have contributed to the ecosystem will be invited to become a Community Admin, with extra tools available for supporting other platform users.

Community Admins will receive tokens for performing critical oversight tasks within the platform, like being alerted to check issues by other members, step in to mitigate disputes, or begin the process of warning/removing members acting against the spirit required to maintain a positive and effective community. 

`)

const markdownSection41 = md.render(`

## 9.3.

**Project Administrators**
Users in the Action Center interested in team leading can apply to be a team leader of an existing project, create a new one, or take over an inactive one. Experienced and proactive members in each project will be invited to become an admin of the Public Happiness Projects, by overseeing a board

Public Happiness Missions completed will need to be approved by admins of each board  before rewards are released. Each board can have multiple admins.
 
`)

const markdownSection42 = md.render(`

## 9.4. 

**Mining Limits**
A hard limit exists on the amount of tokens one user can earn each week, set to a reasonable limit for how many activities or missions one user can realistically complete to prevent a large scale effort to scam the system. 

The platform will guide users through creating an off-platform Hot Wallet (to avoid the added risks of holding tokens on our platform), which it will interact with and distribute their earned tokens into. The platform will guide users to manage their personal digital security in the world of blockchain; teaching them how and why to:

* move the tokens into cold storage

* safely back up their seed

* move their tokens to an exchange to trade

* make purchases with their tokens

* send tokens to friends and family (which will double as a good marketing strategy to grow our community)

* create a secure hot wallet and back up their keys safely
 
`)

const markdownSection43 = md.render(`

## 9.5.

**Cold Storage and Key Holders**
Our Token:
In our model a large amount of the total Token’s created are held for future release creating obvious security concerns, and also safety concerns for our core team. To reduce these concerns we will be hiring a company who specialise in crypto security to ensure keys are split among the team, and none of our team is able to access the ‘vault’ without a set number of others, and an approved person from outside the project. We will fully automate the regular release of tokens into the platform.

Funds raised through the ICO:

Funds raised through the ICO funds will be stored in ETH, BAT, IOTA, BITCOIN (50%), held in cold storage, and EURO’s (50%). Both funds will be managed by one than one industry leading cold storage and security company.   

`)

const markdownSection44 = md.render(` `)

const markdownSection45 = md.render(`

## 10.1.

**Hash-Tagging**
Requiring hash-tagging as proof of work creates a highly effective method of free marketing. Everyone receiving our token through the Public Happiness Activities side of the platform will also be Hash Tagging about the token, flooding all social media platforms with images and videos of happy people around the world engaging in our Movement to massively boost interest and awareness of Public Happiness Token.

The proof of work bot will be searching for #PublicHappiness #PublicHappinessMovement #[miners location] #[activity name], and checking the connected social media profile against our database of connected user accounts.

`)

const markdownSection46 = md.render(`

## 10.2.

**Bus Tour**
A team of our community will be touring in a bus/minibuses and taking the Public Happiness Movement and Token to the streets. Initially beginning with Europe. Other prominent groups on the platform may be invited to tour their continent, mirroring the main tour groups actions.

Towns, cities and villages:

On the tour the team will visit cities, towns and villages and demonstrate how people can earn a Public Happiness Token and what impact it can have on life in their local community. 

Community members chosen for the bus tours will use their skills to target local issues with positive action in the places we visit, in partnership with local groups/charities. Issues like homelessness, loneliness, supporting the elderly, lack of urban green areas and gardens. Alongside our general Public Happiness activities.

Conferences, Festivals, and Happiness Economy Events:

We will be touring blockchain/fin-tech conferences, festivals, and happiness related events. The bus will carry equipment and team members to create exciting activities and flashmob style entertainment at these events. Both officially and unofficially. It will also serve as an office, meeting space, and sleeping rooms will often be available to select partners.

Busses and Vans:
How much funding is raised will determine whether we tour in a bus or a fleet of vans and minibuses. The ideal bus would be a 1960’s classic British Routemaster, due to the attention it would get outside of the UK boosting our marketing effort. The average price of these is £100,000+. A more likely choice is a Volvo B7TL Double Decker due to their renowned reliability. 

If we go with van’s a fleet of Mercedes Sprinters will join ‘[Connie the Connector](https://www.facebook.com/connietheconnector/)’ again due to their reliability, and also founder Andy’s experience in repairing and maintaining them.  [Connie the Connector](https://www.facebook.com/connietheconnector/) was converted by Andy and another community member in 2014 to switch back and forth between regular Diesel and running on Waste Vegetable Oil - leftover cooking oil (WVO). As it is arguably still the greenest form of fuelling a vehicle, all other vehicles will also be converted, giving us the ability to collect from people joining our activities and project in each location, and/or to partner with a major restaurant or hotel chain and collect their left over oils. 

`)

const markdownSection47 = md.render(`

## 10.3.

**Video Channel**
A Public Happiness Movement YouTube channel has been created as a space where all platform members, and groups, can share videos of their activities in support of our Movement. Combining our energies and message. A randomised video will play each time users visit an activity on the map . Taken from each YouTube playlists related category on our platform (unless the creator has added their own video). 

Combined with our coordinated hashtagging this will provide a huge boost across standard social media; both for our community, and also for each group that is a part of our ecosystem.

The bus tour will also be filmed, with regular instalments of life on the road taking Public Happiness and our token into local communities and bringing more happiness and well-being to the world. As a ground-breaking and exciting project we anticipate attracting a large following, especially as it will be supported by all other marketing efforts.

`)

const markdownSection48 = md.render(`

## 10.4.

**Happy Cam**
The project’s adopted rescue dog will be entering a life full of travel,  happy faces, and fun public events to enjoy. Not only will he/she become a superstar for the cameras, they will also become a video creator, wearing a camera harness with a stabilised Gopro mounted. Viewers can tune in to The Public Happiness channel to watch life travelling the world with a community in a bus/van fleet, teaching about the Public Have Movement, and the findings of Blockchain. All from the perspective of a very happy and loved dog. 

Later a second camera dog may join, if we adopt a puppy.. because that would be lovely.
 
`)

const markdownSection49 = md.render(` 

## 10.5.

**Public Happiness Partners**
There is already a small movement of active Public Happiness creators around the World, just waiting to spark into life. Many are held back by the difficulties of balancing committing so much time towards increasing well-being for their community, against the pressures of needing to be paid for their work in today’s economy which doesn't value those contributions.

Founder Andy has been a professional Public Happiness creator for the past 7 years and is well connected to the most active in the industry. Their leaders will be offered ‘back-pay’ for their previous unrewarded contributions towards creating a kinder world for us all to live in, and invited to join our platform. Using the platform offers them more effective tools to pursue their vision, and earning its token in our new economy, provides a fair reward for their efforts. This is designed to reduce, or even remove, the current heavy financial pressures to stop doing their excellent work for humanity. 

The existing leaders of the Movement would then become leaders on our platform, due to their pre-earned reputation. Granting the ability to direct the new platform and communities evolution, protecting the vision of the Movement they founded. Their existing community retains its individual identity, having its own page with forums, photos, videos, tools to guide users desired actions, and group hashtag. 

You can read further details about existing partners in section 5.4.


If comfortable operating within our [Community Values](https://news.focallocal.org/the-focallocal-community-values/), new groups operating for similar goals will be invited to join our ecosystem. Massively boost their growth and good work through our enhanced network effect, while also retaining their identity.

`)

const markdownSection50 = md.render(`

## 10.6.

**Online Supporters**
An open community is active on Reddit at reddit.com/r/focallocal where people can interact with other supporters of the project. Our internal community will communicate through our integrated Discourse forum on our platform, creating different levels and a space for both close supporters and a wider circle for the public who are following.

Members of our core team interested in public interaction will aim to engage blockchain enthusiasts on other popular online forums, for example, r/ethereum and r/cryptocurrency. Our aim is to seek feedback and involve existing communities in the building process, rather than to build hype and push marketing information out. 

The former approach brings valuable feedback and criticism from knowledgeable hobbyists, shining a light on areas which need improving. Building a genuine relationship by taking an interest in their views.

The latter is simply a cheap marketing exercise which has been saturated by the deluge of new projects last year. It would likely lead to excess cynicism.

`)

const markdownSection51 = md.render(`

## 10.7.

**Contests**
Building a core group of enthusiasts plays a big role in gaining the energy needed to provide momentum to a project. A strategy of finding creative and exciting ways to reward and engage those most active in promoting our ICO and Token, will be developed. Ensure our most passionate backers benefit from future successes and remain meet members of the community.

`)

const markdownSection52 = md.render(`

## 10.8.

**Collectables**
Collectables will be created for special activities a user joins in, and also landmarks they achieve within our ecosystem. This acts as a fun side game within the platform while giving milestone rewards to users, and using it to introduce them to collectables and other crypto-economic ideas. The collectables will be characters designed by the community and may feature logos, titles and names of the groups who coordinated large scale activities/projects 

`)

const markdownSection53 = md.render(`

The platform automates rewards for completing tasks which work towards maintaining and improving the operation of our ecosystem. Advancing our Movement's mission of creating more friendliness, peace and happiness in this world. This requires the building of the Automated Token Distribution Matrix outlined below.

`)

const markdownSection54 = md.render(`

## 11.1.

**Weighted Mining**
Levels of trust:
Users will go up in ranks as their total contribution to global happiness increases through our our platform. Each rank receives more tokens for each action on the platform. This reduces the incentive for scamming by making it less rewarding to automate new accounts. It also rewards the most active and loyal contributors to the ecosystem and the global Public Happiness Movement.


Levels of Scale:
Some local activities are organised on an International Scale as a coordinated effort to create positive cultural change. Peter Sharp at the Liberators International, for example, organises a yearly Eye Contact Gathering promoting increased human and societal connection through sharing a minutes eye contact with passers-by. To remind us of our shared human experience beyond superficial differences such as age, gender, ethnicity, etc. Last year on one day he mobilised a gathering in over 350 cities around the world. Bringing action to the streets for more connected communities at a local level, while targeting a global increase in well-being. 

When an activity is tiered in this manner on our site over the course of a few days, the original organiser will receive 20% of the tokens awarded to all the Public Happiness Activities they led and supported. Their core team will also receive a larger share of tokens if they are using the Action Center in our ecosystem to incentivise building and publicising the project.

[List of participating cities](https://www.eyecontactexperiment.com/participating-countries) for the 2017 International Eye Contact Experience for Human Connection.

Levels of average cost of living in each country: 
The token earnings from creating activities or completing project missions will be linked to the current average income in each country, keeping a balanced incentive to join the project across every nation. Taken from a publicly available online source of average cost of living per country. 

In special occasions the community may choose to vote on increasing the incentive in a specific country above its cost of living, for example, to offer support during hyperinflation, such as Venezuela has recently been experiencing; and other situations where increased community connection is of significant urgency. Or perhaps simply to target a country where few people have joined.

Obviously allowing the community to vote on increasing a regions token rewards, creates an avenue for potential voting abuse and will need to be monitored rigorously, until the communities self-governance is mature and thoroughly pressure tested.
 
`)

const markdownSection55 = md.render(`

## 11.2.

**Hard Cap**
A hard cap will be set on the amount that any one user can earn each reward period, at each different user level. Minimising the risk from abuse and fraud, and maintaining our core vision of Public Happiness Token allowing users increased economic freedom to give their time to resolving local societal issues, and increasing community connection and well-being. The hard cap will be a percentage of the tokens released in that period, modified as the user base increases. 

For example, 80% of all tokens in that period might be reasonable when there are 100 active users, but would be unfair and likely indicate a loophole in the system, when there are 100,000 active users.

The percentage earned from each sub-activity when coordinating large scale activities and projects is subject to a different hard cap limit for tokens earned, as it could feasibly be a significant percent of all work ecosystem-wide, when a coordinated global activity occurs. Any obscenely large reward will likely be flagged for discussion by the community to check for abuse, or corrections needed in our systems. 

`)

const markdownSection56 = md.render(`

## 11.3.

**Adjusting the Balancing**
The automated weighting and distribution system will apply a set level to the above metrics. These levels will be adjusted through community voting to find the most effective operating balances for maximising our network effect. These will constantly need adjusting during the Movements growth and evolution. 

`)

const markdownSection57 = md.render(`

## 11.4.

**Token Release**
Initially a pre-set amount of tokens will be set to release each week for 100 years, divided between active contributors to the ecosystem and mission. The number of tokens released each week will be set on a graduated incline, balancing rewarding early contributors with greater rewards, against the exponential increase of users who the token will be divided amongst as the community grows.

This weekly token release makes our currency deflationary, which will be offset by increases in value.

`)

const markdownSection58 = md.render(`

## 11.5.

**Mining Table**
A table of actions contributing to the ecosystem which users are rewarded for will be created here shortly.

`)

const markdownSection59 = md.render(`

## 11.6.

**Experience Multipliers**
A users total tokens earned/contribution to the ecosystem is recorded and used as a multiplier increasing their tokens earned and also the weight of their votes.

* Beginner Happiness Maker

* Novice Well-being Creator

* Experienced Positivity Activist

* Local  Action Hero

* Public Happiness Legend
 
`)

const markdownSection60 = md.render(`

## 11.7. 

**Token Distribution**
50% (4.85 Billion Tokens) will be released during the initial 3 ICO launches and give the token value through trading on exchanges

10% will be retained to pay for hiring experts who will  lead the development of the ecosystem, while the community grows a capacity to self-govern, promote and evolve effectively.

40% will be retained in our cold storage vault. Released to users ‘mining’ by creating Public Happiness activities/projects, and doing essential work in the ecosystem.

Initial targeted release time: 100 years 

The mining total will include a small amount that will be ‘back-paid’ to notable communities around the world. Those who have given their time to create Public Happiness projects which fit within the Movements shared mission, as a thank you for their efforts, and in order to encourage them to use our platform to increase their network effect. This will also include volunteers who gave their time and energy to building the Public Happiness Movement community, never expecting to be reimbursed for their efforts.

9.7 Billion
50 % = 4.85b
40% = 3.88b
100 year = 36500 Days
Average release rate: 265753 tokens per day

`)
 
const markdownSection61 = md.render(` 

## 11.8.

**Further Matrix Considerations**
The matrix needs to consider: 
The number of active users each week, from 10 to 100,000 to 100,000,000
The number of actions per week by a user, plotted between 1, to a high of 400. With the average per user anticipated to be around 20, multiplied by the users experience rating. 

Estimating the value of returns is speculative at this point. The core team, and later the community itself, will adjust the points ‘mined’ for each action. As governance progresses on the path to decentralisation, these charts will be interactive and hosted on the platform as a useful visual guide to voting on increasing/decreasing these data points, and maximising their impact in advancing and maintaining the mission.

`)

const markdownSection62 = md.render(` 

Some roles will be fixed for increased stability and an initial injection of experience and necessary skills. Others will be outsourced to the community via Microvolunteering in the Action Center 

`)

const markdownSection63 = md.render(` 

## 12.1.

**Current Team Members**

Andy Tulett: Focallocal Community and Token Founder
Professional Public Happiness Creator since 2012
Degree in Business and Entrepreneurship from University of Portsmouth

`)

const markdownSection64 = md.render(` 

## 12.2.

**Positions Open**
* Marketing Coordinator

* Automated Token Distribution Systems Engineer/Data Scientists

* Behavioural Analyst

* Community Managers

* Road Trip Coordinator

* ERC20 Developer to work on integration

* Cryptocurrencies and Blockchain Educator, to integrate the on-ramp guiding users to an base understanding of crypto economics 

* PR Manager

* Meteor/JavaScript Developers

* API Key Integration Specialist

* Digital Security Expert

* Accounts and Finances Manager

* Youtube/Video Channel Manager

* Crypto/Securities Legal Expert to ensure our token makes every effort to meet all required national and regional laws

* Release Manager

Roles will be for a pre-agreed period to invigorate and lead the community as it grows. Once the community reaches maturation the above roles may be decentralised to member the community, rewarded by tokens to carry out these roles. It is hoped that experts involved will choose to remain actively involved in the community they were integral in building, due to their previous contributions they will certainly have earned top level user status.

`)

const markdownSection65 = md.render(`

## 12.3.

**Remuneration**
The team of experts will be remunerated 50% in Ethereum, and 50% in Public Happiness Tokens with the 1st payments coming shortly after the ICO launch, and covering all work towards the project prior to the ICO.

`)

const markdownSection66 = md.render(`

## 12.4.

**Facilities**
The team will either operate remotely using our online hub, or work from the road trip. (see Marketing in section 10.2. for more details about the road trip). 

Not requiring fixed office space will enable us to keep overheads low, adding flexibility and the ability to weather crisis, alongside a sense of adventure matching our global ambitions.

`)

const markdownSection67 = md.render(` `)

const markdownSection68 = md.render(`

## 13.1.

**Crypto Linking Bridges**
Public Happiness Activities: Meteor Js/React to REST API 

Projects (Missions): Currently Web-hooks from Trello (or Wekan). This system is scheduled for redesign

`)

const markdownSection69 = md.render(`

## 13.2.

**Trello vs Wekan vs Other Solutions**
The Action Center is a Micro-volunteering Hub which breaks large projects down into 30 min – 1 hour ‘Missions’, enabling anyone to join in and help build the project and bring it into the world.


Currently the system uses Trello as an external platform, with a layer built on top of it. This creates a vulnerability where malicious users can damage altruistic projects by moving cards around, or deleting them. As the user-base grows an improved project management system will need to be added, or built into our platform.

`)

const markdownSection70 = md.render(`

## 13.3.
**Leaflet.js vs Google Maps API** 

**The Public Happiness Gatherings system is currently build using MeteorJS, ReactJS and [Leaflet.js](http://leafletjs.com/). The map itself is designed by members of our previous (non-incentivised) volunteer community and links to Google's Maps API. The Public Happiness Gatherings system was built to handle 25,000 users each day, giving us a lot of room to develop before we need to assess changes.

`)

const markdownSection71 = md.render(`

## 13.4.
**Switching the Platform to the Dapps Network**
(Decentralised Apps)

The Map (Public Happiness Gatherings) and the Projects/Micro-volunteering (Missions) are built in Meteor JS and ReactJS, which is ideal for switching to host on Ethereum’s DAPP network, as it is built using reactive programming.

This switch is not guaranteed at this point, but it is a logical step and will be reviewed by the team and community at predetermined steps during the roadmap.

`)

const markdownSection72 = md.render(` 
/
The Crypto world is highly volatile at this point in time which will lead many projects to overstretch themselves, ending up in trouble if an event outside of their control hits. Here we consider how to protect our ecosystem from certain scenarios.

`)

const markdownSection73 = md.render(`

## 14.1.

**Huge Market Crash**
Public Happiness Token is entirely secure from some major news crashing investors confidence in the entire blockchain, or global economic markets. Everything is designed with the ability to fall away, with the platform and community capable of running a skeleton site.

We achieve this important safety buffer by transferring agreed fees and payments into a separate bank account and crypto wallets as soon as an outgoing can be predicted, so that money is put at the moment we assessed that it was a good use of funds. Preferring short term contracts as a project policy, meaning all future costs are safely stored away and ready to be paid when agreed. 

The platform could in theory continue operating in a self-sustaining mode in the future, with absolutely zero outgoings, if we collectively decide to switch to running on the Dapps network.

The project already has 7 years of experience demonstrating that people believe in our vision and will continue to use the platform regardless of the value of the Token. Even in the case of a complete market crash where the token became almost worthless for a prolonged period, many users would remain active supporting the mission, and using the platform to deliver greater peace and well-being to the world. 

Public Happiness Token would basically become fancy internet points, with the added benefit that the loyal members, and those giving their time and energy to global happiness purely for altruistic reasons, would get to stock up on token and be handsomely rewarded when it rises from the embers of the market crash. 

As long as there is a positive community behind it the Token cannot fail. It will continue to be a positive force in this world regardless of Market conditions.

`)

const markdownSection74 = md.render(` 

## 14.2.

**Quantum Security**
To some extent we are tied to advancements in the Ethereum network. There are open pull requests such as pull request #208: Abstraction of transaction origin and signature.md. 

On our end our entire system is being reviewed by quantum security experts. We will also host bounties and bounty hunting contests for anyone able to find flaws and vulnerabilities in our platform, so they can be identified and fixed. As much of the platform as possible will be open source, to benefit from many eyes searching for and flagging vulnerabilities.

`)

const markdownSection75 = md.render(`

## 14.3.

**Massive Hack**
As a last resort in the case of a massive attack there is the possibility of a Hard Fork, resetting everything to a time before the hack on the public ledger.

Our Tokens value is tied to its positive effect on wider society, raising the possibility of a hard fork at a set point before the hack, and switching the token used on the platform; isolated from its ability to create societal good the original would become worthless.

All data of tokens earned on the system is held off-site in social media and gathered by our bots, or in provable work contributed by users in the Action Center, Community News Site and Forums. It would be a large task, but all tokens mined fairly between the time of the hack and the fork could be restored. Traded Tokens (outside of lost in the hack) would be visible on the public ledger and proof of ownership could be submitted to gain the new Token. 

Project contributions in Wekan/Trello can be backed up off-site or recovered from the teams which created the projects. Token earned legitimately after the hack could easily be restored, leaving the thieves with worthless digital residue. 

The implications of this option are obviously wide ranging and it would be an absolute last resort in a disaster mitigation strategy, with the case explained to the community before being voted on.

`)

const markdownSection76 = md.render(`

## 14.4.

**Zombie Apocalypse**
If the inevitable finally occurs, we will convert the Public Happiness Bus into a ‘Public Happiness Buoat’ and retreat to a small uninhabited Greek island, where our new society will flourish and sparkle as a bastion to all Humanity's greatest achievements. Using Public Happiness Token to create a paradise where every economic interaction creates more harmony and a closer more caring community, while the rest of the world performs a perfect impression of today’s paparazzi for each others brains. 

If the community has decided on having a fixed central base, for example renovating an abandoned village, it will built using the best off-grid technology today’s society has to offer - and also be zombie-proofed.

`)

const markdownSection77 = md.render(` 

2% of all funds we raise from the ICO will be donated to support the Open-source ecosystem that drives so much of the innovation we see in the world


## 15.1.

**Open Source Projects We Use**
* Discourse

* Plugins our platform uses

* Click the balloon here to discuss others we should support


## 15.2.

**Donations to Notable Other Open-source Projects**
1% of the total raised will be donated to other notable open-source projects which are positive forces within this world, as chosen by our community through voting during the ICO, for example, Wikipedia, and Libre Office 

The vote results will be non-binding, to allow mitigatation against any uncovered attempts to cheat the vote by outside groups. The platform and community will not yet be ready to protect itself from coordinated subversion efforts, without spending excess amounts of energy on securing the voting. Instead it can be used as an early pressure test on the integrity of certain areas of the platform, as this type of online contest invariably draws efforts to undermine fair voting.

`)

const markdownSection78 = md.render(` 

## 16.

* 1st draft of the White Paper created by founder

* Experts invited to review and advise on improvements

*  2nd draft of the White Paper

* A team of experts wanting to see this ecosystem brought into this world forms

* Witticism, fun and Focallocal flavour added to white paper

* Provisional White Paper posted online to announce our token, and gather feedback for further improvements, and build team. 

* Technical Details focused heavily around the Distribution Matrix added to the white paper

* ICO Launch date announced

Still to plan:
* 1st Stage ICO

* 2nd Stage ICO

* 3rd Stage ICO

* Apps launched

* Multi Language adaptation pushed to the entire site

* Open-source map replaces Google based map (if required)

* blockchain on-ramp added into it platform to guide users to a better understanding of blockchain and crypto economics. Fulfilling our mission of taking crypto to people on the streets.

`)

const markdownSection79 = md.render(` 


`)

const markdownSection80 = md.render(`

## 17.

* Open-source vs Closed Code Base. Added security risks from allowing hackers to search for vulnerabilities, vs the crypto communities strong preference for open source projects

* Getting listed on centralised and decentralised exchanges. The token will always have a low value if people can’t trade it so we’ll need to be listed on a few before the ICO finishes

* Which other crypto coins/tokens should we include in the platform to introduce our users into the crypto-economic ecosystem, for example, should our videos primarily be  hosted on Lbury? Is their platform ready?

* Should the platform be hosted on the DAPPs network?

* Should community governance voting be tokenized/on-chain? Or simply by using Discourse’s forum voting? Either would involve building a discourse plugin 

* How can we best compartmentalise voting to prevent overload on users, without pockets of influence forming? 

Next Steps:
* Set up ICO plan within our Action Center

* Full review of all content on focallocal.org to update content that has become outdated

* Token created

* Full security review of all open-source plugins used in building the website

* Full review of platform UX/UI and tech stack, looking quick ways to make large usability improvements, improving access and scalability.

Thank you for reading, have a wonderful day!
 
 `)


				   
const Anchor1  = () => <Fragment><h2 id="Abstract" className="chapterHeading">Abstract</h2><div dangerouslySetInnerHTML={{ __html: markdownSection1 }} /></Fragment>
const Anchor2  = () => <Fragment><h2 id="Background" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection2 }} /></Fragment>
const Anchor3  = () => <Fragment><h2 id="Public Happiness Token Introduction" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection3 }} /></Fragment>
const Anchor4  = () => <Fragment><h2 id="Problem Statement" className="chapterHeading">Problem Statement</h2><div dangerouslySetInnerHTML={{ __html: markdownSection4 }} /></Fragment>
const Anchor5  = () => <Fragment><h2 id="Issues we Aim to Solve" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection5 }} /></Fragment>
const Anchor6  = () => <Fragment><h2 id="Primary Goal" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection6 }} /></Fragment>
const Anchor7  = () => <Fragment><h2 id="Secondary Goal" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection7 }} /></Fragment>
const Anchor8  = () => <Fragment><h2 id="Relation to Universal Basic Income" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection8 }} /></Fragment>
const Anchor9  = () => <Fragment><h2 id="Educating the Public about Blockchain" className="chapterHeading">Educating the Public about Blockchain</h2><div dangerouslySetInnerHTML={{ __html: markdownSection9 }} /></Fragment>
const Anchor10 = () => <Fragment><h2 id="Current State of Public Understanding" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection10 }} /></Fragment>
const Anchor11 = () => <Fragment><h2 id="Reaching a New Audience" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection11 }} /></Fragment>
const Anchor12 = () => <Fragment><h2 id="The Public Happiness Token" className="chapterHeading">The Public Happiness Token</h2><div dangerouslySetInnerHTML={{ __html: markdownSection12 }} /></Fragment>
const Anchor13 = () => <Fragment><h2 id="Token Overview" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection13 }} /></Fragment>
const Anchor14 = () => <Fragment><h2 id="Public Happiness Token ICO" className="chapterHeading">Public Happiness Token ICO</h2><div dangerouslySetInnerHTML={{ __html: markdownSection14 }} /></Fragment>
const Anchor15 = () => <Fragment><h2 id="ICO Strategy" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection15 }} /></Fragment>
const Anchor16 = () => <Fragment><h2 id="ICO Stages" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection16 }} /></Fragment>
const Anchor17 = () => <Fragment><h2 id="Ongoing Funding for Specific Projects and Experts" className="chapterHeading">Ongoing Funding for Specific Projects and Experts</h2><div dangerouslySetInnerHTML={{ __html: markdownSection17 }} /></Fragment>
const Anchor18 = () => <Fragment><h2 id="ICO Marketing" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection18 }} /></Fragment>
const Anchor19 = () => <Fragment><h2 id="Public Happiness – Background" className="chapterHeading">Public Happiness – Background</h2><div dangerouslySetInnerHTML={{ __html: markdownSection19 }} /></Fragment>
const Anchor20 = () => <Fragment><h2 id="Community Background" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection20 }} /></Fragment>
const Anchor21 = () => <Fragment><h2 id="The Public Happiness Movement Community" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection21 }} /></Fragment>
const Anchor22 = () => <Fragment><h2 id="Platform Overview" className="chapterHeading">Platform Overview</h2><br/><div dangerouslySetInnerHTML={{ __html: markdownSection22 }} /></Fragment>
const Anchor23 = () => <Fragment><h2 id="The Public Happiness Map" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection23 }} /></Fragment>
const Anchor24 = () => <Fragment><h2 id="Action Center" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection24 }} /></Fragment>
const Anchor25 = () => <Fragment><h2 id="Community News" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection25 }} /></Fragment>
const Anchor26 = () => <Fragment><h2 id="Active Happiness Shop" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection26 }} /></Fragment>
const Anchor27 = () => <Fragment><h2 id="Who Defines What is Accepted as ‘Public Happiness’" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection27 }} /></Fragment>
const Anchor28 = () => <Fragment><h2 id="Evidence Based and Peer Reviewed Actions" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection28 }} /></Fragment>
const Anchor29 = () => <Fragment><h2 id="Who can Participate on the Platform" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection29 }} /></Fragment>
const Anchor30 = () => <Fragment><h2 id="Pre-existing Communities with Similar Values" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection30 }} /></Fragment>
const Anchor31 = () => <Fragment><h2 id="Languages" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection31 }} /></Fragment>
const Anchor32 = () => <Fragment><h2 id="Decentralised Governance and Voting" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection32 }} /></Fragment>
const Anchor33 = () => <Fragment><h2 id="The Path to Decentralisation" className="chapterHeading">The Path to Decentralisation</h2><div dangerouslySetInnerHTML={{ __html: markdownSection33 }} /></Fragment>
const Anchor34 = () => <Fragment><h2 id="Benevolent Dictatorship vs Complete Community Governance" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection34 }} /></Fragment>
const Anchor35 = () => <Fragment><h2 id="Example Scenario: Outside Collusion" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection35 }} /></Fragment>
const Anchor36 = () => <Fragment><h2 id="Lines of Defence" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection36 }} /></Fragment>
const Anchor37 = () => <Fragment><h2 id="Conclusion" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection37 }} /></Fragment>
const Anchor38 = () => <Fragment><h2 id="Security" className="chapterHeading">Security</h2><div dangerouslySetInnerHTML={{ __html: markdownSection38 }} /></Fragment>
const Anchor39 = () => <Fragment><h2 id="Levels of Trust" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection39 }} /></Fragment>
const Anchor40 = () => <Fragment><h2 id="Community Administrators" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection40 }} /></Fragment>
const Anchor41 = () => <Fragment><h2 id="Project Administrators" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection41 }} /></Fragment>
const Anchor42 = () => <Fragment><h2 id="Mining Limits" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection42 }} /></Fragment>
const Anchor43 = () => <Fragment><h2 id="Cold Storage and Key Holders" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection43 }} /></Fragment>
const Anchor44 = () => <Fragment><h2 id="Marketing Strategy" className="chapterHeading">Marketing Strategy</h2><div dangerouslySetInnerHTML={{ __html: markdownSection44 }} /></Fragment>
const Anchor45 = () => <Fragment><h2 id="A New Level of Hash Tagging" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection45 }} /></Fragment>
const Anchor46 = () => <Fragment><h2 id="Bus Tour" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection46 }} /></Fragment>
const Anchor47 = () => <Fragment><h2 id="Public Happiness Channel" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection47 }} /></Fragment>
const Anchor48 = () => <Fragment><h2 id="Happy Cam" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection48 }} /></Fragment>
const Anchor49 = () => <Fragment><h2 id="Public Happiness Partners" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection49 }} /></Fragment>
const Anchor50 = () => <Fragment><h2 id="Online Supporters" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection50 }} /></Fragment>
const Anchor51 = () => <Fragment><h2 id="Contests" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection51 }} /></Fragment>
const Anchor52 = () => <Fragment><h2 id="Collectables" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection52 }} /></Fragment>
const Anchor53 = () => <Fragment><h2 id="Automated Token Distribution Matrix" className="chapterHeading">Automated Token Distribution Matrix</h2><br/><div dangerouslySetInnerHTML={{ __html: markdownSection53 }} /></Fragment>
const Anchor54 = () => <Fragment><h2 id="Weighted Mining" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection54 }} /></Fragment>
const Anchor55 = () => <Fragment><h2 id="Hard Cap" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection55 }} /></Fragment>
const Anchor56 = () => <Fragment><h2 id="Adjusting the Balancing" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection56 }} /></Fragment>
const Anchor57 = () => <Fragment><h2 id="Token Release" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection57 }} /></Fragment>
const Anchor58 = () => <Fragment><h2 id="Mining Table" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection58 }} /></Fragment>
const Anchor59 = () => <Fragment><h2 id="Experience Multipliers" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection59 }} /></Fragment>
const Anchor60 = () => <Fragment><h2 id="Token Distribution" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection60 }} /></Fragment>
const Anchor61 = () => <Fragment><h2 id="Further Matrix Considerations" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection61 }} /></Fragment>
const Anchor62 = () => <Fragment><h2 id="Team" className="chapterHeading">Team</h2><br/><div dangerouslySetInnerHTML={{ __html: markdownSection62 }} /></Fragment>
const Anchor63 = () => <Fragment><h2 id="Current Team Members" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection63 }} /></Fragment>
const Anchor64 = () => <Fragment><h2 id="Positions Open" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection64 }} /></Fragment>
const Anchor65 = () => <Fragment><h2 id="Remuneration" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection65 }} /></Fragment>
const Anchor66 = () => <Fragment><h2 id="Facilities" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection66 }} /></Fragment>
const Anchor67 = () => <Fragment><h2 id="Platform Technicals" className="chapterHeading">Platform Technicals</h2><div dangerouslySetInnerHTML={{ __html: markdownSection67 }} /></Fragment>
const Anchor68 = () => <Fragment><h2 id="Crypto Linking Bridges" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection68 }} /></Fragment>
const Anchor69 = () => <Fragment><h2 id="Trello vs Wekan vs Other Solutions" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection69 }} /></Fragment>
const Anchor70 = () => <Fragment><h2 id="Leafletjs vs Google Maps API" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection70 }} /></Fragment>
const Anchor71 = () => <Fragment><h2 id="Switching the Platform to the Dapps Network" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection71 }} /></Fragment>
const Anchor72 = () => <Fragment><h2 id="Doomsday Protocol" className="chapterHeading">Doomsday Protocol</h2><div dangerouslySetInnerHTML={{ __html: markdownSection72 }} /></Fragment>
const Anchor73 = () => <Fragment><h2 id="Huge Market Crash" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection73 }} /></Fragment>
const Anchor74 = () => <Fragment><h2 id="Quantum Security" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection74 }} /></Fragment>
const Anchor75 = () => <Fragment><h2 id="Massive Hack" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection75 }} /></Fragment>
const Anchor76 = () => <Fragment><h2 id="Zombie Apocalypse" > </h2><div dangerouslySetInnerHTML={{ __html: markdownSection76 }} /></Fragment>
const Anchor77 = () => <Fragment><h2 id="Giving Back to Open-source" className="chapterHeading">Giving Back to Open-source</h2><br/><div dangerouslySetInnerHTML={{ __html: markdownSection77 }} /></Fragment>
const Anchor78 = () => <Fragment><h2 id="Timeline" className="chapterHeading">Timeline</h2><div dangerouslySetInnerHTML={{ __html: markdownSection78 }} /></Fragment>
const Anchor79 = () => <Fragment><h2 id="Key Supporters and Team" className="chapterHeading">Key Supporters and Team</h2><div dangerouslySetInnerHTML={{ __html: markdownSection79 }} /></Fragment>
const Anchor80 = () => <Fragment><h2 id="Questions to be Resolved" className="chapterHeading">Questions to be Resolved</h2><div dangerouslySetInnerHTML={{ __html: markdownSection80 }} /></Fragment>
const Anchor100 = () => <Fragment><h2 id="The World Needs This Because: (v1)" className="chapterHeading">The World Needs This Because: (v1)</h2><br/><div dangerouslySetInnerHTML={{ __html: markdownSection100 }} /></Fragment>
const Anchor101 = () => <Fragment><h2 id="The World Needs This Because: (v2)" className="chapterHeading">The World Needs This Because: (v2)</h2><br/><div dangerouslySetInnerHTML={{ __html: markdownSection101 }} /></Fragment>
const Anchor103 = () => <Fragment><h2 id="Foreword" > </h2><br /><br /><div dangerouslySetInnerHTML={{ __html: markdownSection103 }} /></Fragment>





const index = (props) => {
  return (
    <Container className="mt-5">
			<Title />
		<Anchor103  /><DCSBalloon title="click balloons to comment on section above" balloonId="bal" display="inline" dcsTags={props.dcsTags} />	
			<Contents /><DCSBalloon title="click balloons to comment on section above" balloonId="bal" display="inline" dcsTags={props.dcsTags} />
		<Anchor100  /><DCSBalloon balloonId="bal" display="inline" dcsTags={props.dcsTags} />		
		<Anchor101  /><DCSBalloon balloonId="bal" display="inline" dcsTags={props.dcsTags} />
		
		<Anchor1  />    
		<Anchor2  /><DCSBalloon balloonId="bal1" display="inline" dcsTags={props.dcsTags} />
		<Anchor3  /><DCSBalloon balloonId="bal1" display="inline" dcsTags={props.dcsTags} />
		
		<Anchor4  />
		<Anchor5  /><DCSBalloon balloonId="bal2" display="inline" dcsTags={props.dcsTags} />
		<Anchor6  /><DCSBalloon balloonId="bal2" display="inline" dcsTags={props.dcsTags} />
		<Anchor7  /><DCSBalloon balloonId="bal2" display="inline" dcsTags={props.dcsTags} />
		<Anchor8  /><DCSBalloon balloonId="bal2" display="inline" dcsTags={props.dcsTags} />
		
		<Anchor9  />
		<Anchor10 /><DCSBalloon balloonId="bal3" display="inline" dcsTags={props.dcsTags} />
		<Anchor11 /><DCSBalloon balloonId="bal3" display="inline" dcsTags={props.dcsTags} />
		
		<Anchor12 />
		<Anchor13 /><DCSBalloon balloonId="bal4" display="inline" dcsTags={props.dcsTags} />
		
		<Anchor14 />
		<Anchor15 /><DCSBalloon balloonId="bal5" display="inline" dcsTags={props.dcsTags} />
		<Anchor16 /><DCSBalloon balloonId="bal5" display="inline" dcsTags={props.dcsTags} />
		<Anchor17 /><DCSBalloon balloonId="bal5" display="inline" dcsTags={props.dcsTags} />
		<Anchor18 /><DCSBalloon balloonId="bal5" display="inline" dcsTags={props.dcsTags} />
		
		<Anchor19 />
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
		
		<Anchor33 />
		<Anchor34 /><DCSBalloon balloonId="bal8" display="inline" dcsTags={props.dcsTags} />
		<Anchor35 /><DCSBalloon balloonId="bal8" display="inline" dcsTags={props.dcsTags} />
		<Anchor36 /><DCSBalloon balloonId="bal8" display="inline" dcsTags={props.dcsTags} />
		<Anchor37 /><DCSBalloon balloonId="bal8" display="inline" dcsTags={props.dcsTags} />
		
		<Anchor38 />
		<Anchor39 /><DCSBalloon balloonId="bal9" display="inline" dcsTags={props.dcsTags} />
		<Anchor40 /><DCSBalloon balloonId="bal9" display="inline" dcsTags={props.dcsTags} />
		<Anchor41 /><DCSBalloon balloonId="bal9" display="inline" dcsTags={props.dcsTags} />
		<Anchor42 /><DCSBalloon balloonId="bal9" display="inline" dcsTags={props.dcsTags} />
		<Anchor43 /><DCSBalloon balloonId="bal9" display="inline" dcsTags={props.dcsTags} />
		
		<Anchor44 />
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
		
		<Anchor67 />
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
