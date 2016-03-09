import game from '../Game.js';

import ShapeSprite from './ShapeSprite.js';
import Transform from './Transform.js';
import Camera from './Camera.js';
import Sprite from './Sprite.js';
import Input from './Input.js';
import Physics from './Physics.js';

game.registerComponent(ShapeSprite);
game.registerComponent(Transform);
game.registerComponent(Camera);
game.registerComponent(Sprite);
game.registerComponent(Input);
game.registerComponent(Physics);
