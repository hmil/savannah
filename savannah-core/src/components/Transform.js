import Types from '../Types.js';
import Component from '../Component.js';

export default class Transform extends Component {

  onCreate() {
    this.createAttribute('x', 0, Types.Int);
    this.createAttribute('y', 0, Types.Int);
    this.createAttribute('theta', 0, Types.Int);
  }

  distanceTo(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx*dx+dy*dy);
  }
}
