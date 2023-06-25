import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { connectToRoom, updateState } from "../../utils/WebSocketUtils";
import { useEffect, useState } from "react";
import { GameState } from "../../types/GameState";
import { INITIAL_GAME_STATE } from "../../constants/GameConstants";

const ValidatorScreen = () => {
  let { roomCode } = useParams();
  const [cachedGameState, setCachedGameState] = useState(INITIAL_GAME_STATE);

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

  const sendMessage = () => {
    if (roomCode) {
      updateState(roomCode, cachedGameState);
    }
  };

  const handleStateChange = (gameState: GameState) => {
    console.log(`From React Component: ${gameState}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="guttering">
        <h1 className="font-blue">Validator</h1>
        <p>You are now connected to room: {roomCode}</p>
        <button onClick={sendMessage}>Ping player</button>
      </div>
    </motion.div>
  );
};

export default ValidatorScreen;
