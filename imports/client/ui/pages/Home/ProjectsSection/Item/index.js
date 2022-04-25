import React from 'react'
import './styles.scss'
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

const Item = ({ item, loginButton }) =>
  <Col className="mb-3" sm='12' md='6' lg='6'>
    <Card style={{borderColor: item.color, borderBottom: `8px solid ${item.color}`}} className="h-100">
      <div style={{margin: '1.25rem 1.25rem'}}>
        <img
          alt="Card image cap"
          src={item.image}
          className="images"
        />
          <CardTitle tag="h5">
            <CardLink href={item.url} target="_top">
              {item.title}
            </CardLink>
            {/*<Link to={item.url}>
              {item.title}
          </Link>*/}
          </CardTitle>
          <CardText style={{marginTop: '1rem'}}>
            {item.description}
          </CardText>
      </div>
      <CardBody>
        <div style={{display: 'flex', flexFlow: 'wrap'}}>
          {item.categories.map((category, i) => (
            <CardLink href={category.url} target="_top">
              <span style={{display: 'flex', marginRight: '12px'}}>
                <span style={{backgroundColor: item.color, display: 'inline-block', width: '9px', height: '9px', marginRight: '5px', border: `5.6px solid ${item.color}`, marginTop: '6px'}}>&nbsp;</span>
                {category.title}
              </span>
            </CardLink>
            /*<Link to={item.url}>
              <span style={{display: 'flex', alignItems: 'center', marginRight: '12px'}}>
                <span style={{backgroundColor: item.color, display: 'inline-block', width: '9px', height: '9px', marginRight: '5px', border: `5.6px solid ${item.color}`}}>&nbsp;</span>
                {category.title}
              </span>
            </Link>*/
          ))}
        </div>
      </CardBody>
    </Card>
  </Col>
export default Item
