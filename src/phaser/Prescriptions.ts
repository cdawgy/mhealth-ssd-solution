import { IConfig } from "phaser3-rex-plugins/templates/ui/utils/buttongroup/Buttons";
import { ButtonStyles, TitleStyles } from "./GameStyles";
import { config } from "./PhaserGameConfig";
import { addCentreTextToScene, addTextToScene } from "./utils/TextUtils";
import {
  FixWidthSizer,
  Label,
  RoundRectangle,
  ScrollablePanel,
} from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { createScroller } from "./utils/ScrollerUtils";
import { Prescription } from "../types/Prescription";
import { getListOfPrescriptions } from "./utils/ServiceUtils";

export default class PrescriptionsMenu extends Phaser.Scene {
  public static PRESCRIPTIONS_SCENE_ID = "prescriptions";
  private listOfPrescriptions: Prescription[] = [];
  constructor() {
    super(PrescriptionsMenu.PRESCRIPTIONS_SCENE_ID);
  }

  init() {}

  preload() {
    this.load.image(
      "background",
      "https://2.bp.blogspot.com/-3-bkBLwA_Bk/VaTNgW4XoEI/AAAAAAAAE_8/hHO-ZQz83OI/s1600/tile_grass_v01bs.png"
    );
  }

  async create() {
    const { width, height } = this.sys.game.canvas;
    this.add
      .tileSprite(0, 0, width, height, "background")
      .setOrigin(0) 
    addTextToScene(this, "Prescriptions", TitleStyles, 30, 20);
    this.listOfPrescriptions = await getListOfPrescriptions("1");
    createScroller(this, this.listOfPrescriptions);
  }

  update(time: number, delta: number): void {}
}
