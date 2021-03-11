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
import "./styles/home.css";
class MyNavbar extends Component {
  state = {
    showMiniMarket: false,
  };
  showMiniMarket = () => {
    if (this.state.showMiniMarket) {
      this.setState({ showMiniMarket: false });
    } else {
      this.setState({ showMiniMarket: true });
    }
  };
  render() {
    return (
      <>
        {" "}
        <Row className="bathroomRow d-flex justify-content-right">
          <Col sm={4}></Col>
          <Col sm={8} className="colTry d-flex justify-content-right">
            <h5 className="headingText">
              GIFT YOURSELF THE ULTIMATE BATHROOM EXPERIENCE{" "}
            </h5>
            <img
              className="bathroomImage"
              src="https://www.luxurylifestylemag.co.uk/wp-content/uploads/2019/11/bigstock-d-Illustration-Of-Modern-Bath-291389890.jpg"
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <img
              className="bathroomImage2"
              src="http://cdn.home-designing.com/wp-content/uploads/2014/10/jungle-bathroom-design.jpeg"
              onClick={() => this.showMiniMarket()}
            />
          </Col>
          <Container
            className={
              this.state.showMiniMarket ? "miniMarket" : "closedMiniMarket"
            }
          >
            <Row className={this.state.showMiniMarket ? "mt-5":"d-none"}>
              <Col sm={8}>
                <Row className="ml-1">
                  <img
                    className="homePageAdImg"
                    src="https://prikachi.net/images/oIxFw.jpg"
                  />
                </Row>
                <Row className="mt-5 ml-1">
                  <Col sm={3}>
                    {" "}
                    <img
                      className="homePageAdImg"
                      src="https://prikachi.net/images/oINAc.jpg"
                    />
                  </Col>
                  <Col sm={9}>
                    <img
                      className="homePageAdImg ml-3"
                      src="https://prikachi.net/images/oISws.jpg"
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm={4}>
                <img
                  className="homePageAdImg"
                  src="https://prikachi.net/images/oIqLB.png"
                />
              </Col>
            </Row>
            <Row className = "codeBEIGE d-flex justify-content-center mt-5"><h5>Use code BEIGE for 20%</h5></Row>
          </Container>
        </Row>
      </>
    );
  }
}

export default MyNavbar;
