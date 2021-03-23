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
import "./styles/shoppingCart.css";
import { RiShoppingBasket2Fill } from "react-icons/ri";
class ShoppingCart extends Component {
  state = {
    shoppingList: [],
    totalPrice: 0,
  };
  removeFromBasket = async (item) => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    const res = await axios(url + "/profile/me", requestOptions);
    if (res.status === 200) {
      this.setState({ myProducts: res.data.productsInTheBasket });
      console.log(res.data.productsInTheBasket);
      window.alert("item added succesfully");
    } else {
    }
  };
  componentDidMount = async () => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    const res = await axios(url + "/profile/me", requestOptions);
    if (res.status === 200) {
      this.setState({ shoppingList: res.data.productsInTheBasket });
      var price = 0.0;
      res.data.productsInTheBasket.map(
        (item) =>
          (price += parseFloat(item.price.slice(0, item.price.length - 3)))
      );
      price = price.toFixed(2);
      this.setState({ totalPrice: price });
    } else {
      console.log("Error ->", res);
    }
  };
  render() {
    return (
      <>
        {this.state.shoppingList.map((item) => (
          <>
            <Container className="productCol ">
              <Row>
                <Col className="center " sm={4}>
                  {" "}
                  <img src={item.image} className="productImg" />{" "}
                </Col>

                <Col>
                  {" "}
                  <Row className="center">
                    <h className="itemHeading">{item.heading} </h>
                  </Row>
                  <Row className="descriptionRow">
                    <h className="">Описание </h>
                  </Row>
                  <Row className="">
                    <h className="itemDescription">{item.description} </h>
                  </Row>
                  <Row className="d-flex justify-content-right price">
                    {" "}
                    Цена <strong>: {item.price}</strong>{" "}
                  </Row>
                </Col>
              </Row>
            </Container>
          </>
        ))}{" "}
        <Container className="productCol checkOutCol">
              {" "}
              {" "}
              <Row className="text d-flex justify-content-center">
                {" "}
                Покупки: {this.state.totalPrice}лв.
              </Row>
              <Row className="text d-flex justify-content-center"> Доставка: 10лв.</Row>
              <Row className="text d-flex justify-content-center">
                {" "}
                <strong>Общо: {parseFloat(this.state.totalPrice) +10}лв.</strong>
              </Row>
              <Row>
                <button className="chekoutBtn">Chekout </button>
              </Row>{" "}
        </Container>
        <Row className="checkoutRow d-flex justify-content-center mb-5 mt-5"></Row>
      </>
    );
  }
}

export default ShoppingCart;
