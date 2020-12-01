import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import mongo from "../../static/mongo.png";
import express from "../../static/express.png";
import react from "../../static/react.png";
import node from "../../static/node.png";
import "./Landing.css";

const Landing = () => (
   <Container
      style={{ height: "75vh" }}
      className="home d-flex flex-column justify-content-center align-items-center"
   >
      {" "}
      <Row className="mb-4">
         <p className="text-light h3"> Blogging Application</p>
      </Row>
      <Row>
            <Col>
                <h3> </h3>
         </Col>
        
      </Row>
   </Container>
);

export default Landing;
