import { Log } from 'core/Log.js';
import Scene from 'core/Scene.js';
import Transform from 'core/components/Transform.js';
import Camera from 'core/components/Camera.js';
import RectangleShape from 'core/components/RectangleShape.js';

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

    const boundaries = this.newEntityWithComponents([Transform, RectangleShape]).getComponent(RectangleShape);
    boundaries.width = 800;
    boundaries.height = 600;
    boundaries.strokeStyle = '#0f0';
    boundaries.stroke = true;
    boundaries.fill = false;
    
    var camera = this.newEntityWithComponents([Transform, Camera]);
    camera.getComponent(Camera).backgroundColor = '#000';
    camera.transform.x = 400;
    camera.transform.y = 300;

  }

}
