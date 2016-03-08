import Component from 'savannah/Component.js';
import Transform from 'savannah/components/Transform.js';
import Physics from 'savannah/components/Physics.js';
import Entity from 'savannah/Entity.js';
import Types from 'savannah/Types.js';
import { Log } from 'savannah/Log.js';
import Graphics from 'savannah/components/Graphics.js';
import Input from 'savannah/components/Input.js';
import game from 'savannah/Game.js';

import Pawn from 'components/Pawn.js';

export default class Player extends Component {

  onCreate() {
    //this.pawn = PawnPrefab.create(this);
    Log.info('creating pawn');
    const pawn = this.scene.newEntityWithComponents([Transform, Pawn, Graphics, Physics, Input], this.entity);
    this.pawn = pawn.getComponent(Pawn);
  }

  get attributesList() {
    return {
      pawn: Types.Component(Pawn)
    };
  }

  spawn() {
    this.pawn.reset();
    this.scene.insert(this.pawn);
  }

  setPawnId(id) {
    this.pawn.id = id;
  }

  turnLeft() {

  }

  turnRight() {

  }


}
