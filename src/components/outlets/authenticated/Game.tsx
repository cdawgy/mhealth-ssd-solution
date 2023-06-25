import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { connectToRoom, stompClient } from "../../../utils/WebSocketUtils";
import { getBaseUrl } from "../../../utils/BaseUrlUtils";
import QRCode from "react-qr-code";
import { useNavigate, useParams } from "react-router-dom";
import { GameState } from "../../../types/GameState";

const Game = () => {
  const navigate = useNavigate();
  const [validatorUrlWithRoomCode, setUrl] = useState("");
  let hasConnected = false;
  useEffect(() => {
    (() => {
      if (!hasConnected) {
        hasConnected = true;
        const roomCode = connectToRoom(gameStateListener);
        setUrl(`http://192.168.0.19:3000/game/validator/${roomCode}`);
      }
    })();
  }, []);

  const gameStateListener = (gameState: GameState) => {
    if (gameState.validatorConnected) {
      navigate("/game/play");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="guttering">
        <h1 className="font-blue">Scan!</h1>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={validatorUrlWithRoomCode}
          viewBox={`0 0 256 256`}
        />
        <p>Currently connected to room: {validatorUrlWithRoomCode}</p>
      </div>
    </motion.div>
  );
};

export default Game;
