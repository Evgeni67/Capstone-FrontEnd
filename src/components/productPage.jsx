import React, { Component } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import "./styles/productPage.css";
import { scroller } from "react-scroll";
import { MdAddShoppingCart } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { BiEditAlt } from "react-icons/bi";
import { AiFillCheckSquare } from "react-icons/ai";
import { connect } from "react-redux";
import { FaBullseye } from "react-icons/fa";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  changeProduct: (product) =>
    dispatch(async (dispatch, getState) => {
      dispatch({
        type: "CHANGE_CURRENT_PRODUCT",
        payload: product,
      });
    }),
  changeProducts: (products) =>
    dispatch(async (dispatch, getState) => {
      dispatch({
        type: "FILTER_PRODUCTS",
        payload: products,
      });
    }),
    addProductToCart: (product) => 
      dispatch(async (dispatch, getState) => {
        dispatch({
          type: "ADD_PRODUCT_TO_CART",
          payload: product,
        });
      }),
    
});
var uniqid = require("uniqid");
class ProductPage extends Component {
  state = {
    loadingAddingToBasket: false,
    showComments: false,
    edittingComment: false,
    addingComment: false,
    firstStar: "star1",
    secondStar: "star2",
    thirdStar: "star3",
    fourthStar: "star4",
    fifthStar: "star5",
    currentRate: 0,
    title: "",
    comment: "",
    commentToEditId: "",
  };
  cancleEdit = (id) => {
    this.setState({ commentToEditId: "" });
    this.setState({ edittingComment: false });
    this.deleteRating()
  };
  editComment = (id) => {
    this.setState({ commentToEditId: id });
    this.setState({ edittingComment: true });
  };
  applyChangesComment = async (productId) => {
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
        "/product/editComment/" +
        this.props.products.currentProduct._id +
        "/" +
        this.state.commentToEditId +
        "/" +
        this.state.comment +
        "/" +
        this.state.currentRate +
        "/" +
        this.state.title,

      requestOptions
    );
    if (res.status === 200) {
      this.updateProduct();
      this.deleteRating();
      this.setState({ edittingComment: false });
      console.log(res);
    } else {
      console.log(res);
    }
  };
  changeTitle = (e) => {
    this.setState({ title: e.currentTarget.value });
  };
  stopLoadingNewComment = () => {
    this.setState({ addingComment: false });
  };

  updateProduct = async () => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "GET",
    };
    const res = await axios(
      url + "/product/getProduct/" + this.props.products.currentProduct._id,
      requestOptions
    );
    if (res.status === 200) {
      console.log(res);
      this.props.changeProduct(res.data);
    } else {
      console.log(res);
    }
  };
  scrollToSection = () => {
    scroller.scrollTo("mainCommentRow", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  deleteComment = async (id) => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "DELETE",
    };
    const res = await fetch(
      url +
        "/product/deleteComment/" +
        this.props.products.currentProduct._id +
        "/" +
        id,

      requestOptions
    );
    if (res.status === 200) {
      this.updateProduct();
    } else {
      console.log(res);
    }
  };

  addComment = async () => {
    var date = new Date();
    var month = date.getMonth() +1;
    var day = date.getDate();
    if (month <= 9) {
      month = "0" + month;
    }
    if (day <= 9) {
      day = "0" + day;
    }
    var dateToSend = date.getFullYear() + "-" + month + "-" + day;
    console.log(dateToSend);
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
        this.props.products.currentProduct._id +
        "/" +
        this.state.comment +
        "/" +
        this.state.currentRate +
        "/" +
        this.state.title +
        "/" +
        dateToSend +
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
      document.querySelector(".titleInput").value = "";
      document.querySelector(".reviewInput").value = "";
      this.deleteRating();
    } else {
      console.log(res);
    }
  };

  changeComment = (e) => {
    this.setState({ comment: e.currentTarget.value });
  };

  scrollToSection = () => {
    scroller.scrollTo("commentSection", {
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
    this.props.addProductToCart(item)
    item.id = uniqid();
    this.setState({ loadingAddingToBasket: true });
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
      this.setState({ loadingAddingToBasket: false });
    } else {
      console.log(res);
    }
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
    } else {
      console.log(res);
    }
  };
  deleteRating = () => {
    this.setState({ firstStar: "star1" });
    this.setState({ secondStar: "star2" });
    this.setState({ thirdStar: "star3" });
    this.setState({ fourthStar: "star4" });
    this.setState({ fifthStar: "star5" });
    this.setState({ currentRate: 0 });
    this.setState({ showDeleteRating: false });
  };
  setRate = (index) => {
    if (index === 1) {
      this.setState({ firstStar: "star" });
      this.setState({ currentRate: 1 });
    } else if (index === 2) {
      this.setState({ firstStar: "star" });
      this.setState({ secondStar: "star" });
      if (this.state.currentRate < 2) {
        this.setState({ currentRate: 2 });
      }
    } else if (index === 3) {
      this.setState({ firstStar: "star" });
      this.setState({ secondStar: "star" });
      this.setState({ thirdStar: "star" });
      if (this.state.currentRate < 3) {
        this.setState({ currentRate: 3 });
      }
    } else if (index === 4) {
      this.setState({ firstStar: "star" });
      this.setState({ secondStar: "star" });
      this.setState({ thirdStar: "star" });
      this.setState({ fourthStar: "star" });
      if (this.state.currentRate < 4) {
        this.setState({ currentRate: 4 });
      }
    } else if (index === 5) {
      this.setState({ firstStar: "star" });
      this.setState({ secondStar: "star" });
      this.setState({ thirdStar: "star" });
      this.setState({ fourthStar: "star" });
      this.setState({ fifthStar: "star" });
      if (this.state.currentRate < 5) {
        this.setState({ currentRate: 5 });
      }
    }
    this.setState({ showDeleteRating: true });
  };
  handleCommentSection = () => {
    if (this.state.showComments) {
      this.setState({ showComments: false });
    } else {
      this.setState({ showComments: true });
      this.scrollToSection();
    }
  };
  componentDidMount = async () => {
    this.setState({ currentItem: this.props.currentProduct });

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
      this.setState({ loaded: true });
    } else {
      console.log(res);
    }
  };
  render() {
    return (
      <>
        <Container className="productContainer1  mt-5">
          <Row>
            <Col sm={6}>
              <Row className="d-flex justify-content-left">
                <img
                  className="modalImg shadow-lg p-3 mb-5 bg-white rounded"
                  src={this.props.products.currentProduct.image}
                />
              </Row>
            </Col>
            <Col sm={6}>
              <Row className="headingContainer d-flex justify-content-left">
                {this.props.products.currentProduct.productName}
              </Row>
              <Row
                sm={12}
                className="headingModal2 d-flex justify-content-left mt-4"
              >
                <strong> Описание </strong>
              </Row>

              <Row className="d-flex justify-content-left mb-3">
                {this.props.products.currentProduct.productDescription}
              </Row>
              <Row sm={12} className=" d-flex justify-content-left ">
                <strong> Manifactured by: </strong>{" "}
                <p className="ml-2">
                  {this.props.products.currentProduct.manifacturedBy ===
                  "Видима" ? (
                    <img
                      className="brandImg"
                      src="https://siko.bg/media/attributesplash/vidima_logo.png"
                    />
                  ) : (
                    "No info"
                  )}{" "}
                </p>
              </Row>

              <Row sm={12} className=" d-flex justify-content-left ">
                <strong> Collection: </strong>{" "}
                <p className="ml-2">
                  {this.props.products.currentProduct.category_collection}{" "}
                </p>
              </Row>
              <Row sm={12} className=" d-flex justify-content-left ">
                <strong> Color: </strong> <p className="ml-2"> No info </p>
              </Row>
              <Row sm={12} className=" d-flex justify-content-left ">
                <strong> Product weight: </strong>{" "}
                <p className="ml-2"> No info </p>
              </Row>
              <Row sm={12} className=" d-flex justify-content-left ">
                <strong>Price: </strong>{" "}
                <p className="price ml-2">
                  {" "}
                  {this.props.products.currentProduct.productPrice} лв.{" "}
                </p>
              </Row>
              <Row className=" ">
                <Col sm={12} className="d-flex justify-content-center">
                  <Button
                    className="seeReviews2"
                    onClick={() => this.handleCommentSection()}
                  >
                    {this.state.showComments ? "Hide Reviews" : "See Reviews"}{" "}
                  </Button>{" "}
                  <Button
                    variant="success"
                    onClick={() =>
                      this.addToBasket(this.props.products.currentProduct)
                    }
                  >
                    {this.state.loadingAddingToBasket ? (
                      <img
                        src="https://i.gifer.com/ZZ5H.gif"
                        className="loadComment"
                      />
                    ) : (
                      <MdAddShoppingCart />
                    )}
                    Add to cart
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <Container
          className={this.state.showComments ? "commentSection" : "d-none"}
        >
          <p className="ml-1">
            {this.state.showComments &&
            this.props.products.currentProduct.comments.length === 0
              ? "Be the first one to leave a Review"
              : ""}
          </p>

          <div className="textInput mb-1">
            <Row>
              <strong>Rating</strong>{" "}
            </Row>
            {this.state.edittingComment ? (
              <Row className="mb-2 ">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </Row>
            ) : (
              <Row className="mb-2 ">
                <AiFillStar
                  className={this.state.firstStar}
                  onClick={() => this.setRate(1)}
                />
                <AiFillStar
                  className={this.state.secondStar}
                  onClick={() => this.setRate(2)}
                />
                <AiFillStar
                  className={this.state.thirdStar}
                  onClick={() => this.setRate(3)}
                />
                <AiFillStar
                  className={this.state.fourthStar}
                  onClick={() => this.setRate(4)}
                />
                <AiFillStar
                  className={this.state.fifthStar}
                  onClick={() => this.setRate(5)}
                />
                <TiDelete
                  className={
                    this.state.showDeleteRating ? "ml-2 deleteRating" : "d-none"
                  }
                  onClick={() => this.deleteRating()}
                />
              </Row>
            )}

            <Row>
              <strong>Review Title</strong>{" "}
            </Row>
            <Row>
              <input
                className="titleInput"
                onChange={(e) => this.changeTitle(e)}
              />
            </Row>
            <Row className="mt-2">
              <strong>Review </strong>{" "}
            </Row>
            <Row>
              <textarea
                className="reviewInput"
                onChange={(e) => this.changeComment(e)}
              />
            </Row>
            <Row>
              <Button
                variant="secondary"
                className="addCommentBtn"
                onClick={() => this.addComment()}
              >
                {this.state.addingComment ? (
                  <img
                    src="https://i.gifer.com/ZZ5H.gif"
                    className="loadComment"
                  />
                ) : (
                  "Submit Review"
                )}
              </Button>
            </Row>
          </div>
          {this.state.showComments &&
            this.props.products.currentProduct.comments.map((comment) => (
              <>
                <Row className="mainCommentRow mt-1">
                  <Row>
                    <Col sm={4}>
                      <p className="imageComment"> {comment.user[0]} </p>{" "}
                    </Col>
                    <Col sm={8} className="col2">
                      {this.state.commentToEditId === comment.id &&
                      this.state.edittingComment ? (
                        <Row className="ratingRow d-flex justify-content-left">
                          <AiFillStar
                            className={this.state.firstStar}
                            onClick={() => this.setRate(1)}
                          />
                          <AiFillStar
                            className={this.state.secondStar}
                            onClick={() => this.setRate(2)}
                          />
                          <AiFillStar
                            className={this.state.thirdStar}
                            onClick={() => this.setRate(3)}
                          />
                          <AiFillStar
                            className={this.state.fourthStar}
                            onClick={() => this.setRate(4)}
                          />
                          <AiFillStar
                            className={this.state.fifthStar}
                            onClick={() => this.setRate(5)}
                          />
                        </Row>
                      ) : (
                        <Row className="ratingRow d-flex justify-content-left">
                          {comment.rate === "1" ? (
                            <>
                              <AiFillStar className="star" /> <AiFillStar />{" "}
                              <AiFillStar />
                              <AiFillStar />
                              <AiFillStar />{" "}
                            </>
                          ) : (
                            ""
                          )}
                          {comment.rate === "2" ? (
                            <>
                              {" "}
                              <AiFillStar className="star" />
                              <AiFillStar className="star" />
                              <AiFillStar />
                              <AiFillStar />
                              <AiFillStar />{" "}
                            </>
                          ) : (
                            ""
                          )}
                          {comment.rate === "3" ? (
                            <>
                              {" "}
                              <AiFillStar className="star" />
                              <AiFillStar className="star" />
                              <AiFillStar className="star" /> <AiFillStar />
                              <AiFillStar />
                            </>
                          ) : (
                            ""
                          )}
                          {comment.rate === "4" ? (
                            <>
                              {" "}
                              <AiFillStar className="star" />
                              <AiFillStar className="star" />
                              <AiFillStar className="star" />
                              <AiFillStar className="star" /> <AiFillStar />
                            </>
                          ) : (
                            ""
                          )}
                          {comment.rate === "5" ? (
                            <>
                              {" "}
                              <AiFillStar className="star" />
                              <AiFillStar className="star" />
                              <AiFillStar className="star" />
                              <AiFillStar className="star" />{" "}
                              <AiFillStar className="star" />
                            </>
                          ) : (
                            ""
                          )}

                          <h className="date"> {comment.date} </h>
                          {comment.user === localStorage.getItem("user") ? (
                            <RiDeleteBin6Fill
                              className="deleteComment"
                              onClick={() => this.deleteComment(comment.id)}
                            />
                          ) : (
                            ""
                          )}
                          {comment.user === localStorage.getItem("user") ? (
                            <BiEditAlt
                              className="editComment"
                              onClick={() => this.editComment(comment.id)}
                            />
                          ) : (
                            ""
                          )}
                        </Row>
                      )}
                      <Row>
                        {" "}
                        <p className="commentUser">
                          <strong> {comment.user}</strong>{" "}
                        </p>{" "}
                      </Row>
                    </Col>
                  </Row>
                </Row>
                <Row className="commentTitle">
                  {this.state.commentToEditId === comment.id &&
                  this.state.edittingComment ? (
                    <>
                      <textarea
                        className="reviewTitleInputEdit mb-2"
                        onChange={(e) => this.changeTitle(e)}
                        defaultValue={comment.title}
                      />
                    </>
                  ) : (
                    <strong> {comment.title}</strong>
                  )}
                </Row>
                {this.state.commentToEditId === comment.id &&
                this.state.edittingComment ? (
                  <>
                    <textarea
                      className="reviewInputEdit"
                      onChange={(e) => this.changeComment(e)}
                      defaultValue={comment.text}
                    />
                    <Row>
                      <Col sm={6}>
                        {" "}
                        <button
                          className="editCommentBtn"
                          onClick={() => this.applyChangesComment()}
                        >
                          Edit comment{" "}
                        </button>
                      </Col>

                      <Col sm={6}>
                        {" "}
                        <button
                          className="cancleEdit"
                          onClick={() => this.cancleEdit()}
                        >
                          Cancle edtting{" "}
                        </button>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <Row className="commentText2 mb-4">{comment.text}</Row>
                )}
              </>
            ))}
        </Container>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
