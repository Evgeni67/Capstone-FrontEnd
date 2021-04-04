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
  Modal
} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import "./styles/catalog.css";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import { scroller } from "react-scroll";
import {GrBasket } from "react-icons/gr";
import {BsSearch } from "react-icons/bs";
import {connect } from "react-redux";
const mapStateToProps = (state) => state;
var uniqid = require("uniqid");
class Catalog extends Component {
  state = {
    categories: [],
    loading: true,
    showingCategories:false,
    regexCyrillic :/^[\u0400-\u04FF]+$/,//for later
    show:false,
    imgToInspect: "",
  };
  showCategories = () => {
    if(this.state.showingCategories === true) {
      this.setState({showingCategories:false})
    }else{
      this.setState({showingCategories:true})
    }
  }
  scrollToSection = (category) => {
    scroller.scrollTo(category.category_name, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
    if(this.state.showingCategories === true) {
      this.setState({showingCategories:false})
    }else{
      this.setState({showingCategories:true})
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
      window.alert("item added succesfully");
    } else {
      console.log(res);
    }
  };
  getImgSrc = (e) => {
    console.log(e.currentTarget.src)
    this.setState({imgToInspect:e.currentTarget.src})
    this.setState({show:true})
  }
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
       
   

        <Row
          className={
            this.state.loading ? " d-flex justify-content-center" : "d-none"
          }
        >
          <img src="https://studio.code.org/v3/assets/hDNGCz0MfJ-xlRq6yeKqI69d0m9QDG8RRIM23pMHlBk/loading-bar-1.gif" />{" "}
        </Row>
        {this.state.categories.map((x) => (
          <>
            <Row className="catalog1"> <Row className = "lineRow"/>
              <Col sm={12} className="categoryCol d-flex justify-content-center">
              <Row>
                <h className={x.category_name + " heading mb-5 "}>
                  {x.category_name}{" "} 
  
                </h>{" "}
                <Row>
                <BsSearch className="searchIcon" onClick = {() => this.showCategories()}/>
                <Container className={this.state.showingCategories ? "categoryNavbar " : "catNav"}>
          {this.props.products.allProducts
            .sort(function (a, b) {
              // ASC  -> a.length - b.length
              // DESC -> b.length - a.length
              return a.category_name.length - b.category_name.length;
            })
            .map((x) => (
              <>
                <Row className="navigationHeading d-flex justify-content-center mt-4 mb-4">
                <h onClick={() => this.scrollToSection(x)}>   {x.category_name}{" "} </h>
                
                </Row>{" "}
              </>
            ))}
           
        </Container>
        </Row>
        </Row>
              </Col>{" "}
            </Row>

            <Row className="products d-flex justify-content-center">
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
                        <img src={item.image} className="productImg" onClick = {(e)=> this.getImgSrc(e)}/>
                      </Row>
                      <Row className="productHeading d-flex justify-content-center">
                        <h className={item.heading}>{item.heading.slice(0,20) } </h>
                      </Row>
                      <Row className="price d-flex justify-content-center mt-2">
                        {item.price}
                      </Row>
                      <Row className="d-flex justify-content-center mt-2">
Brand: {item.brand}

                      </Row>
                      <Row className="d-flex justify-content-center mt-2">
                      Series: {item.series}
                      </Row>
                      <Row className="basket d-flex justify-content-center mt-0.5">
                        <GrBasket
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
         <Modal show={this.state.show} >
       
        <Modal.Body><img className ="inspectImg" src = {this.state.imgToInspect}/></Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick = {()=> this.setState({show:false})}>
              Close
            </Button>
            </Modal.Footer>
      </Modal>
      </>
    );
  }
}
export default connect(mapStateToProps)(Catalog);
