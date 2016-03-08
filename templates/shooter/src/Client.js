import 'scenes/index.js';
import 'components/index.js';
import 'savannah/components/index.js';

import Client from 'savannah/Client.js';
import { Log } from 'savannah/Log.js';
import game from 'savannah/Game.js';

export default class extends Client {
  constructor() {
    super();
    this.connect();
  }

  onConnect() {
    game.start();
  }

  onDisconnect() {
    game.stop();
  }

  onMessage(type, data) {
    switch(type) {
      case 'playerId':
        Log.info(`setting player id to ${data}`);
        game.playerId = data;
        break;
      default:
        super.onMessage(type, data);
    }
  }
}
