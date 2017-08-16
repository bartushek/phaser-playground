import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, jumpButton }) {
    super(game, x, y, asset)
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5)

    const fly = this.animations.add('fly');
    this.animations.play('fly', 10, true);
    this.jumpButton = jumpButton;
    this.body.velocity.x = 0;
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 800;
  }

  update () {
    // this.angle += 1

    if (this.jumpButton.isDown)
    {
      this.body.velocity.y -= 40;
    }
  }
}
