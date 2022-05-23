import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import Item from './Item'
import i18n from '/imports/both/i18n/en'
import ContributorsSection from '../ContributorsSection'
import './styles.scss'

const MovementI18N = i18n.Home.movement_section
const { Home } = i18n

class MovementSection extends Component {

  constructor(props){
    super(props);
    this.state = {
      isMoreStats: true,
    }
  }


componentDidMount(){

}


 render (props) {
   console.log(this.state.isMoreStats)
   const {
     title,
     content
   } = MovementI18N

   const {
     items
   } = content

   //const isLoggedIn = !!this.props.user
   const isLoggedIn = this.props.isLoggedIn;
  const loginButton = 
    <Button className='sign-and-post' tag={Link} to='/?new=1'>
      {isLoggedIn ? Home.post.button_loggedIn: Home.post.button}
    </Button>

   return (
     <section id='movement_section'>
       <Container>
         <div className='title'>{title}</div>
         <Row className="items">
             {items.map((item, i) => (
                <Col key={i} xs="6" sm="6" md="6" lg="3">
                  <Item item={item} />
                </Col>
             ))}
         </Row>
         <button className='more-stats'>More Stats</button>
       </Container>
       
     </section>
   )
 }
}
MovementSection.propTypes = {
isLoggedIn: PropTypes.bool.isRequired,
}

export default MovementSection
