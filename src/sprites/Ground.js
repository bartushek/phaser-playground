import Phaser from 'phaser'
import { getCurvePoints } from 'cardinal-spline-js'
import spline from 'cubic-spline'

export default class Ground {
  constructor (game) {
    this.game = game
    console.log(game.antialias)
    this.points = [0, this.game.height, 50, 100, 175, 200, 50, 250, this.game.width, this.game.height]
    this.polyMock = new Phaser.Polygon(...getCurvePoints(this.points).map(pt => parseInt(pt)))
    // this.graphics = game.add.graphics(0, 0)
    this.bmd = game.add.bitmapData(this.game.width, this.game.height)
    this.graphics = this.bmd.context
    this.bmd.addToWorld()
    console.log(this.bmd, this.graphics)
    // this.graphics.lineStyle(10, 0xFF0000, 0.8)
    // this.graphics.beginFill(0xFF33ff)
    // this.graphics.drawPolygon(this.poly.points)
    // this.graphics.endFill()

    game.add.image(0, 0, this.bmd).anchor.set(0, 0)
    window.spline = spline;
  }

  checkCollision ({x, y}) {
    return this.poly.contains(x, y)
  }

  update ({x, y}) {
    // console.log('points', getCurvePoints(this.points));
    // this.angle += 1

    // this.graphics.clear()
    // this.bmd = this.game.add.bitmapData(this.game.world.width,
    //   this.game.world.height)
    this.graphics.clearRect(0, 0, this.bmd.canvas.width, this.bmd.canvas.height)
    const oldPoints = this.points
    delete this.points
    this.points = oldPoints.map((pt, i) => i % 2 ? pt : pt - 5)
    this.points = this.points.slice(2).slice(0, this.points.length - 4)
    if (this.points[2] < -200) {
      this.points = this.points.slice(2)
    }
    if (this.points[this.points.length - 2] < this.game.width + 100) {
      this.points.push(this.game.width + 200, parseInt(this.game.height - (Math.random() * 100 + 20), 10))
    }
    // console.log(this.points);
    this.cubicPoints = this.points.reduce((res, cur) => {
      if (!((res[0].length + res[1].length) % 2)) {
        return [[...res[0], cur], res[1]]
      } else {
        return [res[0], [...res[1], cur]]
      }
    }, [[], []])
    const newArr = [];
    const diff = (Math.abs(this.cubicPoints[0][0] - this.cubicPoints[0][this.cubicPoints[0].length - 1]));
    for(let i = this.cubicPoints[0][0]; i < this.cubicPoints[0][this.cubicPoints[0].length - 1]; i++) {
      newArr.push(i, spline(i*.1, this.cubicPoints[0], this.cubicPoints[1]))
    }
    // console.log(newArr);

    this.points = [-200, this.game.height + 20, ...this.points, this.game.width + 200, this.game.height + 20]
    this.poly = newArr
    this.polyMock = new Phaser.Polygon(...this.poly)

    if (this.polyMock.contains(x, y)) {
      this.graphics.fillStyle = '#f00'
    } else {
      this.graphics.fillStyle = '#B4D455'
    }

    [-235, -130, -25, 80, 185, 290, 395, 500, 605, 710, 815, 920]


    this.graphics.beginPath()
    this.graphics.moveTo(this.poly[0], this.poly[1])
    for (var item = 2; item < this.poly.length - 1; item += 2) {
      // console.log(this.poly[item], this.poly[item + 1])
      this.graphics.lineTo(this.poly[item] + 0.5, this.poly[item + 1] + 0.5)
    }

    this.graphics.closePath()
    this.graphics.fill()

    this.graphics.lineWidth = 10
    this.graphics.stroke()

    // this.bmd.addToWorld()

    // this.graphics.lineStyle(10, 0x000000)
    // this.graphics.fillStyle = this.graphics.createPattern(this.cache.getImage('fill1'), 'repeat');
    // if (this.poly.contains(x, y)) {
    //   this.graphics.beginFill(0xFF3300)
    // } else {
    //   this.graphics.beginFill(0xB4D455)
    // }

    // this.graphics.drawPolygon(this.poly.points)
    // this.graphics.endFill()
    for (var i = 0; i < this.points.length; i++) {
      if (!(i % 2)) {
        this.graphics.fillRect(this.points[i] - 2, this.points[i + 1] - 2, 5, 5)
      }
    }
    for (i = 0; i < this.poly.length; i++) {
      if (!(i % 2)) {
        this.graphics.fillRect(this.poly[i] - 1, this.poly[i + 1] - 1, 1, 10)
      }
    }
  }
}
