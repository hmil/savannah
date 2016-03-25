import Component  from '../Component.js';
import Types  from '../Types.js';

/**
 * Defines a world transformation with (`x`, `y`) coordinates and an angle `theta`
 *
 * @member {number} x X coordinate in world space
 *
 * @member {number} y Y coordinate in world space
 *
 * @member {number} theta angle in world coordinates
 *
 * @member {number} localX X coordinate in local space
 *
 * @member {number} localY Y coordinate in local space
 *
 * @member {number} localTheta angle coordinate in local space
 *
 * @member {Transform} parent Parent transformation
 *
 *   Local coordinates and angles are relative to the parent transformation.
 */
export default class Transform extends Component {

  onCreate() {
    this.createAttribute('localX', 0, Types.Int);
    this.createAttribute('localY', 0, Types.Int);
    this.createAttribute('localTheta', 0, Types.Int);
    this.createAttribute('parent', null, Types.Component);
  }

  /** @ignore */
  get x() {
    return this.localX + ((this.parent != null) ? this.parent.x : 0);
  }

  /** @ignore */
  set x(x) {
    this.localX = x - ((this.parent != null) ? this.parent.x : 0);
  }

  /** @ignore */
  get y() {
    return this.localY + ((this.parent != null) ? this.parent.y : 0);
  }

  /** @ignore */
  set y(y) {
    this.localY = y - ((this.parent != null) ? this.parent.y : 0);
  }

  /** @ignore */
  get theta() {
    return this.localTheta + ((this.parent != null) ? this.parent.theta : 0);
  }

  /** @ignore */
  set theta(theta) {
    this.localTheta = theta - ((this.parent != null) ? this.parent.theta : 0);
  }

  /**
   * Computes the distance to another transformation.
   *
   * @param  {Transform} other
   * @return {number} The absolute distance from this transform to other
   */
  distanceTo(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx*dx+dy*dy);
  }
}
