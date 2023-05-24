import { Col, Row } from "react-bootstrap";
import "../../css/components/prescribe/PrescribeForm.css";
import ChildSelect from "./ChildSelect";
import WordPairSelect from "./WordPairSelect";

const PrescribeForm = () => {
  return (
    <Col>
      <Row>
        <Col xs={12}>
          <label htmlFor="parent">Child</label>
          <ChildSelect />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <label htmlFor="time">
            Session Time <em>/ mins</em>
          </label>
          <input id="time" type="text" className="box-shadow" />
        </Col>
        <Col xs={6}>
          <label htmlFor="attempts">Word Attempts</label>
          <input id="attempts" type="text" className="box-shadow" />
        </Col>
      </Row>
      <Row>
        <p>Word Pairs</p>
        <WordPairSelect />
        <Col xs={12} className="text-center mt-4">
          <div className="create-resource box-shadow">
            <p>Prescribe</p>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default PrescribeForm;
