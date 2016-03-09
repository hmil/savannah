import { Log } from './Log.js';
import Timer from './Timer.js';

class Game {

  constructor() {
    this._scenes = {};
    this._activeScenes = {};
    this._components = {};
    this._timer = new Timer((dt) => this.update(dt));
    this.playerId = null;
  }

  get scenes() {
    return this._activeScenes;
  }

  getScene(id) {
    return this._activeScenes[id];
  }

  get currentScene() {
    var keys = Object.keys(this._activeScenes);
    if (keys.length > 1) {
      Log.warn('Game has multiple active scenes, picking the first one as "current"');
    }
    return (keys.length === 0) ? null : this._activeScenes[keys[0]];
  }

  registerScene(Scene) {
    this._scenes[Scene.name] = Scene;
  }

  createScene(name, id = null) {
    if (!this._scenes.hasOwnProperty(name)) {
      throw new Error(`Scene ${name} is not registered. Use game.registerScene() before loading a scene`);
    }
    Log.info(`Creating scene ${name}`);
    var scene = new this._scenes[name](id);
    this._activeScenes[scene.id] = scene;
    scene.onCreate();
    return scene;
  }

  removeScene(name) {

  }


  registerComponent(Comp) {
    if (Comp.name in this._components) {
      throw new Error(`Trying to register two components with the same name: ${Comp.name}`);
    }
    this._components[Comp.name] = Comp;
  }

  getComponent(name) {
    return this._components[name];
  }

  start() {
    this._timer.start();
  }

  stop() {
    this._timer.stop();
  }

  update(dt) {
    for (let i of Object.keys(this._activeScenes)) {
      this._activeScenes[i].onUpdate(dt);
    }
  }

}

export default new Game();
