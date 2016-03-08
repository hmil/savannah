import { Log } from 'savannah/Log.js';
import Component from 'savannah/Component.js';
import Types from 'savannah/Types.js';
import ShapeSprite from 'savannah/components/ShapeSprite.js';
import Transform from 'savannah/components/Transform.js';
import Physics from 'savannah/components/Physics.js';
import RPC from 'savannah/RPC.js';
import Input from 'savannah/components/Input.js';

import Bullet from './Bullet.js';
import game from 'savannah/Game.js';

export default class Pawn extends Component {

  onCreate() {
    super.onCreate();
    // this.isMainPawn = false;
    // this.radius = 8;
    this.BARREL_POS = 8;
    this.SPEED = 0.1;
    this.ANGULAR_SPEED = 0.005;
    this.COOLDOWN = 100;
    this.lastFire = 0;
    this.physics.radius = 6;
    // this.enableNetworking(); // This object's networkAttributes are replicated on the network

    this.createAttribute('lives', 3, Types.Int);
    
    if (game.playerId != this.entity.parent.id) {
      this.getComponent(Input).disable();
    }
  }

  onDraw(ctx) {
    ctx.save();

    ctx.fillStyle = this.isMainPawn ? '#f00' : '#00f';

    ctx.translate(this.transform.x, this.transform.y);
    ctx.rotate(this.transform.theta);

    ctx.beginPath();
    ctx.moveTo(6, 0);
    ctx.lineTo(-6, 4);
    ctx.lineTo(-6, -4);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // Input events are client-side code only
  onKeyDown(evt) {
    switch (evt.which) {
      // case Keycodes.J:
      //   RPC.call(this.scene, 'joinGame', null, function(ack) {
      //     if (ack.success) {
      //       // Do stuff
      //     }
      //   });
      //   break;
      case 32:
        let bullet = this.fire();
        RPC.call(this, 'fire', null, function(ack) {
          // TODO: implement RPC ACK
          // bullet can be null if player cooldown had not expired on the client side but had expired on
          // the server when the fire RPC packet arrived there
          if (bullet != null) {
            if (ack.success) {
              // If bullet is still in the scene, it will benefit from interpolation and will not jitter.
              // Otherwise it will have disappeared and been replaced by the bullet coming from state updates
              // in which case this update has no effect. The latter case is less likely to happen though as network
              // update rate should be optimized to avoid early server updates.
              bullet.id = ack.bulletId;
            } else {
              bullet.removeFromScene();
            }
          }
        });
        break;
      default:

    }
  }

  onUpdate() {
    const input = this.getComponent(Input);

    this.physics.vtheta = 0;
    this.physics.vx = 0;
    this.physics.vy = 0;

    if (input.keys.right) {
      this.physics.vtheta = this.ANGULAR_SPEED;
    }
    if (input.keys.left) {
      this.physics.vtheta -= this.ANGULAR_SPEED;
    }
    if (input.keys.down) {
      this.physics.vx = (-this.SPEED * Math.cos(this.transform.theta));
      this.physics.vy = (-this.SPEED * Math.sin(this.transform.theta));
    }
    if (input.keys.up) {
      this.physics.vx = (this.SPEED * Math.cos(this.transform.theta));
      this.physics.vy = (this.SPEED * Math.sin(this.transform.theta));
    }
  }

  hit(bullet) {
    this.lives--;
    if (this.lives === 0) {
      this.destroy();
    }
  }

  fire() {
    if (Date.now() - this.lastFire > this.COOLDOWN) {
      this.lastFire = Date.now();
      let bullet = this.scene.newEntityWithComponents([Transform, Bullet, ShapeSprite, Physics]);
      bullet.parent = this.parent;
      // bullet.velocity.x = bullet.SPEED * Math.cos(this.transform.angle);
      // bullet.velocity.y = bullet.SPEED * Math.sin(this.transform.angle);
      bullet.transform.x = this.transform.x + this.BARREL_POS * Math.cos(this.transform.theta);
      bullet.transform.y = this.transform.y + this.BARREL_POS * Math.sin(this.transform.theta);
      bullet.physics.vx = Bullet.SPEED * Math.cos(this.transform.theta);
      bullet.physics.vy = Bullet.SPEED * Math.sin(this.transform.theta);
      return bullet;
    }
  }

  reset() {
    this.transform.x = 300 * (Math.random() * 0.8) + 100;
    this.transform.y = 300 * (Math.random() * 0.8) + 100;
  }

}
