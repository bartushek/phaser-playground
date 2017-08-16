/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Dude from '../sprites/Dude'
import Ground from '../sprites/Ground'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const cursors = this.game.input.keyboard.createCursorKeys()
    const jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    const bannerText = 'Phaser + ES6 + Webpack'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.ground = new Ground(this.game)

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.dude = new Dude({
      game: this.game,
      x: 100,
      y: this.world.centerY,
      asset: 'dude',
      jumpButton
    })

    this.game.add.existing(this.mushroom)
    this.game.add.existing(this.dude)
  }

  update () {
    // console.log(this.dude.position.y);
    this.ground.update({x: this.dude.position.x, y: this.dude.position.y})
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
