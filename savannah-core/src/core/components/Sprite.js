import Component from '../Component.js';
import GraphicSystem from '../systems/GraphicSystem.js';


/**
 * Base class for all graphic components.
 *
 * When an entity with a Sprite component is in a scene, the draw method of the sprite component
 * will be called once per game loop to render the sprite to the graphics rendering context.
 *
 * Components extending Sprite should implement {@link draw} to draw something
 * to screen.
 */
export default class Sprite extends Component {

  onCreate() {
    super.onCreate();

    this._graphicSystem = this.scene.getSystem(GraphicSystem);
    this._graphicSystem.addSprite(this);
  }

  onDestroy() {
    super.onDestroy();
    this._graphicSystem.removeSprite(this);
  }

  enable() {
    if (!this.enabled) {
      this._graphicSystem.addSprite(this);
    }
    super.enable();
  }

  disable() {
    if (this.enabled) {
      this._graphicSystem.removeSprite(this);
    }
    super.disable();
  }

  /**
   * Screen refresh handler.
   *
   * Subclasses should implement this function to draw something to the screen e
   * very time the screen is refreshed.
   *
   * note: The screen is typically refreshed 60 times a second which means that this method will
   * be invoked a lot. You must make sure that no heavy computation happens in here.
   *
   * @param {CanvasRenderingContext2D} ctx The output
   *   [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
   */
   draw(ctx) {} // jshint unused: false
}
