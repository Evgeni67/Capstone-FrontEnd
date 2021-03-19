import React, { Component } from "react";
import axios from "axios";
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
  state = {
    email: "",
    password: "",
    confirmPassowrd: "",
    address: "",
    phoneNumber: "",
  };
  changeEmail = (e) => {
    this.setState({ email: e.currentTarget.value });
  };
  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  changeConfirmPassword = (e) => {
    this.setState({ confirmPassowrd: e.target.value });
  };
  changeAddress = (e) => {
    this.setState({ address: e.target.value });
  };
  changePhone = (e) => {
    this.setState({ phoneNumber: e.target.value });
  };
  register = async () => {
    const url = process.env.REACT_APP_URL;
    this.setState({ loading: true });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
      },
    };
    if (this.state.password === this.state.confirmPassowrd) {
      const res = await axios(url + "/profile/register", requestOptions);
      if (res.status === 200) {
        window.alert("registered");
      } else {
        console.log(res);
      }
    } else {
      window.alert("Password does not match");
    }
  };
  render() {
    return (
      <>
        <Row className="d-flex justify-content-center">
          <p className="regLogo">L.O.G.O. </p>
        </Row>
        <Container className="regCredentailsContainer">
          <Row className="mainRegRow">
            <Col sm={5}>
              <Row className="d-flex justify-content-center">
                <input
                  className="emailRegister text-align-center"
                  type="text"
                  name="fname"
                  defaultValue="name@email.com"
                  onChange={(e) => this.changeEmail(e)}
                />
              </Row>

              <Row className="d-flex justify-content-center">
                <input
                  className="passwordRegister text-align-center"
                  type="password"
                  name="fname"
                  defaultValue="password"
                  onChange={(e) => this.changePassword(e)}
                />
              </Row>
              <Row className="d-flex justify-content-center">
                <input
                  className="confirmPassword text-align-center"
                  type="password"
                  defaultValue="password"
                  onChange={(e) => this.changeConfirmPassword(e)}
                />
              </Row>
            </Col>
            <Col sm={2}>
              <Row className="d-flex justify-content-center">
                <button className="regBtn" onClick={() => this.register()}>
                  Register
                </button>
              </Row>
            </Col>
            <Col sm={5}>
              <Row className="d-flex justify-content-center">
                <input
                  className="mobileRegister text-align-center"
                  type="text"
                  defaultValue="+359 . . . . . . . . ."
                  onChange={(e) => this.changePhone(e)}
                />
              </Row>

              <Row className="d-flex justify-content-center">
                <input
                  className="addressRegister text-align-center"
                  type="text"
                  defaultValue="Address"
                  onChange={(e) => this.changeAddress(e)}
                />
              </Row>
              <Row className="registerToLogin d-flex justify-content-center">
                <p className="registerQ">Already have an account?</p>
                <Link to="/login">
                  <p className="registerLogin"> Login</p>
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
