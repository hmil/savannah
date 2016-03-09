import Types from '../Types.js';
import Sprite from './Sprite.js';

export default class ShapeSprite extends Sprite {

  onCreate() {
    super.onCreate();
    this.createAttribute('color', '#ff0', Types.String);
  }

  onDraw(ctx) {
    ctx.save();

    ctx.fillStyle = this.color;

    ctx.translate(this.transform.x, this.transform.y);
    ctx.rotate(this.transform.theta);

    ctx.fillRect(-1, -1, 2, 2);

    ctx.restore();
  }
}
