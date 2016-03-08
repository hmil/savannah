import Pawn from './Pawn.js';
import Component from 'core/Component.js';
import { Log } from 'core/Log.js';

export default class Bullet extends Component {

  onCreate() {
    this.physics.radius = 3;
  }

  static get SPEED() {
    return 0.2;
  }


  onCollision(other) {
    const pawn = other.getComponent(Pawn);
    if (pawn != null) {
      pawn.hit(this);
    }
    this.destroy();
  }

}
