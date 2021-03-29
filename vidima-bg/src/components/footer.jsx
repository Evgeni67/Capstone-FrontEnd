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
import "./styles/footer.css";
import { SiTwitter } from "react-icons/si";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";

class MyFooter extends Component {
  render() {
    return (
      <>
          <Row className = "footer">
              <Col sm={1} className = "alignCol"/>
            <Col sm={3} s={0} className="leftColFooter">
              <Row className="footerText privacyPolicyRow d-flex justify-content-center">
                PRIVACY POLICY
              </Row>
              <Row className="footerText d-flex justify-content-center mt-3">
                TERMS & CONDITIONS
              </Row>
              <Row className="footerText d-flex justify-content-center mt-3">
                ABOUT
              </Row>
            </Col>
            <Col sm={4} xs={12}>
              <Row className="footerLogoRow d-flex justify-content-center">
                {" "}
                <h5 className="footerLogo">L.O.G.O.</h5>
              </Row>

              <Row className="mt-5">
                <Col
                  sm={4}
                  className="socialMediaBtn d-flex justify-content-center"
                >
                  <SiTwitter />
                </Col>
                <Col
                  sm={4}
                  className="socialMediaBtn d-flex justify-content-center"
                >
                  <AiFillFacebook />
                </Col>
                <Col
                  sm={4}
                  className="socialMediaBtn d-flex justify-content-center"
                >
                  <AiFillInstagram />
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="borderCol" />
                <Col sm={6} />
              </Row>
              <Row className="weekleyNewsletterText d-flex justify-content-center">
                {" "}
                WEEKLY NEWSLETTER{" "}
              </Row>
              <Row className = "mt-4">
              <input className = "emailSubscriptionInput text-align-center"type="text" id="fname" name="fname" defaultValue="NAME@EMAIL.COM" />
              <button className ="subscribeBtn" >SUBSCRIBE</button>
                  </Row>
                  <Row className ="copyright d-flex justify-content-center">
                  © 2021 │ WHY L.O.G.O?
                  </Row>
            </Col>
            <Col sm={3} s={0} className="rightColFooter">
              {" "}
              <Row className="footerText shippingInfoRow d-flex justify-content-center ">
                SHIPPING INFO
              </Row>
              <Row className="footerText d-flex justify-content-center mt-3">
                RETURNS / EXCHANGES
              </Row>
              <Row className="footerText d-flex justify-content-center mt-3">
                CONTACT
              </Row>
            </Col>
            <Col sm={1} className = "alignCol"/>
          </Row>
      </>
    );
  }
}

export default MyFooter;
