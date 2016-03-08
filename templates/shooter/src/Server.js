import 'scenes/index.js';
import 'components/index.js';
import 'savannah/components/index.js';

import game from 'savannah/Game.js';
import Server from 'savannah/Server.js';
import Player from 'components/Player.js';

export default class extends Server {

  onCreate() {
    this.scene = game.createScene('MainScene');
    game.start();
  }

  onClientConnect(client) {
    var player = this.scene.newEntityWithComponents([Player]);
    client.addToScene(this.scene);
    client.send('playerId', player.id);
  }

  onClientDisconnect() {  }

}
