import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import "./styles/shoppingCart.css";
import { TiDelete } from "react-icons/ti";
class ShoppingCart extends Component {
  state = {
    shoppingList: [],
    totalPrice: 0,
    loading:true,
  };
  removeFromBasket = async (_id) => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      data: {
        id: _id,
      },
    };
    const res = await axios(url + "/profile/removeFromCart", requestOptions);
      this.setState({ shoppingList: res.data.productsInTheBasket });
      var price = 0.0;
      res.data.productsInTheBasket.map(
        (item) =>
          (price += parseFloat(item.price.slice(0, item.price.length - 3)))
      );
      price = price.toFixed(2);
      this.setState({ totalPrice: price });
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
      this.setState({loading:false})
    } else {
      console.log("Error ->", res);
    }
  };
  render() {
    return (
      <>
      <Row
          className={
            this.state.loading ? "d-flex justify-content-center" : "d-none"
          }
        >
          <img src="https://studio.code.org/v3/assets/hDNGCz0MfJ-xlRq6yeKqI69d0m9QDG8RRIM23pMHlBk/loading-bar-1.gif" />{" "}
        </Row>
        <Row>
          {this.state.shoppingList.map((item) => (
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
                  <TiDelete
                    className="removeFromBasketBtn"
                    onClick={() => this.removeFromBasket(item.id)}
                  />
                </Row>
              </Container>
          ))}{" "}
        </Row>
        <Row className={this.state.totalPrice === "0.00" ? "d-flex justify-content-center mt-5" : "d-none"}>
        <h5 >Shopping cart is empty. Find the best deal in our <Link to = "/catalog">Catalog</Link></h5>
          </Row>
        <Container className={this.state.totalPrice === "0.00" ? "checkOutCol d-none" : "checkOutCol"}>
          {" "}
          <Row className="text d-flex justify-content-center">
            {" "}
            Покупки: {this.state.totalPrice}лв.
          </Row>
          <Row className="text d-flex justify-content-center">
            {" "}
            Доставка: 10лв.
          </Row>
          <Row className="text d-flex justify-content-center">
            {" "}
            <strong>Общо: {parseFloat(this.state.totalPrice) + 10}лв.</strong>
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
