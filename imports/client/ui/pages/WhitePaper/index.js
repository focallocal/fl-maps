import React from "react";
import { Container } from "reactstrap";
import './styles.scss'
import DCSBalloon from '/imports/client/ui/components/DCSBalloon/index.js'
<script src="https://unpkg.com/@babel/standalone/babel.js"></script>
<script src="https://unpkg.com/react/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>

const Remarkable = require('remarkable');

const md = new Remarkable();
md.set({
  breaks: true,
  linkify: true
});


<div id="intro"/>
<script type="text/babel">
  function whitepaper() {
    return (
      <React.Fragment>
        Some text.
        <h2>A heading</h2>
        More text.
        <h2>Another heading</h2>
        Even more text.
      </React.Fragment>
     );
  }
  ReactDOM.render(<Example />, document.getElementById('root'));
</script>

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
