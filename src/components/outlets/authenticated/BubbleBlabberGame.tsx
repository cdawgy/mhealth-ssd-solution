import { motion } from "framer-motion";
import "../../../css/components/outlets/authenticated/BubbleBlabberGame.css";
import { Col, Row } from "react-bootstrap";
import title from "../../../assets/bubble-blaber/title-sm.png";
import car from "../../../assets/bubble-blaber/car.png";
import { useState } from "react";

const BubbleBlabberGame = () => {
  const [tapCount, setTapCount] = useState(0);
  const [bubbleSize, setBubbleSize] = useState(200);

  const handleTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    const newBubbleSize = bubbleSize * 1.02;
    setBubbleSize(newBubbleSize);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <Row>
          <Col xs={12}>
            <img src={title} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="bubble-container">
              <div className="bubble float">
                <p>Car</p>
              </div>
              <div
                className="image float"
                style={{
                  background: `url(${car})`,
                  height: bubbleSize,
                  width: bubbleSize,
                }}
                onClick={() => handleTap()}
              ></div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <div className="bubble float">
              <p>Taps</p>
            </div>
          </Col>
          <Col xs={6}>
            <div className="bubble float">
              <p>{tapCount}</p>
            </div>
          </Col>
        </Row>
      </div>
    </motion.div>
  );
};

export default BubbleBlabberGame;
