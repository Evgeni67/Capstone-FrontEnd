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
import "./styles/contacts.css";
import { connect } from "react-redux";
const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({});
class Contacts extends Component {
  state = {showMap:false};

  componentDidMount = async () => {
    var that = this;
    setTimeout(function () {
      that.setState({showMap:true})
    }, 1050);

  };
  render() {
    return (
      <>
        <Container className="container1">
          <Row className="mt-5 mb-5">
            <Col sm={6}>
              {this.state.showMap ? (   ""
              ) : (<img src="https://studio.code.org/v3/assets/hDNGCz0MfJ-xlRq6yeKqI69d0m9QDG8RRIM23pMHlBk/loading-bar-1.gif" className = "mb-5 mt-2"/>)}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.016888238556!2d23.30954345532729!3d42.70336317222982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8544cd3aafe3%3A0x9b4abc734ddf9ea0!2z0YPQuy4g4oCe0KbQsNGAINCh0LjQvNC10L7QveKAnCAxNDMsIDEzMDMg0KbQtdC90YLRitGALCDQodC-0YTQuNGP!5e0!3m2!1sbg!2sbg!4v1617832317488!5m2!1sbg!2sbg"
                width="520"
                height="450"
                loading="eager"
                className = {this.state.showMap ? "map shadow-lg" : "map d-none"}
           />
            </Col>
            <Col sm={6}>
              <h5>Копанова Информационни Технологии ЕООД</h5>
              <p className="mt-3">
                <strong>Централен офис:</strong>
              </p>
              <p className="address">ул. „Цар Симеон“ 143,</p>
              <p className="address">1303 Център, София</p>

              <p className="mt-3">
                <strong>Национален телефон</strong>
              </p>
              <p className="address">тел: -</p>
              <p className="address">моб: -</p>
              <p className="pricingCall">
                /На цената на един градски разговор при обаждане от цялата
                страна от стационарен телефон. При обаждане от мобилен телефон
                цената на разговора е според тарифния план./
              </p>
              <Row></Row>
            </Col>
          </Row>
        </Container>
        <Container className="container2">
          <Row className="textUs d-flex justify-content-center">Пишете ни</Row>
          <Row className=" d-flex justify-content-center mt-5">
            <Col sm={6}>
              {" "}
              <Row className="d-flex justify-content-center">Име: *</Row>
              <Row className="d-flex justify-content-center">
                <input className="input1 shadow-lg p-3  bg-white rounded" type="text" id="fname" name="fname" />
              </Row>
            </Col>
            <Col sm={6}>
              <Row className="d-flex justify-content-center"> E-mail: * </Row>
              <Row className="d-flex justify-content-center">
                {" "}
                <input className="input1 shadow-lg p-3  bg-white rounded" type="text " id="fname" name="fname" />
              </Row>
            </Col>
          </Row>
          <Row className=" d-flex justify-content-center mt-2">
            <Col sm={6}>
              {" "}
              <Row className="d-flex justify-content-center">Телефон: *</Row>
              <Row className="d-flex justify-content-center">
                {" "}
                <input className="input1 shadow-lg p-3  bg-white rounded" type="text" id="fname" name="fname" />
              </Row>
            </Col>
            <Col sm={6}></Col>
          </Row>
          <Row className=" d-flex justify-content-center mt-3">
            <Col sm={6} className=" d-flex justify-content-center">
              {" "}
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
                className="checkBox"
              />
              <label for="vehicle1" className="checkBoxText">
                {" "}
                Имам навършени 16 години{" "}
              </label>
            </Col>
            <Col sm={6} className=" d-flex justify-content-center">
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
                className="checkBox"
              />
              <label for="vehicle1" className="checkBoxText">
                {" "}
                Нямам навършени 16 години{" "}
              </label>
            </Col>
          </Row>
          <Row className=" d-flex justify-content-center mt-3">
            <Col sm={12} >
              {" "}
              <Row className="d-flex justify-content-center"> Относно: </Row>
              <Row className="d-flex justify-content-center">
                <input className="input2 shadow-lg p-3  bg-white rounded" type="text" id="fname" name="fname" />
              </Row>
            </Col>
          </Row>
          <Row className=" d-flex justify-content-center mt-3">
            <Col sm={12} >
              {" "}
              <Row className="d-flex justify-content-center">Съобщение: * </Row>
              <Row className="d-flex justify-content-center">
                <input className="input3 shadow-lg p-3  bg-white rounded" type="text" id="fname" name="fname" />
              </Row>
            </Col>
          </Row>
          <Row className=" d-flex justify-content-center mt-4">
            <Col sm={12} className=" d-flex justify-content-left">
              {" "}
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
                className="checkBox"
              />
              <label for="vehicle1" className="checkBoxText">
                {" "}
                Съгласен съм да получавам информация за отстъпки, промоции и маркетингови съобщения от LOGO.bg
              </label>
            </Col>
          </Row>
          <Row className=" d-flex justify-content-center mt-2">
            <Col sm={12} className=" d-flex justify-content-left">
              {" "}
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
                className="checkBox"
              />
              <label for="vehicle1" className="checkBoxText">
                {" "}
                Съгласен съм с Условията за ползване на сайта
              </label>
            </Col>
          </Row>
          <Row className=" d-flex justify-content-center mt-2">
            <Col sm={10} className=" d-flex justify-content-left">
              {" "}
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
                className="checkBox"
              />
              <label for="vehicle1" className="checkBoxText">
                {" "}
                Потвърждавам, че имам навършени 14 години
              </label>
            </Col>
            <Col sm = {2}
            >
                <p className = "sendBtn shadow-lg"> Send </p>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
