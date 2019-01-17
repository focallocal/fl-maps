
import React,{Component, Fragment } from "react";
import 
{
Container,
Row,
Col,
Card, 
CardImg,
CardText,
CardBody,
CardTitle,
CardSubtitle,
Button 
} from "reactstrap";


const MappingMembers = () => (
  <Col xs={12} md={4}> 
  <Card>
    <CardImg  src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
      <CardBody>
        <CardTitle>Card title</CardTitle>
        <CardSubtitle>Card subtitle</CardSubtitle>
        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
        <Button outline color="success" >Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
    </CardBody>
  </Card>     
  </Col>
);






class Members extends Component {
    render() {
      return (
          <Fragment>
            <div className="mt-3">
            <Row>
            <MappingMembers />
            <MappingMembers />
            <MappingMembers />
            <MappingMembers />
            <MappingMembers />
            </Row> 
            </div> 
        </Fragment>
        
      );
    }
  }



export default Members;