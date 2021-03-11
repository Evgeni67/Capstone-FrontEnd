import "bootstrap/dist/css/bootstrap.css";
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
import { BsSearch } from "react-icons/bs";
import "./styles/navbar.css"
class MyNavbar extends Component {
    render(){
  return (
    <>
      {" "}
<Row>
<Col className="d-flex justify-content-center" sm={4}>
  <h className="logoText">L.O.G.O. </h>
</Col>
<Col className="d-flex justify-content-center" sm={1}>
  <h className="navText">За нас </h>
</Col>
<Col className="d-flex justify-content-center" sm={1}>
  <h className="navText"> Идеи</h>
</Col>
<Col className="d-flex justify-content-center" sm={1}>
  <h className="navText">Каталог </h>
</Col>
<Col className="d-flex justify-content-center" sm={1}>
  <h className="navText">Любими </h>
</Col>
<Col className="d-flex justify-content-center" sm={1}>
  <h className="navText">Кошница </h>
</Col>
<Col className="d-flex justify-content-center" sm={3}>
  <BsSearch className="searchForm mr-3" />
  <input className="searchForm" type="text" id="fname" name="fname" />
</Col>
</Row>
</>
  
  );
}
}

export default MyNavbar;
