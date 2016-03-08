import { Log } from 'savannah/Log.js';
import Scene from 'savannah/Scene.js';
import ShapeSprite from 'savannah/components/ShapeSprite.js';
import Transform from 'savannah/components/Transform.js';
import Camera from 'savannah/components/Camera.js';
import PlayerInput from 'components/PlayerInput.js';

import BasicPhysics from 'savannah/systems/BasicPhysics.js';

export default class MainScene extends Scene {

  onCreate() {
    super.onCreate();

    this.addSystem(new BasicPhysics());
    
    // Spawn an object
    this.newEntityWithComponents([Transform, ShapeSprite]);

    var camera = this.newEntityWithComponents([Transform, Camera]);
    camera.getComponent(Camera).backgroundColor = '#000';

  }

  // joinGame(data, ack) {
  //   var player = RPC.emitter; // Client emitting the RPC
  //   player.spawn();
  //   ack({success: true});
  // }

}
