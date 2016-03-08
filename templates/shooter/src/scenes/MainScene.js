import { Log } from 'core/Log.js';
import Scene from 'core/Scene.js';
import ShapeSprite from 'core/components/ShapeSprite.js';
import Transform from 'core/components/Transform.js';
import Camera from 'core/components/Camera.js';

import BasicPhysics from 'core/systems/BasicPhysics.js';

export default class MainScene extends Scene {

  onCreate() {
    super.onCreate();

    this.addSystem(new BasicPhysics());

    // Spawn an object
    this.newEntityWithComponents([Transform, ShapeSprite]);

    var camera = this.newEntityWithComponents([Transform, Camera]);
    camera.getComponent(Camera).backgroundColor = '#000';

  }

}
