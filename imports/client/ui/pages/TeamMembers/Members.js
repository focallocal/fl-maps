//Imports
import i18n from "../../../../both/i18n/en";
import React, { Component, Fragment } from "react";
import "./team.css";
import {
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
                      <CardText className="pt-2">{member.text}</CardText>

                      <section className="contact">
                        <ul className="list-inline list-social">
                          <li
                            style={{
                              display: member.linkedIn === "" ? "none" : "true"
                            }}
                            className="list-inline-item social-linked-in pt-1"
                          >
                            <a target="blank" href={member.linkedIn}>
                              <i className="fab fa-linkedin-in" />
                            </a>
                          </li>

                          <li
                            style={{
                              display: member.twitter === "" ? "none" : "true"
                            }}
                            className="list-inline-item social-twitter pt-1"
                          >
                            <a target="blank" href={member.twitter}>
                              <i className="fab fa-twitter" />
                            </a>
                          </li>

                          <li
                            style={{
                              display: member.website === "" ? "none" : "true"
                            }}
                            className="list-inline-item social-website pt-1"
                          >
                            <a target="blank" href={member.website}>
                              <i className="fas fa-globe" />
                            </a>
                          </li>

                          <li
                            style={{
                              display: member.github === "" ? "none" : "true"
                            }}
                            className="list-inline-item social-github pt-1"
                          >
                            <a target="blank" href={member.github}>
                              <i className="fab fa-github" />
                            </a>
                          </li>

                          <li
                            style={{
                              display: member.facebook === "" ? "none" : "true"
                            }}
                            className="list-inline-item social-facebook pt-1"
                          >
                            <a target="blank" href={member.facebook}>
                              <i className="fab fa-facebook" />
                            </a>
                          </li>

                          <li
                            style={{
                              display: member.google === "" ? "none" : "true"
                            }}
                            className="list-inline-item social-google-plus pt-1"
                          >
                            <a target="blank" href={member.google}>
                              <i className="fab fa-google" />
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
