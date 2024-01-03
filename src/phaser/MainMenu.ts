import WordSelectMenu from "./WordSelectMenu";
import { ButtonStyles, TitleStyles } from "./GameStyles";
import { addCentreTextToScene } from "./utils/TextUtils";
import { exitGame, navigateToNewScene } from "./utils/NavigationUtils";
import VoiceRecorder from "./component/VoiceRecorder";

export default class MainMenu extends Phaser.Scene {
  public static MAIN_MENU_SCENE_ID = "mainmenu";
  constructor() {
    super(MainMenu.MAIN_MENU_SCENE_ID);
  }

  init() {}

  preload() {
    this.load.image(
      "background",
      "https://2.bp.blogspot.com/-3-bkBLwA_Bk/VaTNgW4XoEI/AAAAAAAAE_8/hHO-ZQz83OI/s1600/tile_grass_v01bs.png"
    );
  }

  create() {
    // const voiceRecorder = new VoiceRecorder();
    // voiceRecorder.threadSafeInit();
    const { width, height } = this.sys.game.canvas;
    this.add.tileSprite(0, 0, width, height, "background").setOrigin(0);
    addCentreTextToScene(this, "Metal Muncher", TitleStyles, 0, -100);

    const playButton = addCentreTextToScene(this, "Play", ButtonStyles);
    playButton.on("pointerdown", () => {
      navigateToNewScene(this, WordSelectMenu.WORD_SELECT_SCENE_ID);
    });

    const exitButton = addCentreTextToScene(this, "Exit", ButtonStyles, 0, 65);
    exitButton.on("pointerdown", () => {
      exitGame(this);
    });

    // const stop = addCentreTextToScene(this, "stop", ButtonStyles, 200, 140);
    // stop.on("pointerdown", () => {
    //   voiceRecorder.stopRecording();
    // });

    // const test = addCentreTextToScene(this, "start", ButtonStyles, 0, 140);
    // test.on("pointerdown", () => {
    //   voiceRecorder.startRecording();
    // });
  }

  update(time: number, delta: number): void {}
}
