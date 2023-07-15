export const exitGame = (scene: Phaser.Scene) => {
  const tempConfig: any = scene.game.config;
  tempConfig.navigate("/appMainMenu");
};

export const navigateToNewScene = (scene: Phaser.Scene, sceneId: string) => {
  scene.scene.transition({
    target: sceneId,
    duration: 0,
  });
};
