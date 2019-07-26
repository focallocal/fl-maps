// External Packages
import React, { Fragment } from 'react'
import { Container } from 'reactstrap'

// Components
import DCSLink from '/imports/client/ui/components/DCSLink/index.js'
import NavMenu from './NavMenu'
import { TableOfContents } from './TableOfContents'

// Styles and Other
import './styles.scss'
import i18n from '/imports/both/i18n/en/'

const Remarkable = require('remarkable')
const md = new Remarkable()
md.set({
  breaks: true,
  linkify: true
})

const index = (props) => {
  const wpForword = md.render(i18n.Whitepaper.Forword)
  const fullText = i18n.Whitepaper.FullText
  const sectionCount = fullText.length
  const fullTextReversed = [...fullText].reverse()

  return (
    <Container className="mt-5">

      <h2 className='Title' style={{ textAlign: 'center' }}>Welcome to the 1st Draft!</h2>

      <NavMenu />

      <h2 id="Foreword"> </h2>
      <br />
      <br />
      <div dangerouslySetInnerHTML={{ __html: wpForword }} />
      <DCSLink badge="true" format="speech-bubble" title="General Discussion" triggerId="forword" display="inline" />

      <TableOfContents />
      <DCSLink badge="true" format="speech-bubble" title="click balloons to comment on section above" triggerId="bal" display="inline" />

      {fullText.map((elem, index) => {
        const text = md.render(elem.fullText)
        const chapterCode = findChaperCode(fullTextReversed, sectionCount, index)

        return (
          <Fragment key={elem.title}>
            <h2 id={elem.title} className={elem.chapterHeading ? 'chapterHeading' : ''}>
              {elem.chapterHeading && elem.title}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: text }} />
            {elem.fullText.match(/[a-z]/i) && <DCSLink badge="true" format="speech-bubble" triggerId={chapterCode} display="inline" />}
          </Fragment>
        )
      })}

    </Container>

  )
}

export default index

function findChaperCode (reversedSectionArray, sectionCount, currentIndex) {
  const subArray = reversedSectionArray.slice(sectionCount - currentIndex - 1)
  return subArray.find(e => e.chapterHeading === true).code
}
