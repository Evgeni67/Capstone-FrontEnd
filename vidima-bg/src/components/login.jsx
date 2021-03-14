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
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./styles/login.css";

import { FcGoogle } from "react-icons/fc";
class Login extends Component {
  render() {
    return (
      <>
        <Container className="loginContainer">
          <Row className="logoRow d-flex justify-content-center mt-3">
            L.O.G.O.
          </Row>
          <Row className="d-flex justify-content-center">
            <input
              className="emailLogin text-align-center"
              type="text"
              id="fname"
              name="fname"
              defaultValue="name@email.com"
            />
          </Row>
          <Row className="d-flex justify-content-center">
            {" "}
            <input
              className="passwordLogin text-align-center"
              type="password"
              id="fname"
              name="fname"
              defaultValue="password"
            />
          </Row>
          <Row className="loginBtnRow d-flex justify-content-center mt-3">
            <button className="loginBtn">Login </button>
          </Row>
          <Row className="loginGoogleRow d-flex justify-content-center mt-3">
            <FcGoogle className="googleIcon" />{" "}
            <p className="googleText">Login with Google </p>
          </Row>
          <Row className="forgottenPassRow d-flex justify-content-center ">
            {" "}
            <p className="forgottenPassText">Forgotten password? </p>
          </Row>
        </Container>
        <Container className="loginRegisterContainer">
          <Row className="loginRegisterRow d-flex justify-content-center">
            <p>Do not have an account? </p>{" "}<Link to = "/register">
            <p className="loginRegisterText">Register</p>
            </Link>
          </Row>
        </Container>
      </>
    );
  }
}

export default Login;
