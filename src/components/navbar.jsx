
import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { scroller } from "react-scroll";
import { connect } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles/navbar.css"
const mapStateToProps = (state) => state;
class MyNavbar extends Component {
  state = {
    showingCategories:false
  }
  scrollToSection = (category) => {
    scroller.scrollTo(category.category_name, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  showCategories = () => {
    if(this.state.showingCategories === true) {
      this.setState({showingCategories:false})
    }else{
      this.setState({showingCategories:true})
    }
  }
    render(){
  return (
    <>
      {" "}
<Row>
<Col className="d-flex justify-content-center" sm={4} xs ={12}>
  <h className="logoText" >L.O.G.O. </h>
</Col>
<Col className="d-flex justify-content-center" sm={1} xs ={12}>
  <h className="navText">За нас </h>
</Col>
<Col className="d-flex justify-content-center" sm={1} xs ={12}>
  <h className="navText"> Идеи</h>
</Col>
<Col className="d-flex justify-content-center" sm={1} xs ={12}>
<Link className="navText" to = "/catalog">
  <h className="navText">Каталог </h>
  </Link>

</Col>
<Col className="d-flex justify-content-center" sm={1} xs ={12}>
  <h className="navText">Любими </h>
</Col>
<Col className="d-flex justify-content-center" sm={1} xs ={12}>

<Link className="navText" to = "/shoppingCart">
  <h className="navText">Кошница </h>
  </Link>

</Col>
<Col className="d-flex justify-content-center" sm={3}>
  <BsSearch className="searchForm mr-3" onClick = {() => this.showCategories()}/>
  <input className="searchForm" autocomplete="off" type="text" id="fname" name="fname" onClick = {() => this.showCategories()}/>
  <Container className={this.state.showingCategories ? "categoryNavbar" : "catNav"}>
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
</Col>

</Row>
</>
  
  );
}
}

export default connect(mapStateToProps)(MyNavbar);
