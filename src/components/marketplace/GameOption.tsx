import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../css/components/marketplace/GameOption.css";

const GameOption = (props: any) => {
  const navigate = useNavigate();
  const uri = props.title.toLowerCase().replace(" ", "-");
  return (
    <Row className="game-option-container" onClick={() => navigate(uri)}>
      <Col
        className="thumbnail"
        xs={3}
        style={{ backgroundImage: `url(${props.bg})` }}
      ></Col>
      <Col className="title-container" xs={9}>
        <p>{props.title}</p>
      </Col>
    </Row>
  );
};

export default GameOption;
