import Phaser from 'phaser'

class Inputs {
  constructor (game) {
    this.cursors = game.input.keyboard.createCursorKeys()
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  }

  update () {
    // this.angle += 1
  }
}
