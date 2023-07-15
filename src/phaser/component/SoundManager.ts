class SoundManager {
  public static BLEEP_ID = "bleep";
  private scene: Phaser.Scene;
  public bleep:
    | Phaser.Sound.WebAudioSound
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound;
  public hiddenWords: Phaser.Physics.Arcade.Group;
  private timeFromLastBleep: number;
  private lastBleepTimeStamp: number;
  public isChildPlaying: boolean;
  constructor(scene: Phaser.Scene, hiddenWords: Phaser.Physics.Arcade.Group) {
    this.scene = scene;
    this.bleep = {} as any;
    this.hiddenWords = hiddenWords;
    this.timeFromLastBleep = 0;
    this.lastBleepTimeStamp = Date.now();
    this.isChildPlaying = true;
  }

  public createSounds(): void {
    this.bleep = this.scene.sound.add(SoundManager.BLEEP_ID);
  }

  private playBleepBasedOnDistance(distancePercentage: number): void {
    if (this.distanceInRange(distancePercentage, 0, 10)) {
      this.calculateTimeFromLastBleep();
      this.playBleep(200);
    } else if (this.distanceInRange(distancePercentage, 11, 20)) {
      this.calculateTimeFromLastBleep();
      this.playBleep(500);
    } else if (this.distanceInRange(distancePercentage, 21, 30)) {
      this.calculateTimeFromLastBleep();
      this.playBleep(1000);
    } else if (this.distanceInRange(distancePercentage, 31, 40)) {
      this.calculateTimeFromLastBleep();
      this.playBleep(1500);
    } else if (this.distanceInRange(distancePercentage, 41, 50)) {
      this.calculateTimeFromLastBleep();
      this.playBleep(2000);
    } else if (this.distanceInRange(distancePercentage, 51, 60)) {
      this.calculateTimeFromLastBleep();
      this.playBleep(2500);
    } else if (this.distanceInRange(distancePercentage, 61, 70)) {
      this.calculateTimeFromLastBleep();
      this.playBleep(3000);
    } else if (this.distanceInRange(distancePercentage, 71, 80)) {
      this.calculateTimeFromLastBleep();
      this.playBleep(3500);
    } else if (this.distanceInRange(distancePercentage, 81, 90)) {
      this.calculateTimeFromLastBleep();
      this.playBleep(4000);
    }
  }

  private distanceInRange(perc: number, min: number, max: number): boolean {
    return perc >= min && perc <= max;
  }

  private playBleep(timeGap: number): void {
    if (this.timeFromLastBleep > timeGap) {
      this.bleep.play();
      this.timeFromLastBleep = 0;
      this.lastBleepTimeStamp = Date.now();
    }
  }

  private calculateTimeFromLastBleep() {
    const currentTime = Date.now();
    this.timeFromLastBleep = currentTime - this.lastBleepTimeStamp;
  }

  public calculateDistance(
    detector: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  ): void {
    const allWords: any = this.hiddenWords.getChildren();
    const listOfRelativeDistances: number[] = [];
    allWords.forEach((word: any) => {
      listOfRelativeDistances.push(
        this.calculateRelativeDistanceFromClosestWord(detector, word)
      );
    });
    const closestValue = Math.min(...listOfRelativeDistances);
    if (this.isChildPlaying) {
      this.playBleepBasedOnDistance(closestValue);
    }
  }

  private calculateRelativeDistanceFromClosestWord(
    detector: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    wordObject: any
  ): number {
    const relativeX = (detector.x - wordObject.x) * -1;
    const relativeY = (detector.y - wordObject.y) * -1;
    const distanceFromDetectorToWord = this.getHypotenus(relativeX, relativeY);
    const { width, height } = this.scene.sys.game.canvas;
    const diagonalDistance = this.getHypotenus(height, width);

    return Math.floor((distanceFromDetectorToWord / diagonalDistance) * 100);
  }

  private getHypotenus(height: number, width: number): number {
    const sqrdX = Math.pow(height, 2);
    const sqrdY = Math.pow(width, 2);
    const totalSqrds = sqrdX + sqrdY;
    return Math.sqrt(totalSqrds);
  }
}

export default SoundManager;
