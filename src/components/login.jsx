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
import axios from "axios";
import "./styles/login.css";

import { FcGoogle } from "react-icons/fc";
class Login extends Component {
  state = {
    email: "",
    password: "",
    loggingIn:false,
  };
  changeEmail = (e) => {
    this.setState({ email: e.currentTarget.value });
  };
  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  login = async () => {
    this.setState({ loggingIn: true });
    const url = process.env.REACT_APP_URL;
    this.setState({ loading: true });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    };
    const res = await axios(url + "/profile/login", requestOptions);
    if (res.status === 200) {
      console.log(res);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('user', this.state.email);
      this.setState({ loggingIn: false });
  localStorage.setItem('refreshToken', res.data.refreshToken);
      window.alert("logged");
      window.location = "/home"
    } else {
      console.log(res);
    }
  };
  render() {
    return (
      <>
        <Container className="loginContainer shadow-lg">
          <img  className = "backgroundImage" src = "https://hoteldesigns.net/wp-content/uploads/2018/05/Bathroom1.jpg"/>
          <Row className="logoRow d-flex justify-content-center mt-3">
            L.O.G.O.
          </Row>
          <Row className="d-flex justify-content-center">
            <input
              className="emailLogin text-align-center shadow-lg"
              type="text"
              id="fname"
              name="fname"
              placeholder="Username"
              onChange={(e) => this.changeEmail(e)}
            />
          </Row>
          <Row className="d-flex justify-content-center">
            {" "}
            <input
              className="passwordLogin text-align-center"
              type="password"
              id="fname"
              name="fname"
              placeholder="🔒*********🔒"
              onChange={(e) => this.changePassword(e)}
            />
          </Row>
          <Row className="loginBtnRow d-flex justify-content-center mt-3">
            <button className={this.state.loggingIn ? "loginBtnLoading" : "loginBtn"} onClick = {() => this.login()}>{this.state.loggingIn ? "" : "Login"} </button>
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
            <p>Do not have an account? </p>{" "}
            <Link to="/register">
              <p className="loginRegisterText">Register</p>
            </Link>
          </Row>
        </Container>
      </>
    );
  }
}

export default Login;
