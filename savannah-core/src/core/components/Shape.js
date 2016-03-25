import Types from '../Types.js';
import Sprite from './Sprite.js';


/**
 * Base class for shape sprites.
 *
 * This class defines common properties for drawing shapes such as contour color
 * ({@link strokeStyle}), fill color ({@link fillStyle}) and line styles.
 *
 * The shape is drawn relative to the entity's transform at coordinates
 * {transform.x + offsetX, transform.y + offsetY}.
 *
 * Subclasses must implement {@link traceShape} to draw the actual shape.
 *
 * @member {string} fillStyle Color used to fill the shape
 *
 *  doc and examples: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
 *
 * @member {string} strokeStyle Color used to trace the contour of the shape
 *
 *  doc and examples: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
 *
 * @member {number} lineWidth Width of the line used to trace the contour of the shape
 *
 *  doc and examples: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
 *
 * @member {string} lineCap The lineCap property of the Canvas 2D API determines
 * how the end points of every line are drawn.
 *
 *  doc and examples: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
 *
 * @member {string} lineJoin The lineJoin property of the Canvas 2D API determines
 * how two connecting segments in a shape are joined together
 *
 *  doc and examples: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
 *
 * @member {boolean} fill If true, the shape interior is rendered using {@link fillStyle}
 *
 * @member {boolean} stroke If true, the shape contour is rendered using {@link strokeStyle},
 *    {@link lineWidth}, {@link lineCap} and {@link lineJoin}.
 *
 * @member {number} offsetX x offset relative to the entity transformation
 *
 * @member {number} offsetY y offset relative to the entity transformation
 */
export default class Shape extends Sprite {

  onCreate() {
    super.onCreate();
    this.createAttribute('fillStyle', '#00f', Types.String);
    this.createAttribute('strokeStyle', '#f00', Types.String);
    this.createAttribute('fill', true, Types.Boolean);
    this.createAttribute('stroke', false, Types.Boolean);
    this.createAttribute('lineWidth', 1.0, Types.Float);
    this.createAttribute('lineCap', 'butt', Types.String);
    this.createAttribute('lineJoin', 'miter', Types.String);
    this.createAttribute('offsetX', 0, Types.Int);
    this.createAttribute('offsetY', 0, Types.Int);
  }

  /**
   * Trace the shape on the CanvasRenderingContext2D ctx.
   *
   * This method should be overriden by subclasses to trace the shape.
   * The shape must be drawn with {0,0} as the shape anchor.
   *
   * @protected
   * @param  {CanvasRenderingContext2D} ctx The context on which to draw
   */
  traceShape(ctx) {} // jshint unused: false

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = this.lineCap;
    ctx.lineJoin = this.lineJoin;

    ctx.translate(this.transform.x + this.offsetX, this.transform.y + this.offsetY);
    ctx.rotate(this.transform.theta);

    ctx.beginPath();

    this.traceShape(ctx);

    if (this.fill) ctx.fill();
    if (this.stroke) ctx.stroke();

    ctx.restore();
  }
}
