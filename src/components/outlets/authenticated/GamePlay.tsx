import { useEffect } from "react";
import { config } from "../../../phaser/PhaserGameConfig";
import NavigationBar from "../../navigation/Navbar";
import "../../../css/components/outlets/authenticated/Game.css";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  localStorageGet,
  localStorageStore,
} from "../../../utils/LocalStorageUtils";
import { CACHED_GAME_STATE } from "../../../constants/GameConstants";

const addCustomConfig = (game: Phaser.Game, navigate: NavigateFunction) => {
  const tempConfig: any = game.config;
  tempConfig.navigate = navigate;
  tempConfig.gameState = localStorageGet(CACHED_GAME_STATE);
};

const GamePlay = () => {
  const navigate = useNavigate();
  // Weird Phaser config for React
  const phaserGameRef = React.useRef({} as Phaser.Game);
  useEffect(() => {
    if (phaserGameRef.current.isRunning) {
      return;
    }
    phaserGameRef.current = new Phaser.Game(config);
    addCustomConfig(phaserGameRef.current, navigate);
    return () => {
      phaserGameRef.current.destroy(true);
      phaserGameRef.current = {} as Phaser.Game;
    };
  }, []);

  return (
    <div>
      {/* <NavigationBar /> */}
      <div id="phaser-container"></div>
    </div>
  );
};

export default GamePlay;
