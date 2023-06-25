import Phaser from "phaser";
import MainMenu from "./MainMenu";
import WordSelectMenu from "./WordSelectMenu";
import PrescriptionsMenu from "./Prescriptions";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import MainGame from "./MainGame";

export const config: Phaser.Types.Core.GameConfig | any = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  backgroundColor: "#ff88ff",
  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: UIPlugin,
        mapping: "rexUI",
      },
    ],
  },
  scale: {
    // Keep this in mind for sizing
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: 0,
    height: 0,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [MainMenu, WordSelectMenu, PrescriptionsMenu, MainGame],
};
