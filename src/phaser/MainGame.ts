import WordSelectMenu from "./WordSelectMenu";
import { ButtonStyles, TitleStyles } from "./GameStyles";
import { addCentreTextToScene, addTextToScene } from "./utils/TextUtils";
import { exitGame, navigateToNewScene } from "./utils/NavigationUtils";
import { localStorageGet } from "../utils/LocalStorageUtils";
import {
  CACHED_ROOM_CODE,
  PRESCRIPTION_META_DATA_ID,
} from "../constants/GameConstants";
import { Prescription } from "../types/Prescription";
import { GameState } from "../types/GameState";
import { connectToRoom, updateState } from "../utils/WebSocketUtils";
import MeterBar from "./component/MeterBar";

export default class MainGame extends Phaser.Scene {
  public static MAIN_GAME_SCENE_ID = "maingame";
  private timeOfOverlap: number;
  private detector: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private hiddenWords: Phaser.Physics.Arcade.Group;
  private gameState: GameState;
  private wordCount: Phaser.GameObjects.Text;
  private wordCountBar: MeterBar;
  private prescriptionMetaData: Prescription;

  constructor() {
    super(MainGame.MAIN_GAME_SCENE_ID);
    this.timeOfOverlap = new Date().getSeconds();
    this.detector = {} as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    this.hiddenWords = {} as Phaser.Physics.Arcade.Group;
    this.gameState = {} as GameState;
    this.wordCount = {} as Phaser.GameObjects.Text;
    connectToRoom((gameState: GameState) => {
      this.gameState = gameState;
    }, localStorageGet(CACHED_ROOM_CODE));
    this.wordCountBar = new MeterBar(this, () => {
      console.log("bar full!");
    });
    this.prescriptionMetaData = localStorageGet(
      PRESCRIPTION_META_DATA_ID
    ) as Prescription;
  }

  init() {
    const tempConfig: any = this.game.config;
    this.gameState = tempConfig.gameState;
  }

  preload() {
    this.load.image(
      "background",
      "https://2.bp.blogspot.com/-3-bkBLwA_Bk/VaTNgW4XoEI/AAAAAAAAE_8/hHO-ZQz83OI/s1600/tile_grass_v01bs.png"
    );

    this.load.image("detector", "https://placehold.co/96x96");
    this.load.image("detector-detected", "https://placehold.co/100x100");
    this.load.image("hidden-word", "https://placehold.co/32x32");
  }

  create() {
    const { width, height } = this.sys.game.canvas;
    this.add.tileSprite(0, 0, width, height, "background").setOrigin(0);

    this.wordCountBar.create();

    this.wordCount = addTextToScene(this, `0/3 words`, {}, 30, 20);
    addTextToScene(this, "0/1 bonus", {}, 30, 50);

    const scanButton = addTextToScene(this, "Scan", {}, width - 100, 50);
    scanButton.on("pointerdown", () => {
      if (this.isOverlapping()) {
        console.log("Found Word Pair!");
        this.gameState.childPlaying = false;
        const roomCode = localStorageGet(CACHED_ROOM_CODE);
        updateState(roomCode, this.gameState);
      } else {
        console.log("Nothing here...");
      }
    });

    this.configureDetector();
    this.configureHiddenWords(width, height);

    this.physics.add.overlap(
      this.detector,
      this.hiddenWords,
      (detector: any, hiddenWord: any) => {
        this.timeOfOverlap = new Date().getSeconds();
        this.detector.setTexture("detector-detected");
      }
    );
  }

  update(time: number, delta: number): void {
    if (!this.isOverlapping()) {
      this.detector.setTexture("detector");
    }
    this.wordCountBar.setMeterPercentage(
      this.gameState.wordEventAttemptedWordCount /
        parseInt(this.prescriptionMetaData.sessionWordCount)
    );
  }

  isOverlapping(): boolean {
    return this.timeOfOverlap === new Date().getSeconds();
  }

  configureDetector() {
    this.detector = this.physics.add
      .sprite(100, 100, "detector")
      .setInteractive({ draggable: true });

    this.detector.on("drag", (pointer: any, dragX: any, dragY: any) => {
      this.detector.setPosition(dragX, dragY);
    });
  }

  configureHiddenWords(width: number, height: number) {
    this.hiddenWords = this.physics.add.group({
      key: "hidden-word",
      repeat: 1,
      setXY: {
        x: Math.random() * (width - 0) + 0,
        y: Math.random() * (height - 0) + 0,
      },
    });
  }
}
