import WordSelectMenu from "./WordSelectMenu";
import { ButtonStyles, SideTextStyles, TitleStyles } from "./GameStyles";
import { addCentreTextToScene, addTextToScene } from "./utils/TextUtils";
import { exitGame, navigateToNewScene } from "./utils/NavigationUtils";
import { localStorageGet, localStorageStore } from "../utils/LocalStorageUtils";
import {
  CACHED_ROOM_CODE,
  FIRST_WORD_IMAGE,
  FIRST_WORD_VALUE,
  GAME_COMPLETED_DATA,
  PRESCRIPTION_META_DATA_ID,
  PRESCRIPTION_WORD_SET,
  SECOND_WORD_IMAGE,
  SECOND_WORD_VALUE,
} from "../constants/GameConstants";
import { Prescription } from "../types/Prescription";
import { GameState } from "../types/GameState";
import { connectToRoom, updateState } from "../utils/WebSocketUtils";
import MeterBar from "./component/MeterBar";
import { fetchAllWordPairs } from "./utils/WordPairUtils";
import { WordPairs } from "../types/WordPair";
import { createModal } from "./utils/ModalUtils";
import WordEventModal from "./component/WordEventModal";
import RoundManager from "./component/RoundManager";
import { fadeTextInWithParticles } from "./utils/PopUpEmittedTextUtils";
import GameFinished from "./GameFinished";
import { GameCompletedState } from "../types/GameCompletedState";
import SoundManager from "./component/SoundManager";

export default class MainGame extends Phaser.Scene {
  public static MAIN_GAME_SCENE_ID = "maingame";
  private timeOfOverlap: number;
  private detector: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private gameState: GameState;
  private wordCountBar: MeterBar;
  private prescriptionMetaData: Prescription;
  private currentlyHoveredWordPair: {
    firstWord: string;
    secondWord: string;
    name: string;
  };
  private roundManager: RoundManager;
  private cachedHoveredHiddenWord: any;
  private barCompleteText: Phaser.GameObjects.Text;
  private gameComplete: Phaser.GameObjects.Text;
  private gameFinishedLock: boolean;
  private soundManager: SoundManager;

  constructor() {
    super(MainGame.MAIN_GAME_SCENE_ID);
    this.gameFinishedLock = false;
    this.timeOfOverlap = new Date().getSeconds();
    this.detector = {} as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    this.gameState = {} as GameState;
    this.barCompleteText = {} as Phaser.GameObjects.Text;
    this.gameComplete = {} as Phaser.GameObjects.Text;
    this.wordCountBar = new MeterBar(this, () => {
      fadeTextInWithParticles(this.barCompleteText, this);
    });
    this.prescriptionMetaData = {} as Prescription;
    this.currentlyHoveredWordPair = {
      firstWord: "",
      secondWord: "",
      name: "",
    };
    this.roundManager = {} as RoundManager;
    this.soundManager = {} as SoundManager;
  }

  init() {
    const tempConfig: any = this.game.config;
    this.gameState = tempConfig.gameState;

    connectToRoom((gameState: GameState) => {
      if (gameState.sender === "validator") {
        this.gameState = gameState;
        this.scene.remove(WordEventModal.ID);
        this.soundManager.isChildPlaying = gameState.childPlaying;
      }
    }, localStorageGet(CACHED_ROOM_CODE));

    this.prescriptionMetaData = localStorageGet(
      PRESCRIPTION_META_DATA_ID
    ) as Prescription;
  }

  preload() {
    this.load.image(
      "background",
      "https://2.bp.blogspot.com/-3-bkBLwA_Bk/VaTNgW4XoEI/AAAAAAAAE_8/hHO-ZQz83OI/s1600/tile_grass_v01bs.png"
    );

    this.load.image(
      "particle-purple",
      "https://mhealthstorageaccount.blob.core.windows.net/image-store/particle-purple.png"
    );

    this.load.image(
      "detector",
      "https://mhealthstorageaccount.blob.core.windows.net/image-store/detector-nothing.png"
    );
    this.load.image(
      "detector-detected",
      "https://mhealthstorageaccount.blob.core.windows.net/image-store/detector-found.png"
    );
    this.load.image("hidden-word", "https://placehold.co/32x32");

    this.load.audio(
      SoundManager.BLEEP_ID,
      "https://mhealthstorageaccount.blob.core.windows.net/sound-store/bleep.mp3"
    );
  }

  async create() {
    const { width, height } = this.sys.game.canvas;
    this.add.tileSprite(0, 0, width, height, "background").setOrigin(0);

    this.barCompleteText = addCentreTextToScene(
      this,
      "Word Count Achieved!",
      TitleStyles
    ).setAlpha(0);
    this.gameComplete = addCentreTextToScene(
      this,
      "Game Complete!",
      TitleStyles
    ).setAlpha(0);

    this.wordCountBar.create();
    this.roundManager = new RoundManager(1, this);
    this.roundManager.createRoundText();
    this.roundManager.configureHiddenWords();

    this.soundManager = new SoundManager(this, this.roundManager.hiddenWords);
    this.soundManager.createSounds();

    const scanButton = addTextToScene(
      this,
      "Scan",
      ButtonStyles,
      width - 200,
      20
    );
    scanButton.on("pointerdown", (e: any) => {
      if (this.isOverlapping()) {
        this.gameState.childPlaying = false;
        this.gameState.sender = "player";
        const roomCode = localStorageGet(CACHED_ROOM_CODE);
        updateState(roomCode, this.gameState);
        createModal(
          this,
          this.currentlyHoveredWordPair.firstWord,
          this.currentlyHoveredWordPair.secondWord
        );
        // TODO: Refactor below
        const foundWord = this.roundManager.hiddenWords.getMatching(
          "name",
          this.currentlyHoveredWordPair.name
        )[0];
        this.roundManager.hiddenWords.remove(foundWord, true, true);
        this.roundManager.foundWordPair();
        this.soundManager.isChildPlaying = false;
      }
    });

    this.configureDetector();
  }

  update(time: number, delta: number): void {
    this.configureOverlapping();
    if (!this.isOverlapping()) {
      this.detector.setTexture("detector");
    }
    this.wordCountBar.setMeterPercentage(
      this.gameState.wordEventAttemptedWordCount /
        parseInt(this.prescriptionMetaData.sessionWordCount)
    );
    this.roundManager.renderRoundText();
    this.roundManager.roundProgressCheck();
    this.soundManager.hiddenWords = this.roundManager.hiddenWords;

    if (this.roundManager.isGameFinished() && this.gameState.childPlaying) {
      if (!this.gameFinishedLock) {
        fadeTextInWithParticles(this.gameComplete, this);
      }
      this.gameFinishedLock = true;
      setTimeout(() => {
        const gameCompleteState: GameCompletedState = {
          isBonusAchieved: this.isWordCountAchieved(),
        };
        localStorageStore(GAME_COMPLETED_DATA, gameCompleteState);
        navigateToNewScene(this, GameFinished.GAME_FINISHED_SCENE_ID);
      }, 4000);
    }

    this.soundManager.calculateDistance(this.detector);
  }

  isWordCountAchieved(): boolean {
    return (
      this.gameState.wordEventAttemptedWordCount ===
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

  configureOverlapping() {
    this.physics.add.overlap(
      this.detector,
      this.roundManager.hiddenWords,
      (detector: any, hiddenWord: any) => {
        this.timeOfOverlap = new Date().getSeconds();
        this.detector.setTexture("detector-detected");
        this.currentlyHoveredWordPair = {
          firstWord: hiddenWord.getData(FIRST_WORD_VALUE),
          secondWord: hiddenWord.getData(SECOND_WORD_VALUE),
          name: hiddenWord.name,
        };
      }
    );
  }
}
