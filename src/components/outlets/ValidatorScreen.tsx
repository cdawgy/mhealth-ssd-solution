import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { connectToRoom, updateState } from "../../utils/WebSocketUtils";
import { useEffect, useState } from "react";
import { GameState } from "../../types/GameState";
import { INITIAL_GAME_STATE } from "../../constants/GameConstants";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import "../../css/components/outlets/authenticated/ValidatorScreen.css";
import plus from "../../assets/validator-plus.svg";
import minus from "../../assets/validator-minus.svg";

const ValidatorScreen = () => {
  let { roomCode } = useParams();
  const [cachedGameState, setCachedGameState] = useState(INITIAL_GAME_STATE);
  const [gamePlaying, setGamePlaying] = useState(false);
  const [wordEventCount, setWordEventCount] = useState(0);

  let hasConnected = false;
  useEffect(() => {
    (() => {
      if (!hasConnected) {
        hasConnected = true;
        cachedGameState.validatorConnected = hasConnected;
        setCachedGameState(cachedGameState);
        roomCode = roomCode ? roomCode : "0";
        connectToRoom(handleStateChange, parseInt(roomCode));
      }
    })();
  }, []);

  const startGame = () => {
    if (roomCode) {
      setCachedGameState((prevState) => ({ ...prevState, childPlaying: true }));
      setGamePlaying(true);
      cachedGameState.childPlaying = true;
      updateState(roomCode, cachedGameState);
    }
  };

  const sendWordEventData = () => {
    if (roomCode) {
      const total =
        cachedGameState.wordEventAttemptedWordCount + wordEventCount;
      setCachedGameState((prevState) => ({
        ...prevState,
        childPlaying: true,
        successfulWordEven: true,
        wordEventAttemptedWordCount: total,
      }));
      cachedGameState.childPlaying = true;
      cachedGameState.successfulWordEvent = true;
      cachedGameState.wordEventAttemptedWordCount = total;
      updateState(roomCode, cachedGameState);
    }
  };

  const addToWordCount = () => {
    const newWordCount = wordEventCount + 1;
    setWordEventCount(newWordCount);
    // const total = cachedGameState.wordEventAttemptedWordCount + newWordCount;
    // setCachedGameState((prevState) => ({
    //   ...prevState,
    //   wordEventAttemptedWordCount: newWordCount,
    // }));
  };

  const minusToWordCount = () => {
    const newWordCount = wordEventCount - 1;
    setWordEventCount(newWordCount);
    // setCachedGameState((prevState) => ({
    //   ...prevState,
    //   wordEventAttemptedWordCount: newWordCount,
    // }));
  };

  const handleStateChange = (gameState: GameState) => {
    setCachedGameState(gameState);
  };

  const displayWaitingForChild: string = cachedGameState.childPlaying
    ? "block"
    : "none";
  const displayWordEventUI: string =
    !cachedGameState.childPlaying && gamePlaying ? "block" : "none";
  const displayStartGameButton: string = gamePlaying ? "none" : "block";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="guttering">
        <h1 className="font-blue">Validator</h1>
        <Alert key="info" variant="info">
          You are now connected to childs game session. This screen will contain
          prompts to aid them in their experience.
        </Alert>

        {/* On start 'Start Game' */}
        <Row style={{ display: displayStartGameButton }}>
          <Col xs={12}>
            <div className="create-resource box-shadow" onClick={startGame}>
              <p>Start Game</p>
            </div>
          </Col>
        </Row>

        {/* Main Validator Menu */}
        <Row style={{ display: displayWaitingForChild }}>
          <Col className="text-center mt-5">
            <Spinner animation="border" role="status" variant="info">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Waiting on child interaction...</p>
          </Col>
        </Row>

        <div style={{ display: displayWordEventUI }}>
          <Row>
            <Col xs={12}>
              <p>Word count:</p>
              <div className="counter">
                <img onClick={minusToWordCount} src={minus} alt="minus" />
                <p className="value title-font">{wordEventCount}</p>
                <img onClick={addToWordCount} src={plus} alt="plus" />
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <p>End word event?</p>
              <button onClick={sendWordEventData}>Yes</button>
              <button>No</button>
            </Col>
          </Row>
        </div>
      </div>
    </motion.div>
  );
};

export default ValidatorScreen;
