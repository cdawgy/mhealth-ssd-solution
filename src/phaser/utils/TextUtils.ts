import { Scene } from "phaser";

export const addCentreTextToScene = (
  scene: Scene,
  text: string,
  textStyling: Phaser.Types.GameObjects.Text.TextStyle,
  x: number = 0,
  y: number = 0
): Phaser.GameObjects.Text => {
  const { width, height } = scene.sys.game.canvas;
  return scene.add
    .text(width / 2 + x, height / 2 + y, text, textStyling)
    .setOrigin(0.5)
    .setInteractive();
};

export const addTextToScene = (
  scene: Scene,
  text: string,
  textStyling: Phaser.Types.GameObjects.Text.TextStyle,
  x: number = 0,
  y: number = 0
): Phaser.GameObjects.Text => {
  return scene.add
    .text(x, y, text, textStyling)
    .setOrigin(0)
    .setInteractive();
};
