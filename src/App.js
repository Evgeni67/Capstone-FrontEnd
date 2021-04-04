import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
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
import React, { Component } from "react";
import MyNavbar from "./components/navbar";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import MyFooter from "./components/footer";
import Catalog from "./components/catalog";
import ShoppingCart from "./components/shoppingCart"
class App extends Component {
  render() {
    return (
      <>
        {" "}
        <Router>
          <MyNavbar />
          <Route path="/home">
            {" "}
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/catalog">
            <Catalog />
          </Route>
          <Route path="/shoppingCart">
          <ShoppingCart/>
          </Route>
          <MyFooter />
        </Router>
      </>
    );
  }
}

export default App;
