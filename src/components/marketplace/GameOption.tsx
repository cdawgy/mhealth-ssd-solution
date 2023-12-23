import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type GameOptionProps = {
  backgroundImage: string;
  gameTitle: string;
};

const sanitizeTitleToUrlRedirect = (gameTitle: string): string => {
  return gameTitle.toLowerCase().replace(" ", "-");
};

const GameOption = (props: GameOptionProps) => {
  const navigate = useNavigate();
  const redirectUri = sanitizeTitleToUrlRedirect(props.gameTitle);
  return (
    <Row
      className="game-option"
      onClick={() => {
        navigate(redirectUri);
      }}
    >
      <Col
        xs={3}
        className="game-pic"
        style={{ backgroundImage: `url(${props.backgroundImage})` }}
      ></Col>
      <Col xs={9}>
        <h4 className="game-title">{props.gameTitle}</h4>
      </Col>
    </Row>
  );
};

export default GameOption;
