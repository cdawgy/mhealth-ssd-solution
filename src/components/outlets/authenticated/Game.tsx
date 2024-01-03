import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  connectToRoom,
  disconnectFromRoom,
  stompClient,
} from "../../../utils/WebSocketUtils";
import { getBaseUrl } from "../../../utils/BaseUrlUtils";
import QRCode from "react-qr-code";
import { useNavigate, useParams } from "react-router-dom";
import { GameState } from "../../../types/GameState";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import NavigationBar from "../../navigation/Navbar";
import { localStorageStore } from "../../../utils/LocalStorageUtils";
import {
  CACHED_GAME_STATE,
  CACHED_ROOM_CODE,
} from "../../../constants/GameConstants";

const Game = () => {
  const BASE_ROOM_URL = "https://dd31-81-107-5-158.ngrok-free.app/game/validator/";
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  let hasConnected = false;
  useEffect(() => {
    (() => {
      if (!hasConnected) {
        hasConnected = true;
        const code = connectToRoom(gameStateListener);
        setRoomCode(code);
        localStorageStore(CACHED_ROOM_CODE, code);
      }
    })();
  }, []);

  const gameStateListener = (gameState: GameState) => {
    if (gameState.validatorConnected) {
      localStorageStore(CACHED_GAME_STATE, gameState);
      disconnectFromRoom();
      navigate("/game/play");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavigationBar />
      <div className="guttering">
        <h1 className="font-blue">Scan!</h1>
        <Row>
          <Col xs={12} className="text-center mt-3">
            <Alert key="info" variant="info">
              Please get your parent to scan the below QR code on their camera.
              They can then start the game!
            </Alert>
            <QRCode
              size={256}
              style={{ height: "200px", width: "auto" }}
              value={`${BASE_ROOM_URL}${roomCode}`}
              viewBox={`0 0 256 256`}
            />
            <p>Room Code: {roomCode}</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-5">
            <Spinner animation="border" role="status" variant="info">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Waiting on parent to connect...</p>
          </Col>
        </Row>
      </div>
    </motion.div>
  );
};

export default Game;
