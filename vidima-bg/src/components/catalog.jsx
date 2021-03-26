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
import { scroller } from "react-scroll";

var uniqid = require("uniqid");
class Catalog extends Component {
  state = {
    categories: [],
    loading: true,
    regexCyrillic :/^[\u0400-\u04FF]+$/
  };
  scrollToSection = (category) => {
    scroller.scrollTo(category.category_name, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  addToBasket = async (item) => {
    item.id = uniqid();
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
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
      this.setState({ loading: false });
    } else {
      console.log(res);
    }
  };
  render() {
    return (
      <>
        <Container className="categoryNavbar">
          {this.state.categories
            .sort(function (a, b) {
              // ASC  -> a.length - b.length
              // DESC -> b.length - a.length
              return a.category_name.length - b.category_name.length;
            })
            .map((x) => (
              <>
                <Row className="navigationHeading ml-5 mb-5 mt-5">
                <h onClick={() => this.scrollToSection(x)}>   {x.category_name}{" "} </h>
                
                </Row>{" "}
              </>
            ))}
        </Container>
   

        <Row
          className={
            this.state.loading ? "d-flex justify-content-center" : "d-none"
          }
        >
          <img src="https://studio.code.org/v3/assets/hDNGCz0MfJ-xlRq6yeKqI69d0m9QDG8RRIM23pMHlBk/loading-bar-1.gif" />{" "}
        </Row>
        {this.state.categories.map((x) => (
          <>
            <Row> <Row className = "lineRow"/>
              <Col sm={12} className="categoryCol d-flex justify-content-center">
         
                <h className={x.category_name + " heading mb-5 "}>
                  {x.category_name}{" "}
                </h>{" "}
              </Col>{" "}
            </Row>

            <Row className="d-flex justify-content-center">
              {x.products.map((item) => (
                <>
                  <Col
                    lg={2}
                    md={4}
                    s={6}
                    className="d-flex justify-content-center"
                  >
                    <Container className="productCol1  shadow-lg p-3 mb-5 bg-white rounded">
                      <Row className="d-flex justify-content-center">
                        <img src={item.image} className="productImg" />
                      </Row>
                      <Row className="productHeading d-flex justify-content-center">
                        <h className={item.heading}>{item.heading.slice(0,22)} </h>
                      </Row>
                      <Row className="price d-flex justify-content-center mt-2">
                        {item.price}
                      </Row>
                      <Row className="basket d-flex justify-content-center mt-2">
                        <RiShoppingBasket2Fill
                          onClick={() => this.addToBasket(item)}
                        />
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
