# Getting started

This tutorial is an introduction to Savannah through example. Since the documentation 
is rather sparse at the moment, I would advise anyone interested in this project to go
through this tutorial first.

First, make sure you installed the cli as described in the [installation](https://hmil.github.io/savannah/docs/manual/installation.html) section.

## Creating a project

To create a project, navigate to your working directory and run

`savannah new my_project`

This command creates a new savannah project using the default template at the location
defined by `my_project`.

The default template is actually a playable game so let's try it out:

```sh
cd my_project
savannah run
```

**note:** The `savannah run` runs the savannah game located in the current folder.

You can now open a browser window at http://localhost:3000/ and play around with example game.

Use [wsad] keys or [zsqd] to move your pawn and [space] to fire bullets. Open a second browser window
to the same address to see the multiplayer capabilities of savannah.

_info:_ Savannah is built around a _multiplayer first_ approach which means that this
kind of multiplayer interaction comes out of the box as you'll see later!

## Experiment

You've seen how to create your first savannah app. Now let's see what's under the hood.

First notice the directory structure:  
Your project contains an `src/` folder which is basically all you need to worry about.

The `src/` folder is partitionned as follows:
```
src/
|
+- compoents/
+- core/
+- scenes/
+- Client.js
+- prefabs.js
+- Server.js
```

Let's break it down:
- __components/__ contains most of your game's logic bundled as [components](https://hmil.github.io/savannah/docs/class/src/Component.js~Component.html)
  as described in the [components](https://hmil.github.io/savannah/docs/manual/usage.html#entity-component-model) concepts section.
- __core/__ contains the core Savannah library. The core library has a [dedicated documentation](https://hmil.github.io/savannah/docs/identifiers.html)
- __scenes/__ contains all of your game's [scenes](https://hmil.github.io/savannah/docs/class/src/Scene.js~Scene.html)
- __Client.js__ is the entry point for the game when launched on a client
- __Server.js__ is the entry point for the game when launched on a server
- __prefabs.js__ contains all of your game's [prefabs](https://hmil.github.io/savannah/docs/manual/tutorial.html#prefabs)

You don't need to read all of the linked documentation at the moment. Just follow
this tutorial and go back to the documentation when you need it.

To familiarize yourselves with Savannah, let's try to improve our game a little.

### Bouncing bullets

First we'll want to enhance the Bullets. Open the file `src/components/Bullet.js`.
You'll see an onCollision method. This method is triggered by the [Physics](https://hmil.github.io/savannah/docs/class/src/components/Physics.js~Physics.html)
component whenever a collision occurs.  
Take a moment to understand what this function does.

Now let's try to make the bullets bounce when they touch the world boundaries instead of
just dying.
Uncomment the following lines:
```js
// ...or make it bounce like crazy!
if (evt.vx !== 0) {
 this.physics.vx = -this.physics.vx;
} else if (evt.vy !== 0) {
 this.physics.vy = -this.physics.vy;
}
```
and remove the call to `destroy()`:
```js
// destroy the bullet...
this.destroy();
```

Kill the server instance if it was running (CTRL+C) and start a fresh one with
`savannah run`

Test the game again and you should observe that when bullets hit the world boundaries,
they bounce instead of dying.

__note:__ You must reload the server each time you change something in the game, otherwise
the client and the server will run different versions of the code and errors are to be expected.


### FPS camera

The next hack is a bit more involved. We want to bind the camera to the player's
pawn such that the pawn is always in the middle of the viewport.

To do so, open `src/prefabs.js`.
In the definition of the `Pawn` prefab, you'll see a commented line:
```js
{ comp: CameraComp },
```

Uncomment it. This will bind a new camera to each created pawn.

Now we need to make sure that only the camera bound to the pawn owned by the current
player is active (ie. We don't want to follow another player's pawn). To do this, let's
open `src/components/Pawn.js`. This component is attached to the Pawn prefab and is
responsible for most of a Pawn's behaviour. In `onCreate()`, you'll see to commented lines.
Uncomment them:  
```js
// this.getComponent(Camera).backgroundColor = '#000';

if (game.playerId != this.entity.parent.id) {
  this.getComponent(Input).disable();
  // this.getComponent(Camera).disable();
}
```

The first one makes sure the camera renders a black background. The second one lives
within a conditionnal block which tests whether this pawn is owned by the current
player. If it is not the case, then we disable the camera.

The last tweak we need to do is to get rid of the original camera. This one was 
created in the `scenes/MainScene.js` file.
```js
this.newPrefab(Camera);
```
Remove this line because we don't need a global camera anymore. Restart the game server.

You should observe that the camera follows your player instead of staying at a fixed position.


## What's next
 
Well done! You wen through Savannah's introduction tutorial. You should now have
a vague idea of how the engine works. To dig in more depth, I recommend you read the
following:

- The source of [Pawn.js](https://github.com/hmil/savannah/blob/master/savannah-cli/templates/shooter/src/components/Pawn.js)
  and [Player.js](https://github.com/hmil/savannah/blob/master/savannah-cli/templates/shooter/src/components/Player.js)
  in the example project to get an idea of how the notion of a _player_ is handled in the demo game. (bonus: find out how to respawn after you died!) 
- The [concepts](https://hmil.github.io/savannah/docs/manual/usage.html#concepts) documentation page which covers in more depth fundamental concepts of the Savannah framework.
