import Entity from './Entity.js';
import GameModel from './GameModel.js';
import { uid } from './utils.js';
import { Log } from './Log.js';
import GraphicSystem from './systems/GraphicSystem.js';

/* globals Int8Array */
const emptyArray = new Int8Array(0);

export default class Scene {

  constructor(id = null) {
    this._model = new GameModel(this);
    this._id = (id != null) ? id : uid();
    this._systems = [];
  }

  onCreate() {
    this.addSystem(new GraphicSystem());
  }

  onUpdate(dt) {
    for (const sys of this._systems) {
      sys.onUpdate(dt);
    }
    this._model.update(dt);
    for (const i of Object.keys(this._model.entities)) {
      const entity = this._model.entities[i];
      if (entity.destroyed) {
        entity.onDestroy();
        this.model.removeEntity(entity);
      }
    }
  }

  getSystem(Type) {
    for (const i of Object.keys(this._systems)) {
      const sys = this._systems[i];
      if (sys.constructor.name === Type.name) {
        return sys;
      }
    }
  }

  addSystem(system) {
    this._systems.push(system);
  }

  get id() {
    return this._id;
  }

  get model() {
    return this._model;
  }

  get entities() {
    return this._model.entities;
  }

  newEntity(parent = null) {
    return this.newEntityWithComponents(emptyArray, parent);
  }

  newEntityWithComponents(comps, parent = null) {
    Log.info('creating entity');
    var entity = new Entity(this);
    entity.parent = parent;
    this._model.addEntity(entity);
    entity.addComponents(comps);
    entity.onCreate();
    return entity;
  }

  destroy(entity) {
    this._model.removeEntity(entity);
    entity.onDestroy();
  }

}
