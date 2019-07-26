import React, { Fragment } from 'react'
import i18n from '/imports/both/i18n/en/'

export const TableOfContents = () => {
  const fullText = i18n.Whitepaper.FullText
  let chapter = 0
  let section = 0
  return (
    <React.Fragment>
      <h2 className='title' style={{ textAlign: 'center' }}>Public Happiness Movement<br />Token Whitepaper</h2>
      <div className="contentspage">

        <p>
i. Foreword <br />
ii. Intro<br />
iii. Contents<br />
          <br />

          {fullText.map((elem, index) => {
            if (elem.chapterHeading) {
              chapter++
              section = 0
            } else section++
            const prefix = elem.chapterHeading
              ? `${chapter}. ` : `${chapter}.${section}. `

            return (
              <Fragment key={`#${elem.title}`}>
                {elem.chapterHeading ? <br /> : <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                {prefix}<a href={`#${elem.title}`}>{elem.title}</a><br />
              </Fragment>
            )
          })}

        </p>
      </div>
    </React.Fragment>
  )
}
