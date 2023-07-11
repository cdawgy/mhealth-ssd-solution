import WordEventModal from "../component/WordEventModal";

export const createModal = (
  scene: Phaser.Scene,
  firstWord: string,
  secondWord: string
) => {
  const x = 0;
  const y = 0;

  const modal = scene.add
    .zone(x, y, WordEventModal.WIDTH, WordEventModal.HEIGHT)
    .setOrigin(0);

  const modalScene = new WordEventModal(
    WordEventModal.ID,
    modal,
    firstWord,
    secondWord
  );

  scene.scene.add(WordEventModal.ID, modalScene, true);
};
