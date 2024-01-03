import WordSelectMenu from "./WordSelectMenu";
import { ButtonStyles, SideTextStyles, TitleStyles } from "./GameStyles";
import { addCentreTextToScene } from "./utils/TextUtils";
import { exitGame, navigateToNewScene } from "./utils/NavigationUtils";
import MainMenu from "./MainMenu";
import { GameCompletedState } from "../types/GameCompletedState";
import { localStorageGet } from "../utils/LocalStorageUtils";
import { GAME_COMPLETED_DATA } from "../constants/GameConstants";
import axios from "axios";
import { getBaseUrl } from "../utils/BaseUrlUtils";
import { ACCOUNT_ID } from "../constants/LocalStorageConstants";

export default class GameFinished extends Phaser.Scene {
  public static GAME_FINISHED_SCENE_ID = "gamefinished";
  private gameCompletedState: GameCompletedState;
  constructor() {
    super(GameFinished.GAME_FINISHED_SCENE_ID);
    this.gameCompletedState = {
      isBonusAchieved: false,
    };
  }

  init() {
    this.gameCompletedState = localStorageGet(GAME_COMPLETED_DATA);
  }

  preload() {
    this.load.image(
      "background",
      "https://2.bp.blogspot.com/-3-bkBLwA_Bk/VaTNgW4XoEI/AAAAAAAAE_8/hHO-ZQz83OI/s1600/tile_grass_v01bs.png"
    );
  }

  create() {
    const { width, height } = this.sys.game.canvas;
    this.add.tileSprite(0, 0, width, height, "background").setOrigin(0);
    addCentreTextToScene(this, "Session Complete!", TitleStyles, 0, -100);

    addCentreTextToScene(
      this,
      "Game Complete: 1 point",
      SideTextStyles,
      0,
      -30
    );
    const bonusText = this.gameCompletedState.isBonusAchieved
      ? "1 point"
      : "0 points";
    addCentreTextToScene(this, `Bonus: ${bonusText}`, SideTextStyles, 0, 10);

    const playButton = addCentreTextToScene(
      this,
      "Main Menu",
      ButtonStyles,
      0,
      80
    );
    playButton.on("pointerdown", async () => {
      // const pointsToAdd = this.gameCompletedState.isBonusAchieved ? 2 : 1;
      // await axios.post(
      //   `${getBaseUrl()}/account/points`,
      //   {
      //     accountId: localStorageGet(ACCOUNT_ID),
      //     points: pointsToAdd,
      //   },
      //   {
      //     headers: {
      //       "Access-Control-Allow-Origin": "*",
      //     },
      //   }
      // );
      this.scene.start(MainMenu.MAIN_MENU_SCENE_ID);
    });
  }

  update(time: number, delta: number): void {}
}
