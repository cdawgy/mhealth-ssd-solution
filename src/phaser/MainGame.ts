import WordSelectMenu from "./WordSelectMenu";
import { ButtonStyles, TitleStyles } from "./GameStyles";
import { addCentreTextToScene } from "./utils/TextUtils";
import { exitGame, navigateToNewScene } from "./utils/NavigationUtils";
import { localStorageGet } from "../utils/LocalStorageUtils";
import { PRESCRIPTION_META_DATA_ID } from "../constants/GameConstants";
import { Prescription } from "../types/Prescription";

export default class MainGame extends Phaser.Scene {
  public static MAIN_GAME_SCENE_ID = "maingame";
  constructor() {
    super(MainGame.MAIN_GAME_SCENE_ID);
  }

  init() {}

  preload() {
    this.load.image(
      "background",
      "https://2.bp.blogspot.com/-3-bkBLwA_Bk/VaTNgW4XoEI/AAAAAAAAE_8/hHO-ZQz83OI/s1600/tile_grass_v01bs.png"
    );
  }

  create() {
    const { width, height } = this.sys.game.canvas;
    this.add.tileSprite(0, 0, width, height, "background").setOrigin(0);
    addCentreTextToScene(this, "Main Game", TitleStyles, 0, -100);
    const prescriptionMetaData = localStorageGet(
      PRESCRIPTION_META_DATA_ID
    ) as Prescription;
    addCentreTextToScene(
      this,
      prescriptionMetaData.sessionWordSetTitle,
      TitleStyles
    );
  }

  update(time: number, delta: number): void {}
}
