import React, { Component } from "react";
import {
  Navbar,
  Nav,
  FormControl,
  Button,
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import "./styles/register.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class Register extends Component {
  render() {
    return (
      <>
       <Row className="d-flex justify-content-center">
               <p className = "regLogo">L.O.G.O. </p>
                </Row>
          <Container className="regCredentailsContainer">
            <Row className="mainRegRow">
              <Col sm={5}>
                <Row className="d-flex justify-content-center">
                  <input
                    className="emailRegister text-align-center"
                    type="text"
                    id="fname"
                    name="fname"
                    defaultValue="name@email.com"
                  />
                </Row>

                <Row className="d-flex justify-content-center">
                  <input
                    className="passwordRegister text-align-center"
                    type="password"
                    id="fname"
                    name="fname"
                    defaultValue="name@email.com"
                  />
                </Row>
                <Row className="d-flex justify-content-center">
                  <input
                    className="confirmPassword text-align-center"
                    type="password"
                    defaultValue="name@email.com"
                  />
                </Row>
              </Col>
              <Col sm={2}>
                 
                <Row className="d-flex justify-content-center">
                <button className="regBtn">Register</button>
                </Row>
              </Col>
              <Col sm={5}>
                <Row className="d-flex justify-content-center">
                  <input
                    className="mobileRegister text-align-center"
                    type="text"
                    defaultValue="+359 . . . . . . . . ."
                  />
                </Row>
                
                <Row className="d-flex justify-content-center">
                  <input
                    className="addressRegister text-align-center"
                    type="text"
                    defaultValue="Address"
                  />
                </Row>
                <Row className="registerToLogin d-flex justify-content-center">
                  <p className = "registerQ" 
                  >
                      Already have an account? 
                      </p>
                      <Link to="/login">
                      <p className = "registerLogin"> Login</p>
                      </Link>
                </Row>
              </Col>
            </Row>
          </Container>
      </>
    );
  }
}

export default Register;
