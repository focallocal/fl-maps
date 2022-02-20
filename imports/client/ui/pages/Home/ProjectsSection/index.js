import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { 
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardLink
} from 'reactstrap'
import Item from './Item'
import i18n from '/imports/both/i18n/en'
import ContributorsSection from '../ContributorsSection'
import './styles.scss'


const ProjectsI18N = i18n.Home.projects_section
const { Home } = i18n

class ProjectsSection extends Component {
 render (props) {
   const {
     title,
     content
   } = ProjectsI18N

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
     <section id='projects_section'>
       <Container>
         <div className='title'>{title}</div>
         <Row className="items">
           <Col lg="6">
              <Card>
                <img
                  alt="Card image cap"
                  src="https://picsum.photos/318/180"
                  width="40%"
                />
                <CardBody>
                  <CardTitle tag="h5">
                    Card title
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    Card subtitle
                  </CardSubtitle>
                </CardBody>

                <CardBody>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </CardText>
                  <CardLink href="#">
                    Card Link
                  </CardLink>
                  <CardLink href="#">
                    Another Link
                  </CardLink>
                </CardBody>
              </Card>
              
             {items.map((item, i) => (
               <Row key={i}>
                <Item item={item} loginButton={loginButton} />
               </Row>
             ))}
           </Col>
           <Col lg="6">
             {items.map((item, i) => (
               <Row key={i}>
                 <Item item={item} loginButton={loginButton} />
               </Row>
             ))}
           </Col>
           <Col lg="6">
             {items.map((item, i) => (
               <Row key={i}>
                 <Item item={item} loginButton={loginButton} />
               </Row>
             ))}
           </Col>
           <Col lg="6">
             {items.map((item, i) => (
               <Row key={i}>
                 <Item item={item} loginButton={loginButton} />
               </Row>
             ))}
           </Col>
         </Row>
       </Container>
     </section>
   )
 }
}
ProjectsSection.propTypes = {
isLoggedIn: PropTypes.bool.isRequired,
}

export default ProjectsSection
