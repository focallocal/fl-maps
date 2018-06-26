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
  constructor(props){
    super(props)

  }

    render(props) {
    const HasButton = (props) => {
        const button = props.button;
        if(button == true){
          return <Button className='read-more' tag={Link} to='/about'>Read More</Button>
        }else {
          return null;
        }
      }

      return(
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
      <HasButton button= {this.props.button} />
    </section>
    )
  }
}

export default SecondSection
