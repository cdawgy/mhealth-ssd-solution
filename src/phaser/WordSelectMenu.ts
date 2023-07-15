import { ButtonStyles, TitleStyles } from "./GameStyles";
import PrescriptionsMenu from "./Prescriptions";
import { navigateToNewScene } from "./utils/NavigationUtils";
import { addCentreTextToScene, addTextToScene } from "./utils/TextUtils";

export default class WordSelectMenu extends Phaser.Scene {
  public static WORD_SELECT_SCENE_ID = "wordselect";
  constructor() {
    super(WordSelectMenu.WORD_SELECT_SCENE_ID);
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
    this.add
      .tileSprite(0, 0, width, height, "background")
      .setOrigin(0)
      .setName("tiley");
    addTextToScene(this, "Select Word Set", TitleStyles, 30, 20);
    const playButton = addTextToScene(
      this,
      "Prescriptions",
      ButtonStyles,
      30,
      100
    );
    playButton.on("pointerdown", () => {
      navigateToNewScene(this, PrescriptionsMenu.PRESCRIPTIONS_SCENE_ID);
    });
  }

  update(time: number, delta: number): void {}
}
