import { motion } from "framer-motion";
import "../../../css/components/outlets/authenticated/BubbleBlabberGame.css";
import { Col, Row } from "react-bootstrap";
import title from "../../../assets/bubble-blaber/title.png";
import { useNavigate } from "react-router-dom";

const BubbleBlabberMenu = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="game-container container">
        <Row>
          <Col xs={12}>
            <img src={title} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p className="game-button" onClick={() => navigate("game")}>
              Play
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p className="game-button" onClick={() => navigate("/marketplace")}>Exit</p>
          </Col>
        </Row>
      </div>
    </motion.div>
  );
};

export default BubbleBlabberMenu;
