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
  DropdownButton,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import "./styles/catalog.css";
import { scroller } from "react-scroll";
import { GrBasket } from "react-icons/gr";
import { WiDirectionUp } from "react-icons/wi";
import { WiDirectionDown } from "react-icons/wi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { FaHotjar } from "react-icons/fa";
import { connect } from "react-redux";
const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  changeCurrentProduct: (product) =>
    dispatch(async (dispatch, getState) => {
      dispatch({
        type: "CHANGE_CURRENT_PRODUCT",
        payload: product,
      });
    }),
  changeCategory: (category) =>
    dispatch(async (dispatch, getState) => {
      dispatch({
        type: "CHANGE_CURRENT_CATEGORY",
        payload: category,
      });
    }),
  changeProducts: (products) =>
    dispatch(async (dispatch, getState) => {
      dispatch({
        type: "FILTER_PRODUCTS",
        payload: products,
      });
    }),
});
var uniqid = require("uniqid");
class Catalog extends Component {
  state = {
    categories: [],
    pagesArray: [],
    loading: true,
    showingCategories: false,
    regexCyrillic: /^[\u0400-\u04FF]+$/, //for later
    show: false,
    imgToInspect: "",
    loaded: false,
    currentItem: "",
    showComments: false,
    comment: "",
    addingComment: false,
    currentCategory: "",
    slicer: 0,
    currentPage:0,
  };
  filterByPriceDsc = async () => {
    var filteredArray = this.props.products.products.sort(
      (a, b) => parseFloat(b.productPrice) - parseFloat(a.productPrice)
    );
    this.props.changeProducts(filteredArray);
    this.setState({ loading: false });
    console.log(filteredArray);
  };
  filterByPriceAsc = async () => {
    var filteredArray = this.props.products.products.sort(
      (a, b) => parseFloat(a.productPrice) - parseFloat(b.productPrice)
    );
    this.props.changeProducts(filteredArray);
    this.setState({ loading: false });
    console.log(filteredArray);
  };
  stopLoadingNewComment = () => {
    this.setState({ addingComment: false });
  };
  fizzBuzz = async () => {
    var word = "Fizz";
    for (var i = 1; i < 100; i++) {
      for (var y = 1; y < 100; y++) {
        if (y * 3 === i) {
          word = "Fizz";
          y = 100;
        } else {
          word = i;
        }
      }
      for (var y = 1; y < 100; y++) {
        if (y * 5 === i) {
          if (word === "Fizz") {
            word = "FizzBuzz";
            y = 100;
          } else {
            word = "Buzz";
          }
        }
      }
      console.log(word);
      word = i;
    }
  };
  pageClicked = (page) => {
    this.setState({ slicer: page * 7 })
    this.setState({ currentPage: page })
  }
  updateProduct = async () => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "GET",
    };
    const res = await axios(
      url + "/product/getProduct/" + this.state.currentItem._id,
      requestOptions
    );
    if (res.status === 200) {
      console.log(res);
      this.setState({ currentItem: res.data });
    } else {
      console.log(res);
    }
  };
  deleteComment = async (id) => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "DELETE",
    };
    const res = await fetch(
      url + "/product/deleteComment/" + this.state.currentItem._id + "/" + id,

      requestOptions
    );
    if (res.status === 200) {
      this.updateProduct();
    } else {
      console.log(res);
    }
  };

  addComment = async () => {
    this.setState({ addingComment: true });
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { comment: this.state.comment, user: localStorage.getItem("user") },
    };
    const res = await fetch(
      url +
        "/product/addComment/" +
        this.state.currentItem._id +
        "/" +
        this.state.comment +
        "/" +
        localStorage.getItem("user") +
        "/" +
        uniqid(),

      requestOptions
    );
    if (res.status === 200) {
      this.updateProduct();
      var that = this;
      setTimeout(function () {
        that.stopLoadingNewComment();
      }, 720);
      document.querySelector(".input").value = "";
    } else {
      console.log(res);
    }
  };
  returningPages = () => {
    var array = [];
    for (let i = 0; i < this.props.products.products.length / 7; i++) {
      array.push(i);
    }
    this.setState({ pagesArray: array });
  };
  returnPages = (page) => {
    console.log(page);
    return <h className="mt-5">1111111111</h>;
  };

  changeComment = (e) => {
    this.setState({ comment: e.currentTarget.value });
  };
  scrollToSection = (category) => {
    scroller.scrollTo(category.category_name, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
    if (this.state.showingCategories === true) {
      this.setState({ showingCategories: false });
    } else {
      this.setState({ showingCategories: true });
    }
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
    } else {
      console.log(res);
    }
  };
  getItem = (item) => {
    this.setState({ currentItem: item });
    this.setState({ imgToInspect: item.image });
    this.setState({ show: true });
  };
  loadCategory = async (category) => {
    this.setState({ currentCategory: category });
    this.props.changeCategory(category);
    this.setState({ loaded: false });
    this.setState({ loading: true });
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "GET",
    };
    const res = await axios(
      url + `/product/getCategory/${category}`,
      requestOptions
    );
    if (res.status === 200) {
      this.setState({ categories: res.data });
      this.props.changeProducts(res.data);
      this.setState({ loading: false });
      this.setState({ loaded: true });
      this.setState({ slicer: 0 });
      this.returningPages();
    } else {
      console.log(res);
    }
  };
  addView = async (item) => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "POST",
    };
    const res = await axios(
      url + `/product/addView/${item._id}`,
      requestOptions
    );
    if (res.status === 200) {
      this.props.changeCurrentProduct(item);
    } else {
      console.log(res);
    }
  };
  handleCommentSection = () => {
    if (this.state.showComments) {
      this.setState({ showComments: false });
    } else {
      this.setState({ showComments: true });
    }
  };
  componentDidMount = async () => {
    this.fizzBuzz();
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "GET",
    };
    const res = await axios(
      url + "/product/getCategory/SanitarnaKeramika",
      requestOptions
    );
    if (res.status === 200) {
      this.setState({ categories: res.data });
      this.props.changeProducts(res.data);
      this.setState({ loading: false });
      this.returningPages();
      this.setState({ loaded: true });
      this.setState({ pages: this.props.products.products / 7 + 1 });
    } else {
      console.log(res);
    }
  };
  render() {
    return (
      <>
        <Row
          className={
            this.state.loading
              ? "aLotOfMargin d-flex justify-content-center mb-5 mt-5"
              : "d-none"
          }
        >
          <img src="https://studio.code.org/v3/assets/hDNGCz0MfJ-xlRq6yeKqI69d0m9QDG8RRIM23pMHlBk/loading-bar-1.gif" />{" "}
        </Row>
        <Row
          className={
            this.state.loading
              ? "d-none"
              : " d-flex justify-content-center mb-3 mt-1"
          }
        >
          <Col sm={2} className="d-flex justify-content-center">
            <button
              className="categoryBtn"
              onClick={() => this.loadCategory("SanitarnaKeramika")}
            >
              {" "}
              Санитарна керамика{" "}
            </button>
          </Col>
          <Col sm={2} className="d-flex justify-content-center">
            <button
              className="categoryBtn"
              onClick={() => this.loadCategory("Smesiteli")}
            >
              {" "}
              Смесители{" "}
            </button>
          </Col>
          <Col sm={2} className="d-flex justify-content-center">
            <button
              className="categoryBtn"
              onClick={() => this.loadCategory("Dushove")}
            >
              {" "}
              Душове{" "}
            </button>
          </Col>
          <Col sm={2} className="d-flex justify-content-center">
            <button
              className="categoryBtn"
              onClick={() => this.loadCategory("Aksesoari")}
            >
              {" "}
              Аксесоари{" "}
            </button>
          </Col>
          <Col sm={2} className="d-flex justify-content-center">
            <button
              className="categoryBtn"
              onClick={() => this.loadCategory("Drugi")}
            >
              {" "}
              Други{" "}
            </button>
          </Col>
        </Row>
        <Row className={this.state.loading ? "d-none" : "catalog1"}>
          {" "}
          <Col sm={12} className=" d-flex justify-content-center mt-5">
            <Row className={this.state.loaded ? "showIt" : "d-none"}>
              <h className=" heading mb-4 mt-4 ">
                {this.state.loaded ? this.state.categories[0].category : "wait"}{" "}
              </h>{" "}
            </Row>
            <Row className="sortRow mt-4">
              <h5> Sort by </h5>
              <h5 className="ml-3 mr-2" onClick={() => this.filterByPriceAsc()}>
                {" "}
                Price
                <WiDirectionUp />{" "}
              </h5>
              <h5 onClick={() => this.filterByPriceDsc()}>
                {" "}
                Price
                <WiDirectionDown className="downIcon" />
              </h5>
            </Row>
          </Col>{" "}
        </Row>

        <Container className="productsContaner mt-5">
          <img
            className="backgroundImage imageBackground"
            src="https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-taobao-white-minimalist-cosmetics-background-image_192723.jpg"
          />
          <Row
            className={
              this.state.loading
                ? "d-none"
                : " d-flex justify-content-center ml-1 mr-1"
            }
          >
            {this.props.products.products
              .slice(this.state.slicer, this.state.slicer + 7)
              .map((item) => (
                <>
                  <Col
                    lg={3}
                    md={3}
                    s={12}
                    className="d-flex justify-content-center"
                  >
                    <Container className="productContainer shadow-lg p-3 mb-5 bg-white rounded">
                      <Row className="d-flex justify-content-center">
                        <Link to="/productPage">
                          <img
                            src={item.image}
                            className="productImg"
                            onClick={() => this.addView(item)}
                          />
                        </Link>
                      </Row>
                      <Row className="productHeading d-flex justify-content-center">
                        <h className={item.productName}>
                          {item.productName.slice(0, 25)}{" "}
                        </h>
                      </Row>
                      <Row className="d-flex justify-content-center mt-2">
                        Brand: {item.manifacturedBy}
                      </Row>
                      <Row className="d-flex justify-content-center mt-2">
                        Series: {item.category_collection.slice(0, 7)}
                      </Row>
                      <Row className="price d-flex justify-content-center mt-2">
                        {parseFloat(item.productPrice).toFixed(2)} Лв.
                      </Row>
                      <Row className=" d-flex justify-content-left ">
                        <ImEye className="eye ml-2 mt-1 mr-2" />{" "}
                        <h className="views">{item.views}</h>
                      </Row>
                      {item.views >= 5 ? <FaHotjar className="hot" /> : ""}
                    </Container>
                  </Col>
                </>
              ))}{" "}
          </Row>
        </Container>
        <Row className = {this.state.loading ? "d-none" : "mt-2"}>
          {" "}
          <Col sm={2} className="d-flex justify-content-center"></Col>{" "}
          <Col sm={8} className="d-flex justify-content-center">
            {this.state.pagesArray.map((page) => (
              <h
                className={this.state.currentPage === page ? "clickedPage ml-3" : "pageNumberBtn ml-3"}
                onClick={() => this.pageClicked(page)}
              >
                {page + 1}
              </h>
            ))}
          </Col>
          <Col sm={2} className="d-flex justify-content-center"></Col>
        </Row>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
