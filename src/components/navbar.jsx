import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { scroller } from "react-scroll";
import { connect } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles/navbar.css";
import axios from "axios";
const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  changeProducts: (category,searchWord) => {
    dispatch(async (dispatch, getState) => {
      const url = process.env.REACT_APP_URL;
      const requestOptions = {
        method: "GET",
      };
      const res = await axios(
        url + `/product/getCategory/${category}`,
        requestOptions
      );
      if (res.status === 200) {
        console.log(res.data)
        var products = res.data.filter((c) =>
          c.productName.includes(searchWord)
        );
        console.log("products ->", products);
        console.log("Got 200 response");
        dispatch({
          type: "FILTER_PRODUCTS",
          payload: products,
        });
        dispatch({
          type: "STOP_LOADING",
        });
      } else {
        console.log(res);
      }
    });
  },
});
class MyNavbar extends Component {
  state = {
    showingCategories: false,
    searchWord: "",
    shoppingList:[],
  };
  
    showCategories = () => {
      if (this.state.showingCategories === true) {
        this.setState({ showingCategories: false });
      } else {
        this.setState({ showingCategories: true });
      }
    }
  changeSearch = (e) => {
    this.setState({ searchWord: e.currentTarget.value });
    this.props.changeProducts(this.props.products.category,this.state.searchWord)
  };
  render() {
    return (
      <>
        {" "}
        <Row className = "navBody">
          <Col className="d-flex justify-content-center" sm={4} xs={12}>
            <p className="logoText">L.O.G.O. </p>
          </Col>
          <Col className="d-flex justify-content-center" sm={1} xs={12}>
          <Link className="navText" to="/home">
            <p className="navText">Начало </p>
            </Link>
          </Col>
          <Col className="d-flex justify-content-center" sm={1} xs={12}>
          <Link className="navText" to="/contacts">
            <p className="navText"> Контакти</p>
            </Link>
          </Col>
          <Col className="d-flex justify-content-center" sm={1} xs={12}>
            <Link className="navText" to="/catalog">
              <p className="navText">Каталог </p>
            </Link>
          </Col>
          <Col className="d-flex justify-content-center" sm={1} xs={12}>
          <Link className="navText" to="/login">
            <p className="navText">{localStorage.getItem("user") === "Guest" ? "Влезте" : "Излезте"} </p>
            </Link>
          </Col>
          <Col className="d-flex justify-content-center" sm={1} xs={12}>
            <Link className="navText" to="/shoppingCart">
              <p className="navText">Кошница({this.props.products.productsInCart.length}) </p>
            </Link>
          </Col>
          <Col className="d-flex justify-content-center" sm={3}>
            <BsSearch
              className="searchForm mr-3"
              onClick={() => this.props.changeProducts(this.props.products.category,this.state.searchWord)}
            />
            <input
              className="searchForm"
              autoComplete="off"
              type="text"
              id="fname"
              name="fname"
              onChange={(e) => this.changeSearch(e)}
            />
           <p className = "helloGreeting"> Hello, {localStorage.getItem(`user`)} </p>
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
