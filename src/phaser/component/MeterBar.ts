class MeterBar {
  private HEIGHT: number = 50;

  private scene: Phaser.Scene;
  private fullWidth: number;
  private healthBar: Phaser.GameObjects.Rectangle;
  private backgroundBar: Phaser.GameObjects.Rectangle;
  private callback: () => any;
  private callbackInvokationCount: number;

  constructor(
    scene: Phaser.Scene,
    meterFullCallback: () => any,
    fullWidth: number = 300
  ) {
    this.scene = scene;
    this.fullWidth = fullWidth;
    this.healthBar = {} as Phaser.GameObjects.Rectangle;
    this.backgroundBar = {} as Phaser.GameObjects.Rectangle;
    this.callback = meterFullCallback;
    this.callbackInvokationCount = 0;
  }

  create() {
    const x = this.scene.game.canvas.width / 2;
    const y = 40;

    this.backgroundBar = this.scene.add
      .rectangle(x, y, this.fullWidth, this.HEIGHT, 0x333333)
      .setOrigin(0.5);
    this.healthBar = this.scene.add
      .rectangle(
        x - this.backgroundBar.width / 2,
        y,
        this.fullWidth,
        this.HEIGHT,
        0x8bc34a
      )
      .setOrigin(0, 0.5);
  }

  setMeterPercentage(percent: number = 1) {
    if (percent >= 1) {
      if (this.callbackInvokationCount === 0) this.callbackInvokationCount = 1;
      this.healthBar.setDisplaySize(this.fullWidth, this.HEIGHT);
    } else {
      const width = this.fullWidth * percent;
      this.healthBar.setDisplaySize(width, this.HEIGHT);
    }

    if (this.callbackInvokationCount === 1) {
      this.callback();
      this.callbackInvokationCount = 2;
    }
  }
}

export default MeterBar;
