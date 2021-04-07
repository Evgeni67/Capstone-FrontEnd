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
  Modal,
} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import "./styles/catalog.css";
import { scroller } from "react-scroll";
import { GrBasket } from "react-icons/gr";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { connect } from "react-redux";
const mapStateToProps = (state) => state;
var uniqid = require("uniqid");
class Catalog extends Component {
  state = {
    categories: [],
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
         document.querySelector(".input").value = ""
    } else {
      console.log(res);
    }
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
      this.setState({ loading: false });
      this.setState({ loaded: true });
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
    this.updateProduct()
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
      this.setState({ loading: false });
      this.setState({ loaded: true });
    } else {
      console.log(res);
    }
  };
  render() {
    return (
      <>
        <Row
          className={
            this.state.loading ? " d-flex justify-content-center" : "d-none"
          }
        >
          <img src="https://studio.code.org/v3/assets/hDNGCz0MfJ-xlRq6yeKqI69d0m9QDG8RRIM23pMHlBk/loading-bar-1.gif" />{" "}
        </Row>
        <Row
          className={
            this.state.loading
              ? "d-none"
              : "categoriesBtnRow d-flex justify-content-center mt-5"
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
          <Row className="lineRow" />
          <Col sm={12} className="categoryCol d-flex justify-content-center">
            <Row className={this.state.loaded ? "show" : "d-none"}>
              <h className=" heading mb-5 ">
                {this.state.loaded ? this.state.categories[0].category : "wait"}{" "}
              </h>{" "}
              <Row></Row>
            </Row>
          </Col>{" "}
        </Row>

        <Row
          className={
            this.state.loading
              ? "d-none"
              : "products d-flex justify-content-center ml-1 mr-1"
          }
        >
          {this.state.categories.map((item) => (
            <>
              <Col
                lg={2}
                md={4}
                s={6}
                className="d-flex justify-content-center"
              >
                <Container className="  shadow-lg p-3 mb-5 bg-white rounded">
                  <Row className="d-flex justify-content-center">
                    <img
                      src={item.image}
                      className="productImg"
                      onClick={() => this.getItem(item)}
                    />
                  </Row>
                  <Row className="productHeading d-flex justify-content-center">
                    <h className={item.productName}>
                      {item.productName.slice(0, 25)}{" "}
                    </h>
                  </Row>
                  <Row className="price d-flex justify-content-center mt-2">
                    {item.productPrice}
                  </Row>
                  <Row className="d-flex justify-content-center mt-2">
                    Brand: {item.manifacturedBy}
                  </Row>
                  <Row className="d-flex justify-content-center mt-2">
                    Series: {item.category_collection}
                  </Row>
                  <Row className="basket d-flex justify-content-center mt-0.5">
                    <GrBasket onClick={() => this.addToBasket(item)} />
                  </Row>
                </Container>
              </Col>
            </>
          ))}{" "}
        </Row>

        <Modal show={this.state.show} className="modal">
          <Modal.Body className="modalBody">
            <Row className="headingModal d-flex justify-content-center">
              {this.state.currentItem.productName}
            </Row>
            <img
              className="inspectImg shadow-lg p-3 mb-5 bg-white rounded"
              src={this.state.imgToInspect}
            />

            <Row
              sm={12}
              className="headingModal2 d-flex justify-content-center"
            >
              Описание
            </Row>

            <Row>
              <Col
                sm={12}
                className="description text-center shadow-lg p-3 mb-5 bg-white rounded"
              >
                {this.state.currentItem.productDescription}{" "}
              </Col>
            </Row>
           
            <Row className="seeReviews  d-flex justify-content-center ">
              <p onClick={() => this.handleCommentSection()}>
                {this.state.showComments ? "Hide Reviews" : "See Reviews"}{" "}
              </p>{" "}
            </Row>
            <Container
              className={this.state.showComments ? "commentSection mb-5" : "d-none"}
            >
              <p className = "ml-1">{this.state.showComments && this.state.currentItem.comments.length === 0 ? ("Be the first one to leave a Review") : ""}</p>
              {this.state.showComments &&
                this.state.currentItem.comments.map((comment) => (
                  <Row className="commentRow d-flex justify-content-left ml-1 ">
                    <p className="mt-1 ml-2"> {comment.user} </p>{" "}
                    <p className="commentText">{comment.text}</p>
                    {comment.user === localStorage.getItem("user") ? (
                      <RiDeleteBin6Fill
                        className="deleteCommentBtn"
                        onClick={() => this.deleteComment(comment.id)}
                      />
                    ) : (
                      ""
                    )}
                  </Row>
                ))}
              <div className="textInput mb-1">
                <input
                  className="input"
                  onChange={(e) => this.changeComment(e)}
                />
                <Button
                  variant="secondary"
                  className="addCommentBtn"
                  onClick={() => this.addComment()}
                >
                  {this.state.addingComment ? (
                    <img src="https://i.gifer.com/ZZ5H.gif" className = "loadComment" />
                  ) : (
                    "Add"
                  )}
                </Button>
              </div>
            </Container>
            <Row className="priceModal d-flex justify-content-center  ">
             <p className = "price2 "> Цена:{this.state.currentItem.productPrice} лв. </p>
            </Row>
            <Button
              variant="secondary"
              onClick={() => this.setState({ show: false })}
              className = "closeBtn"
            >
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => this.addToBasket(this.state.currentItem)}
              className = "buyBtn"
            >
              Buy
            </Button>
          </Modal.Body>
          
        </Modal>
      </>
    );
  }
}
export default connect(mapStateToProps)(Catalog);
