import { Col, Row } from "react-bootstrap";
import "../../css/components/prescribe/PrescribeForm.css";
import ChildSelect from "./ChildSelect";
import WordPairSelect from "./WordPairSelect";
import React from "react";
import { PrescribeFormState } from "../../types/PerscribeFormState";

class PrescribeForm extends React.Component<{}, PrescribeFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedChild: "",
      sessionTime: "",
      wordAttempts: "",
      wordPairs: "",
    };
    this.stateHandler = this.stateHandler.bind(this);
  }

  stateHandler = (obj: any) => {
    this.setState(obj);
  };

  handleFormSubmit = () => {
    console.log(this.state);
  };

  sessionTimeOnChange = (event: any) => {
    this.setState({
      sessionTime: event.target.value,
    });
  };

  wordAttemptsOnChange = (event: any) => {
    this.setState({
      wordAttempts: event.target.value,
    });
  };

  render() {
    return (
      <Col>
        <Row>
          <Col xs={12}>
            <label htmlFor="parent">Child</label>
            <ChildSelect parentFormStateHandler={this.stateHandler} />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <label htmlFor="time">
              Session Time <em>/ mins</em>
            </label>
            <input
              onChange={this.sessionTimeOnChange}
              id="time"
              type="text"
              className="box-shadow"
            />
          </Col>
          <Col xs={6}>
            <label htmlFor="attempts">Word Attempts</label>
            <input
              onChange={this.wordAttemptsOnChange}
              id="attempts"
              type="text"
              className="box-shadow"
            />
          </Col>
        </Row>
        <Row>
          <p>Word Pairs</p>
          <WordPairSelect parentFormStateHandler={this.stateHandler} />
          <Col xs={12} className="text-center mt-4">
            <div
              onClick={this.handleFormSubmit}
              className="create-resource box-shadow"
            >
              <p>Prescribe</p>
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default PrescribeForm;
