import React from 'react'
import { Row, Col } from 'reactstrap'
import Item from './Item'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const ContributorsI18N = i18n.Home.contributors_section

const {
  title,
  content
} = ContributorsI18N

const {
  items
} = content

const ContributorsSection = () => (
  <div id="contributors_section">
    <h3 className='c-item-title'>{title}</h3>
    <Row className="c-items">
      {items.map((item, i) => (
        <Col key={i}>
          <Item item={item} />
        </Col>
      ))}
      <a className="allContButton" href='https://github.com/focallocal/fl-maps/graphs/contributors'>All Contributors</a>
    </Row>
  </div>
)

export default ContributorsSection
