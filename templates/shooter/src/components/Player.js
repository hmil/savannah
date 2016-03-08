import Component from 'core/Component.js';
import Transform from 'core/components/Transform.js';
import Physics from 'core/components/Physics.js';
import Entity from 'core/Entity.js';
import Types from 'core/Types.js';
import { Log } from 'core/Log.js';
import Graphics from 'core/components/Graphics.js';
import Input from 'core/components/Input.js';
import game from 'core/Game.js';
import { Keycodes } from 'core/Keycodes.js';
import RPC from 'core/RPC.js';

import Pawn from 'components/Pawn.js';

export default class Player extends Component {

  onCreate() {
    this.createAttribute('pawn', null, Types.Component(Pawn));

    if (game.playerId != this.entity.id) {
      this.getComponent(Input).disable();
    }
  }

  spawn() {
    if (this.pawn == null) {
      this.pawn = this.scene.newEntityWithComponents([Transform, Pawn, Graphics, Physics, Input], this.entity).getComponent(Pawn);
      this.pawn.reset();
    }
  }

  onKeyDown(evt) {
    switch(evt.which) {
      case Keycodes.j:
        RPC.call(this, 'spawn', null);
        break;
    }
  }
}
