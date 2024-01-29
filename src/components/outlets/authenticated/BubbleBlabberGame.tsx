import { motion } from "framer-motion";
import "../../../css/components/outlets/authenticated/BubbleBlabberGame.css";
import { Col, Row } from "react-bootstrap";
import title from "../../../assets/bubble-blaber/title-sm.png";

import call from "../../../assets/bubble-blaber/game-words/call.jpg";
import cap from "../../../assets/bubble-blaber/game-words/cap.jpg";
import key from "../../../assets/bubble-blaber/game-words/key.jpg";
import tall from "../../../assets/bubble-blaber/game-words/tall.jpg";
import tap from "../../../assets/bubble-blaber/game-words/tap.jpg";
import tea from "../../../assets/bubble-blaber/game-words/tea.jpg";

import { useState } from "react";
import { useNavigate } from "react-router";

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

const gameTapLimit = getRandomArbitrary(8, 15);
const listOfGameWords = [
  { word: "call", img: call },
  { word: "cap", img: cap },
  { word: "key", img: key },
  { word: "tall", img: tall },
  { word: "tap", img: tap },
  { word: "tea", img: tea },
];

const BubbleBlabberGame = () => {
  const navigate = useNavigate();
  const [tapCount, setTapCount] = useState(0);
  const [bubbleSize, setBubbleSize] = useState(200);
  const [gameImage, setImage] = useState(call);
  const [gameWord, setWord] = useState("call");

  const handleTap = () => {
    if (tapCount < gameTapLimit) {
      const newCount = tapCount + 1;
      setTapCount(newCount);

      const newBubbleSize = bubbleSize * 1.02;
      setBubbleSize(newBubbleSize);

      const randomIndex = getRandomArbitrary(0, listOfGameWords.length);
      const word = listOfGameWords[randomIndex];
      setWord(word.word);
      setImage(word.img);
    } else {
      const floaters = document.getElementsByClassName("float");
      for (let i = 0; i < floaters.length; i++) {
        const element = floaters[i];
        element.className += " pop";
      }

      setTimeout(() => {
        const element = document.getElementById("endscreen");
        const endScreen: HTMLElement =
          element == null ? ({} as HTMLElement) : element;
        endScreen.className += " show";

        const element2 = document.getElementById("exitbutton");
        const exitButton: HTMLElement =
          element2 == null ? ({} as HTMLElement) : element2;
        exitButton.className += " show";
      }, 1500);
    }
  };

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
            <div className="bubble-container">
              <div className="bubble float">
                <p>{gameWord}</p>
              </div>
              <div
                className="image float"
                style={{
                  background: `url(${gameImage})`,
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
        <Row>
          <Col xs={6}>
            <div id="endscreen" className="bubble hide">
              <p>Game Over!</p>
            </div>
          </Col>
          <Col xs={6}>
            <div
              id="exitbutton"
              className="bubble hide"
              onClick={() => navigate("/marketplace/bubble-blabber")}
            >
              <p>Menu</p>
            </div>
          </Col>
        </Row>
      </div>
    </motion.div>
  );
};

export default BubbleBlabberGame;
