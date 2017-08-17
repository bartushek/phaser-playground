import Phaser from 'phaser'
import { getCurvePoints } from 'cardinal-spline-js'
import spline from 'cubic-spline'
import { AsyncIterator } from '../utils';

  // const async = new AsyncIterator([1,2,3,4,5], console.log.bind(null, Date.now()), 1);
  // async.process().then(()=>console.log('yay!'));

const cubicSpline = (points) => {
  const values = {
    xs: [],
    ys: []
  }
  points.forEach((pt, i) => {
    const arr = !(i%2) ? 'xs' : 'ys';
    values[arr].push(pt);
  });

  console.log(values);

  const newArr = [];
  for(let i = values['xs'][0]; i < values['xs'][values['xs'].length - 1]; i++) {
    newArr.push(i, spline(i, values.xs, values.ys))
  }
  return newArr;
}

export default class Ground {
  constructor (game) {
    this.game = game
    this.offset = 0;

    this.points = []
    for (let i = -100; i < this.game.width + 3000; i+=100) {
      this.points.push(i, parseInt(this.game.height - (Math.random() * 100 + 20), 10))
    }

    this.bmd = game.add.bitmapData(this.game.width, this.game.height)
    this.ctx = this.bmd.context
    const ctx = this.ctx;
    // this.bmd.addToWorld()
    game.add.image(0, 0, this.bmd).anchor.set(0, 0)




    // this.poly = cubicSpline(this.points);
    this.poly = getCurvePoints(this.points);
    console.log(this.poly)
    this.renderGround(this.poly.slice(0, (this.game.width + 105) * 2));
    this.generateGround = this.generateGround.bind(this);
    setTimeout(this.generateGround);

  }

  generateGround() {
      if (this.poly.length > 2000) {
        setTimeout(this.generateGround, 10);
        return;
      }
      console.log('generateGround');
      this.points = this.points.slice(-10);
      const length = this.points[this.points.length-2];
      for (let i = this.points[this.points.length-2]+100; i < length + 1500; i+=100) {
        this.points.push(i, parseInt(this.game.height - (Math.random() * 100 + 20), 10))
      }
      this.points = this.points.slice(8, this.points.length)
      console.log( this.points);
      this.poly = [...this.poly, ...getCurvePoints(this.points)];

      setTimeout(this.generateGround, 10);
  }

  renderGround (points, offset = 0) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.bmd.canvas.width, this.bmd.canvas.height);
    ctx.beginPath()
    ctx.moveTo(points[0]- offset, points[1])
    for (var item = 2; item < points.length - 1; item += 2) {
      // console.log(points[item], points[item + 1])
      ctx.lineTo(points[item] - offset, points[item + 1])
    }
    // ctx.closePath()
    // ctx.fill()
    ctx.lineWidth = 10
    ctx.stroke()
  }

  checkCollision ({x, y}) {
    return this.poly.contains(x, y)
  }

  update ({x, y}) {
    this.offset += 10;
    if (this.poly[0] < this.offset - 20) {
      // console.log('cut poly')
      this.poly = this.poly.slice(-(this.poly.length-4))
      // console.log(this.poly);
    }
    this.renderGround(this.poly.slice(0, (this.game.width + 105) * 2), this.offset)
  }
}
