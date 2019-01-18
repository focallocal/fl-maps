//Imports
import i18n from "../../../../both/i18n/en";
import React,{Component, Fragment } from "react";
import "./team.css";
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
      <Fragment>
        <div className="mr-5 ml-4">
          <Row>
            {teamData.map((member, index) => {
              return (
                <Col key={index} xs={12} md={3} className="mt-5 mb-4">
                  <Card>
                    <CardImg
                      key={index}
                      width={"100%"}
                      src={member.image}
                      alt={`${member.title} Image`}
                    />
                    <CardBody>
                      <CardTitle> {member.title} </CardTitle>
                      <CardSubtitle>{member.subtitle}</CardSubtitle>
                      <CardText>{member.text}</CardText>

                      <section className="contact">
                        <ul className="list-inline list-social">

                          <li className="list-inline-item social-linked-in">
                            <a 
                              target="blank"
                              href={member.linkedIn}
                            >
                              <i className="fab fa-linkedin-in" />
                            </a>
                          </li>

                          <li className="list-inline-item social-twitter">
                            <a
                              target="blank"
                              href={member.twitter}
                            >
                              <i className="fab fa-twitter" />
                            </a>
                          </li>

                          <li className="list-inline-item social-github">
                            <a
                              target="blank"
                              href={member.github}
                            >
                              <i className="fab fa-github" />
                            </a>
                          </li>

                        </ul>
                      </section>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Fragment>
    );
  }
}


export default Members;