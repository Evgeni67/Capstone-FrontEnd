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
import "./styles/catalog.css"
class Catalog extends Component {
    state = {
    };
    fetchData = async() => {
        const url = process.env.REACT_APP_URL;
       // this.setState({ loading: true });
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const res = await axios(url + "/profile/login", requestOptions);
        if (res.status === 200) {
          console.log(res);
          localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
          window.alert("logged");
          window.location = "/catalog"
        } else {
          console.log(res);
        }
    }
    render() {
      return (
        <>
        123
         </>
    );
  }
}

export default Catalog;