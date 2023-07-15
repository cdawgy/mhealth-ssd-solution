export const fadeTextInWithParticles = (
  text: Phaser.GameObjects.Text,
  scene: Phaser.Scene
) => {
  const { width, height } = scene.sys.game.canvas;
  const emitter = scene.add.particles(
    width / 2,
    height / 2,
    "particle-purple",
    {
      speed: 100,
      lifespan: 3000,
      gravityY: 200,
      emitting: false,
    }
  );

  text.setDepth(20);

  const fadeInTween = scene.tweens.add({
    targets: text,
    alpha: { from: 0, to: 1 },
    ease: "Sine.InOut",
    duration: 500,
    repeat: 0,
    yoyo: false,
    paused: false,
  });

  emitter.start(2000);
  const fadeOutTween = scene.tweens.add({
    targets: text,
    alpha: { from: 1, to: 0 },
    ease: "Sine.InOut",
    duration: 500,
    repeat: 0,
    yoyo: false,
    paused: true,
  });
  
  setTimeout(() => {
    emitter.stop();
    fadeOutTween.play();
  }, 3000);
};
