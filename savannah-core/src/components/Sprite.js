import Component from '../Component.js';
import GraphicSystem from '../systems/GraphicSystem.js';

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

  draw(ctx) {
    this.entity.triggerEvent('draw', ctx);
  }
}
