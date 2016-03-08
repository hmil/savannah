import { Log } from 'savannah/Log.js';

import Input from 'savannah/components/Input.js';
import game from 'savannah/Game.js';
import Player from 'components/Player.js';
import RPC from 'savannah/RPC.js';
import Physics from 'savannah/components/Physics.js';


// Obsolete. TODO: remove
export default class PlayerInput extends Input {

  onCreate() {
    super.onCreate();
    this.SPEED = 0.1;
    this.ANGULAR_SPEED = 0.005;
    if (game.playerId != this.entity.id) {
      this.disableInput();
    }
  }

  get player() {
    return this.entity.getComponent(Player);
  }
}
