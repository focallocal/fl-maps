//Imports
import i18n from "../../../../both/i18n/en";
import React,{Component, Fragment } from "react";
import 
{
Row,
Container,
Col,
Card, 
CardImg,
CardText,
CardBody,
CardTitle,
CardSubtitle,
Button 
} from "reactstrap";

const teamData = i18n.Team.members;



class Members extends Component {

render() {
  return (

    <Fragment >
    <div className="mr-5 ml-4">
    <Row>
    {teamData.map((member, index)=>{
    return (
      <Col xs={12} md={3} className="mt-5"> 
      <Card>
      <CardImg key={index} width={"100%"} src={member.image} alt={`${member.title} Image`} />
      <CardBody>
      <CardTitle> { member.title } </CardTitle>
      <CardSubtitle>{ member.subtitle }</CardSubtitle>
      <CardText>{ member.text }</CardText>
     
      <Button className="ml-2 mt-2">{ member.title }</Button>
      <Button className="ml-2 mt-2" >{ member.title }</Button>
      <Button className="ml-2 mt-2">{ member.title }</Button>
    
      </CardBody>
      </Card>
      </Col>
    )
  })}      
    </Row>
    </div>  
</Fragment>
  )
}

}
export default Members;