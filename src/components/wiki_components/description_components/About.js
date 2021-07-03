import React from "react";
import "./DescriptWiki.css";
import { Container, Row, Col } from "react-bootstrap";

export default function About() {
  return (
    <div>
      <Container className="about-container">
        <Row>
          <Col>
            <h3 className="heading">About Us</h3>
            <hr className="hr-thin" />
            <div className="about-card">
              <h2 className="about-text sub-title">Intro</h2>
              <hr className="about text hr-sub"/>
              <h4 className="about-text ">
                Gratis' can be considered as a small scale social networking
                site, close to linkedin and stackoverflow in its functionality
                which operates in a limited area of an institution or an
                organization.
              </h4>
              <h4 className="about-text">
                Gratis' - of the students, for the students, by the students.
              </h4>
              <h4 className="about-text">
                In the desperate times of COVID-19 where people cannot even
                interact with each other, Gratis' proves to be a perfect
                socializing and interacting platform for any institution.
              </h4>
              <h4 className="about-text">
                Gratis' can act as an open source community pertaining to a
                particular institution where users related only to that
                institution can interact and discuss their queries, doubts and
                questions.
              </h4>
              <h2 className="about-text sub-title">Our Team</h2>
              <hr className="about text hr-sub"/>
              <h4 className="about-text">Fullstack & CSS Expert ------------- Tarun Kr. Yadav</h4>
              <h4 className="about-text">Fullstack & Backend Expert ------------- Vipul Tyagi</h4>
              <h4 className="about-text">Structure Design ------------- Palash Som</h4>
              <h4 className="about-text">Asset Moderator ------------- Sidharth Kaushik</h4>
            </div>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}
