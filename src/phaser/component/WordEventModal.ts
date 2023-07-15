import { PRESCRIPTION_WORD_SET } from "../../constants/GameConstants";
import { WordPairs } from "../../types/WordPair";
import { localStorageGet } from "../../utils/LocalStorageUtils";
import { WordEventModalTextStyles } from "../GameStyles";

class WordEventModal extends Phaser.Scene {
  public static ID = "wordeventmodal";
  public static HEIGHT = 414;
  public static WIDTH = 896;
  private parent: Phaser.GameObjects.Zone;
  private setOfPrescribedWords: WordPairs[];
  private firstWord: string;
  private secondWord: string;

  constructor(
    modalName: string,
    parentZone: Phaser.GameObjects.Zone,
    firstWord: string,
    secondWord: string
  ) {
    super(modalName);
    this.parent = parentZone;
    this.setOfPrescribedWords = localStorageGet(PRESCRIPTION_WORD_SET);
    this.firstWord = firstWord;
    this.secondWord = secondWord;
  }

  loadHiddenWordImages = () => {
    for (let index = 0; index < this.setOfPrescribedWords.length; index++) {
      const wordPair = this.setOfPrescribedWords[index];
      this.load.image(wordPair.first.word, wordPair.first.image_url);
      this.load.image(wordPair.second.word, wordPair.second.image_url);
    }
  };

  preload() {
    this.loadHiddenWordImages();
  }

  create() {
    this.cameras.main.setViewport(
      0,
      0,
      WordEventModal.WIDTH,
      WordEventModal.HEIGHT
    );
    const { width, height } = this.sys.game.canvas;
    const paddedWidth = width - 40;
    const paddedHeight = height - 40;

    this.add.rectangle(20, 20, paddedWidth, paddedHeight, 0xffffff).setOrigin(0);

    const imageDimensions = 250;
    const firstImage = this.add
      .image(40, 40, this.firstWord)
      .setDisplaySize(imageDimensions, imageDimensions)
      .setOrigin(0);
    this.add
      .text(145, 300, this.firstWord, WordEventModalTextStyles)
      .setOrigin(0.5, 0);

    const secondImage = this.add
      .image(paddedWidth, 40, this.secondWord)
      .setDisplaySize(imageDimensions, imageDimensions)
      .setOrigin(1, 0);
    this.add
      .text(paddedWidth - 144, 300, this.secondWord, WordEventModalTextStyles)
      .setOrigin(0.5, 0);
  }
}

export default WordEventModal;
