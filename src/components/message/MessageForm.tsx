import { Col, Row } from "react-bootstrap";
import "../../css/components/prescribe/PrescribeForm.css";
import React from "react";
import ParentSelect from "./ParentSelect";
import ResourceSelect from "./ResourceSelect";

class MessageForm extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedParent: "",
      selectedResource: "",
      messageBody: "",
    };
    this.stateHandler = this.stateHandler.bind(this);
  }

  stateHandler = (obj: any) => {
    this.setState(obj);
  };

  handleFormSubmit = () => {
    console.log(this.state);
  };

  messageBodyOnChange = (e: any) => {
    this.setState({
      messageBody: e.target.value,
    });
  };

  render() {
    return (
      <Col>
        <Row>
          <Col xs={12}>
            <label htmlFor="parent">Parent</label>
            <ParentSelect parentFormStateHandler={this.stateHandler} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <label htmlFor="resource">Resource</label>
            <ResourceSelect parentFormStateHandler={this.stateHandler} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <label htmlFor="resource">Message Body</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={5}
              onChange={this.messageBodyOnChange}
            ></textarea>
            <Col xs={12} className="text-center mt-4">
              <div
                onClick={this.handleFormSubmit}
                className="create-resource box-shadow"
              >
                <p>Send Message</p>
              </div>
            </Col>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default MessageForm;
