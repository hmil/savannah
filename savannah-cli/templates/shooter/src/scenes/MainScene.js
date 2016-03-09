import { Log } from 'core/Log.js';
import Scene from 'core/Scene.js';
import ShapeSprite from 'core/components/ShapeSprite.js';
import Transform from 'core/components/Transform.js';
import Camera from 'core/components/Camera.js';

import PhysicSystem from 'core/systems/PhysicSystem.js';

export default class MainScene extends Scene {

  onCreate() {
    super.onCreate();

    const physics = new PhysicSystem();
    physics.boundaries = {
      left: 0,
      right: 800,
      top: 0,
      bottom: 600
    };
    this.addSystem(physics);

    // TODO: add rectangle shape sprite to materialize terrain boundaries

    // Spawn an object
    this.newEntityWithComponents([Transform, ShapeSprite]);

    var camera = this.newEntityWithComponents([Transform, Camera]);
    camera.getComponent(Camera).backgroundColor = '#000';

  }

}
