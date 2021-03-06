import Component  from 'core/Component.js';
import game  from 'core/Game.js';
import { Keycodes } from 'core/Keycodes.js';
import RPC  from 'core/RPC.js';
import Types  from 'core/Types.js';
import Input  from 'core/components/Input.js';
import { Pawn } from 'prefabs.js';

export default class Player extends Component {

  onCreate() {
    this.createAttribute('pawn', null, Types.Component);

    if (game.playerId != this.entity.id) {
      this.getComponent(Input).disable();
    }
  }

  spawn() {
    if (this.pawn == null) {
      this.pawn = this.scene.newPrefab(Pawn, this).getComponent('Pawn');
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
