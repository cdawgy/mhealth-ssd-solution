import {
  FIRST_WORD_VALUE,
  PRESCRIPTION_WORD_SET,
  SECOND_WORD_VALUE,
} from "../../constants/GameConstants";
import { WordPairs } from "../../types/WordPair";
import { localStorageGet } from "../../utils/LocalStorageUtils";
import { SideTextStyles } from "../GameStyles";
import { fadeTextInWithParticles } from "../utils/PopUpEmittedTextUtils";
import { addTextToScene } from "../utils/TextUtils";

class RoundManager {
  private currentRoundCounter: number;
  private maxAmountOfRounds: number;
  private wordsPerRound: number;
  private currentWordsFound: number;
  private scene: Phaser.Scene;
  private wordPairText: Phaser.GameObjects.Text;
  private roundText: Phaser.GameObjects.Text;
  public hiddenWords: Phaser.Physics.Arcade.Group;

  constructor(maxRounds: number, scene: Phaser.Scene) {
    this.currentRoundCounter = 1;
    this.maxAmountOfRounds = maxRounds;
    this.wordsPerRound = 3;
    this.currentWordsFound = 0;
    this.scene = scene;
    this.wordPairText = {} as Phaser.GameObjects.Text;
    this.roundText = {} as Phaser.GameObjects.Text;
    this.hiddenWords = {} as Phaser.Physics.Arcade.Group;
  }

  public createRoundText(): void {
    this.wordPairText = addTextToScene(
      this.scene,
      this.getWordPairText(),
      SideTextStyles,
      30,
      20
    );
    this.roundText = addTextToScene(
      this.scene,
      this.getRoundText(),
      SideTextStyles,
      30,
      60
    );
  }

  private getWordPairText(): string {
    return `Word Pairs: ${this.currentWordsFound}/${this.wordsPerRound}`;
  }

  private getRoundText(): string {
    return `Round: ${this.currentRoundCounter}/${this.maxAmountOfRounds}`;
  }

  public areAllWordsFound(): boolean {
    return this.currentWordsFound === this.wordsPerRound;
  }

  private progressToNextRound(): void {
    this.currentRoundCounter++;
    this.hiddenWords.clear();
    this.configureHiddenWords();
  }

  public areAllRoundsCompleted(): boolean {
    return this.currentRoundCounter >= this.maxAmountOfRounds;
  }

  public renderRoundText(): void {
    this.wordPairText.setText(this.getWordPairText());
    this.roundText.setText(this.getRoundText());
  }

  public foundWordPair(): void {
    this.currentWordsFound++;
  }

  public roundProgressCheck(): void {
    if (this.areAllWordsFound() && !this.areAllRoundsCompleted()) {
      this.currentWordsFound = 0;
      this.progressToNextRound();
    }
  }

  public configureHiddenWords(): void {
    const { width, height } = this.scene.sys.game.canvas;
    const setOfPrescribedWords: WordPairs[] = localStorageGet(
      PRESCRIPTION_WORD_SET
    );
    const max = setOfPrescribedWords.length - 1;
    const firstWordPair = setOfPrescribedWords[Phaser.Math.Between(0, max)];
    const secondWordPair = setOfPrescribedWords[Phaser.Math.Between(0, max)];
    const thirdWordPair = setOfPrescribedWords[Phaser.Math.Between(0, max)];

    // const randomWordPairSubSet = [firstWordPair, secondWordPair, thirdWordPair];
    const randomWordPairSubSet = [firstWordPair];

    const listOfHiddenWordGameObjects = randomWordPairSubSet.map((wordPair) => {
      const x = Phaser.Math.Between(100, width);
      const y = Phaser.Math.Between(100, height);
      const hiddenWordSprite = this.scene.physics.add.sprite(
        x,
        y,
        "hidden-word"
      );
      hiddenWordSprite.setData(FIRST_WORD_VALUE, wordPair.first.word);
      hiddenWordSprite.setData(SECOND_WORD_VALUE, wordPair.second.word);
      hiddenWordSprite.setVisible(true);
      hiddenWordSprite.setName(`${x},${y}`);
      return hiddenWordSprite;
    });

    this.hiddenWords = this.scene.physics.add.group(
      listOfHiddenWordGameObjects
    );
  }

  public isGameFinished(): boolean {
    return this.areAllRoundsCompleted() && this.areAllWordsFound();
  }
}

export default RoundManager;
