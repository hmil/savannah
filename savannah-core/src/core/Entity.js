import Physics  from './components/Physics.js';
import { uid } from './utils.js';


/**
 * Building block to represent *anything in a scene*. The behaviour of an entity
 * is defined by the components attached to it.
 *
 * The Entity class is like the backbone of scene objects. The components attached
 * to it are the muscles and flesh, they define what the entity does. Finally the
 * component properties can be used to tune parameters of the object.
 *
 * An entity can only live within one scene.
 *
 * Entity provides a few mechanisms to connect components:
 * - A list of attached {@link components} is available at all times
 * - Components can be fetched by type using the {@link getComponent} method
 * - Events triggered with {@link triggerEvent} allow to send messages to all components.
 *
 * {TODO: link prefabs} should be used to create fully fleshed entities.
 */
export default class Entity {

  constructor(scene, id = null) {
    this._components = {};
    this._scene = scene;
    this._id = (id !== null) ? id : uid();
    this._compIdCounter = 0;
    this._isSynchronized = true;
    this._transform = null;
    this._handlers = {};
    this._destroyed = false;
  }

  /**
   * Unique identifier for this identity. The id is used to identify this entity
   * in the scene and on the network.
   * @type {string}
   */
  get id() {
    return this._id;
  }

  /**
   * The list of components attached to this entity. DO NOT EVER modify this list.
   * Use {@link addComponent} or {@link removeComponent} instead.
   * @type {Component[]}
   */
  get components() {
    return this._components;
  }

  /**
   * Whether this entity is replicated on the network. Entities which are not
   * synchronized only live on the local client and cannot be seen nor deleted
   * remotely.
   * @type {boolean}
   */
  get isSynchronized() {
    return this._isSynchronized;
  }

  /**
   * The scene this entity lives in
   * @type {Scene}
   */
  get scene() {
    return this._scene;
  }

  /**
   * Shorthand for {@link getComponent}(Transform)
   * @type {Transform}
   */
  get transform() {
    return this._transform;
  }

  /**
   * Shorthand for {@link getComponent}(Physics)
   * @type {Physics}
   */
  get physics() {
    return this.getComponent(Physics);
  }

  /**
   * Whether this entity has been destroyed.
   *
   * A small interval of time may elapse between the moment {@link destroy} is called
   * and when the entity is removed from the scene. The destroyed property however is
   * set to true immediately after a call to {@link destroy}.
   *
   * @type {boolean}
   */
  get destroyed() {
    return this._destroyed;
  }

  /**
   * Destroys this entity. Destroying an entity sets its {@link destroyed} property
   * to true and removes it from the scene on the next game tick.
   */
  destroy() {
    this._destroyed = true;
  }

  /**
   * Makes this entity synchronized.
   *
   * @see {@link isSynchronized}
   */
  enableNetworking() {
    this._isSynchronized = true;
  }

  /**
   * Makes this entity not synchronized.
   *
   * @see {@link isSynchronized}
   */
  disableNetworking() {
    this._isSynchronized = false;
  }


  /**
   * Enables an attached component. This function should not be called by end user.
   * Use {@link Component#enable} instead.
   *
   * @param  {Component} comp a component attached to this entity
   */
  enableComponent(comp) {
    this._registerComponentHandlers(comp);
  }

  /**
   * Disables an attached component. This function should not be called by end user.
   * Use {@link Component#disable} instead.
   *
   * @param  {Component} comp a component attached to this entity
   */
  disableComponent(comp) {
    this._unregisterComponentHandlers(comp);
  }


  /**
   * Triggers an event `evt` with the event data `data`.
   *
   * All functions named `onEvent` where `Event` is the value you pass as `evt`,
   * of components attached to this entity will be called with `data` as only
   * parameter.
   *
   * Although case doesn't count, the convention is that event names be camel cased,
   * starting with a lowercase (ie. 'keyDown') and event handler have an uppercase
   * after the 'on' (ie. 'onKeyDown', notice the 'K' is uppercased here).
   *
   * @param  {string} evt  Event name
   * @param  {Object} data Event data
   */
  triggerEvent(evt, data) {
    if (this._handlers[evt] != null) {
      for (const h of this._handlers[evt]) {
        h(data);
      }
    }
  }

  /**
   *  @private
   */
  addComponentInstance(comp) {
    this._components[comp.id] = comp;
    comp.entity = this;
    this._registerComponentHandlers(comp);

    // Special case optimization for extremely common components
    if (comp.constructor.name === 'Transform') {
      this._transform = comp;
    }
    return comp;
  }

  /**
   * Attaches one component to this entity
   *
   * @param  {Component.constructor} Comp Component to add
   * @param {string} [id] component id. If not specified, a new id is generated
   */
  addComponent(Comp, id = null) {
    var comp_id = (id == null) ? uid() : id;
    var comp = new Comp(comp_id);
    return this.addComponentInstance(comp);
  }

  /**
   * Attaches multiple components to this entity
   *
   * @param  {Component.constructor[]} Comps Components to add
   */
  addComponents(Comps) {
    for (let Comp of Comps) {
      this.addComponent(Comp);
    }
  }

  /**
   * Removes a component from this entity
   *
   * @param  {string} id Id of the component to remove
   */
  removeComponent(id) { // jshint unused: false
    throw new Error('Removing components is not supported');
    // Cannot remove component for now because we would need to remove associated event handlers

    // const comp = this._components[id];
    // if (comp === this._transform) {
    //   this._transform = null;
    // }
    // delete this._components[id];
  }

  /**
   * Returns the first comonent of type Type attached to this entity.
   *
   * Note that if you expect the entity to have multiple components of type Type,
   * you should use the {@link components} attribute instead using the component id.
   *
   * @param  {Component.constructor} Type Component type to get
   * @return {Component} A component of type Type attached to this entity. null if none was found.
   */
  getComponent(Type) {
    var name = Type;
    if (typeof Type !== 'string') {
      name = Type.name;
    }
    name = name.toLowerCase();
    for (const i of Object.keys(this._components)) {
      const comp = this._components[i];
      if (comp.constructor.name.toLowerCase() === name) {
        return comp;
      }
    }
    return null;
  }

  /**
   * Checks whether this entity has a component of type Type.
   *
   * @example
   * entity.hasComponent(Transform); // true in most cases
   *
   * @param  {Component.constructor} Type Component type to look for
   * @return {boolean} true if this entity has a component of the given type.
   */
  hasComponent(Type) {
    return this.getComponent(Type) != null;
  }

  /**
   * @private
   * @param {Component} comp
   */
  _registerComponentHandlers(comp) {
    for (const evt of Object.keys(comp.eventHandlers)) {
      this._addEventHandler(evt, comp.eventHandlers[evt]);
    }
  }

  /**
   * @private
   * @param {Component} comp
   */
  _unregisterComponentHandlers(comp) {
    for (const evt of Object.keys(comp.eventHandlers)) {
      this._removeEventHandler(evt, comp.eventHandlers[evt]);
    }
  }

  /**
   * @private
   * @param {string} evt
   * @param {function} fn
   */
  _addEventHandler(evt, fn) {
    if (typeof this._handlers[evt] === 'undefined') {
      this._handlers[evt] = [];
    }
    this._handlers[evt].push(fn);
  }

  /**
   * @private
   * @param {string} evt
   * @param {function} fn
   */
  _removeEventHandler(evt, fn) {
    let handlers = this._handlers[evt];
    if (typeof handlers === 'undefined') {
      return;
    }
    handlers.splice(handlers.indexOf(fn), 1);
    if (handlers.length === 0) {
      delete this._handlers[evt];
    }
  }

  onCreate() {
    for (let i of Object.keys(this._components)) {
      this._components[i].onCreate();
    }
  }

  onDestroy() {
    for (let i of Object.keys(this._components)) {
      this._components[i].onDestroy();
    }
  }

  onUpdate(dt) {
    for (let i of Object.keys(this._components)) {
      const component = this._components[i];
      if (component.enabled) {
        this._components[i].onUpdate(dt);
      }
    }
  }
}
