import Sprite from './Sprite.js';


/**
 * This component triggers the "draw" event on its host entity everytime the Graphics
 * system requires this element to be drawn.
 */
export default class DrawEvent extends Sprite {

  draw(ctx) {
    this.entity.triggerEvent('draw', ctx);
  }
}
