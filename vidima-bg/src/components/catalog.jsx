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
class Catalog extends Component {
  state = {
    categories: [],
  };
  addToBasket = async (item) => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " +   localStorage.getItem('accessToken'),
      },
      data: item,
    };
    const res = await axios(url + "/profile/addToBasket", requestOptions);
    if (res.status === 200) {
      console.log(res);
      window.alert("item added succesfully");
    } else {
      console.log(res);
    }
  };
  componentDidMount = async () => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const res = await axios(
      url + "/categoryForBathroom/zaBanq",
      requestOptions
    );
    if (res.status === 200) {
      this.setState({ categories: res.data.categories });
    } else {
      console.log(res);
    }
  };
  render() {
    return (
      <>
        {this.state.categories.map((x) => (
          <>
            <Row>
              <Col sm={12} className="d-flex justify-content-center">
                <h className="heading mt-5 mb-5">{x.category_name} </h>{" "}
              </Col>{" "}
            </Row>

            <Row className="d-flex justify-content-center">
              {x.products.map((item) => (
                <>
                  <Col sm={2} s={4} className="d-flex justify-content-center">
                    <Container className="productCol ">
                      <Row className="d-flex justify-content-center">
                        <img src={item.image} className="productImg" />
                      </Row>
                      <Row className="productHeading d-flex justify-content-center">
                        <h className="">{item.heading} </h>
                      </Row>
                      <Row className="price d-flex justify-content-center mt-2">
                        {item.price}
                      </Row>
                      <Row className="basket d-flex justify-content-center mt-2">
                        <RiShoppingBasket2Fill onClick = {() => this.addToBasket(item)}/>
                      </Row>
                    </Container>
                  </Col>
                </>
              ))}{" "}
    
            </Row>
          </>
        ))}
      </>
    );
  }
}

export default Catalog;
