import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";
import {
  Label,
  ScrollablePanel,
  Sizer,
} from "phaser3-rex-plugins/templates/ui/ui-components";
import { Prescription } from "../../types/Prescription";
import { ButtonStyles } from "../GameStyles";
import { navigateToNewScene } from "./NavigationUtils";
import MainGame from "../MainGame";
import { localStorageStore } from "../../utils/LocalStorageUtils";
import {
  PRESCRIPTION_META_DATA_ID,
  PRESCRIPTION_WORD_SET,
} from "../../constants/GameConstants";
import { fetchAllWordPairs } from "./WordPairUtils";

export const createScroller = (
  scene: Phaser.Scene,
  listOfPrescriptions: Prescription[]
) => {
  const sizer = createSizer(scene);
  createButtons(scene, sizer, listOfPrescriptions);
  const scrollableConfigs: ScrollablePanel.IConfig = {
    x: 30,
    y: 80,
    width: 100,
    height: 300,
    panel: {
      child: sizer,
    },
  };
  let panel = new ScrollablePanel(scene, scrollableConfigs);
  panel.setOrigin(0);
  panel.layout();
  panel
    .setChildrenInteractive({
      targets: [panel.getByName("sizer", true)],
    })
    .on(
      "child.click",
      async (child: Label) => {
        const prescriptionMetaData: Prescription = child.getData(
          PRESCRIPTION_META_DATA_ID
        );
        const wordPairSet = await fetchAllWordPairs(
          prescriptionMetaData.sessionWordSet
        );
        localStorageStore(PRESCRIPTION_WORD_SET, wordPairSet);
        localStorageStore(PRESCRIPTION_META_DATA_ID, prescriptionMetaData);
        navigateToNewScene(scene, MainGame.MAIN_GAME_SCENE_ID);
      },
      this
    );
  scene.add.existing(panel);
};

const createSizer = (scene: Phaser.Scene): Sizer => {
  const widthSizerConfig: Sizer.IConfig = {
    space: {
      item: 50,
      top: 20,
      bottom: 20,
    },
    orientation: "y",
    name: "sizer",
  };

  return new Sizer(scene, widthSizerConfig);
};

const createButtons = (
  scene: Phaser.Scene,
  sizer: Sizer,
  listOfPrescriptions: Prescription[]
) => {
  listOfPrescriptions.forEach((prescription) => {
    const text = scene.add.text(
      0,
      0,
      prescription.sessionWordSetTitle,
      ButtonStyles
    );
    sizer.add(
      new Label(scene, {
        width: 100,
        height: 30,
        text: text,
        align: "center",
        orientation: "y",
      }).setData(PRESCRIPTION_META_DATA_ID, prescription)
    );
  });
};
