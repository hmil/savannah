import 'scenes/index.js';
import 'components/index.js';
import 'core/components/index.js';

import Input from 'core/components/Input.js';
import game from 'core/Game.js';
import Server from 'core/Server.js';
import Player from 'components/Player.js';

export default class extends Server {

  onCreate() {
    this.scene = game.createScene('MainScene');
    game.start();
  }

  onClientConnect(client) {
    var player = this.scene.newEntityWithComponents([Player, Input]);
    client.addToScene(this.scene);
    player.getComponent(Player).spawn();
    client.send('playerId', player.id);
  }

  onClientDisconnect() {  }

}
