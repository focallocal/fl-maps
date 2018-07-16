import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import Item from './Item'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const SecondSectionI18N = i18n.Home.second_section

const {
  title,
  content
} = SecondSectionI18N

const {
  items
} = content

class SecondSection extends React.Component {
  render (props) {
    return (
      <section id='second-section'>
        <Container>
          <div className='title'>{title}</div>
          <Row className="items">
            {items.map((item, i) => (
              <Col key={i}>
                <Item item={item} />
              </Col>
            ))}
          </Row>
        </Container>
        {this.props.button === true ? <Button className='read-more' tag={Link} to='/about'>Read More</Button> : null}
      </section>
    )
  }
}

export default SecondSection
