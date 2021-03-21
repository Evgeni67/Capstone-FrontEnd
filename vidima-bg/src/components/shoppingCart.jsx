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
import "./styles/catalog.css";
import { RiShoppingBasket2Fill } from "react-icons/ri";
class ShoppingCart extends Component {
  state = {
    myProducts: [],
  };
  removeFromBasket = async (item) => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " +   localStorage.getItem('accessToken'),
      },
    };
    const res = await axios(url + "/profile/me", requestOptions);
    if (res.status === 200) {
   this.setState({myProducts:res.data.productsInTheBasket});
   console.log(res.data.productsInTheBasket)
      window.alert("item added succesfully");
    } else {
      console.log(res);
    }
  };
  componentDidMount = async () => {
      console.log(localStorage.getItem('accessToken'))
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "GET",
      Authorization: "Bearer " +   localStorage.getItem('accessToken'),
    };
    const res = await axios(
      url + "/profile/me",
      requestOptions
    );
    if (res.status === 200) {
       console.log(res)
    } else {
      console.log(res);
    }
  };
  render() {
    return (
      <>
       12333333333333333333333333333333333333333
      </>
    );
  }
}

export default ShoppingCart;
