# Getting started

This tutorial is an introduction by example to Savannah. Since the documentation 
is rather sparse at the moment, I would suggest anyone interested in this project to go
through this tutorial first.

First, make sure you installed the cli as described in the [installation](https://hmil.github.io/savannah/docs/manual/installation.html) section.

## Creating a project

To create a project, navigate to your working directory and run

`savannah new my_project`

This command creates a new savannah project using the default template in a folder called `my_project`.  
Next, copy the contents of `savannah/savannah-core/src` to `my_project/src/core`.

`cp -r /path/to/savannah/savannah-core/src my_project/src/core`

You may wonder why `savannah new` did not take care of this as well. The answer is that it will
at some point, it's just not implemented yet.

The default template is actually a playable game so let's try it out:

```sh
cd my_project
savannah run
```

You can now open a browser window at http://localhost:3000/ and play around with the example game.

Use [wsad] keys (or [zsqd] depending on your keyboard) to move your pawn and [space] to fire bullets. 
Open a second browser window to the same address to see the multiplayer capabilities of savannah.

_info:_ Savannah is built around a _multiplayer first_ approach which means that this
kind of multiplayer interaction comes out of the box as you'll see later!

## Experiment

Now that you know how to create a savannah app, let's see what's under the hood.

First notice the directory structure:  
Your project contains an `src/` folder which is all you need to worry about.

The `src/` folder is partitioned as follows:
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
- __components/__ contains most of your game logic in [components](https://hmil.github.io/savannah/docs/class/src/Component.js~Component.html)
  as described in the [components](https://hmil.github.io/savannah/docs/manual/usage.html#entity-component-model) concepts section.
- __core/__ contains the core Savannah library. You can learn more about the core library in the [documentation](https://hmil.github.io/savannah/docs/identifiers.html).
  This folder is reserved for built-in stuff, you should not change anything in there.
- __scenes/__ contains all of your game [scenes](https://hmil.github.io/savannah/docs/class/src/Scene.js~Scene.html).
- __Client.js__ is the entry point when the game is launched on a client.
- __Server.js__ is the entry point when the game is launched on a server.
- __prefabs.js__ contains all of your game [prefabs](https://hmil.github.io/savannah/docs/manual/usage.html#prefabs).

You don't need to read all of the linked documentation at the moment. Just follow
this tutorial and go back to the documentation when you need it.

Now on to adding features to our game!

### Bouncing bullets

First we want to enhance the Bullets. Open the file `src/components/Bullet.js`.
You will see a method named `onCollision`. This method is triggered by the [Physics](https://hmil.github.io/savannah/docs/class/src/components/Physics.js~Physics.html)
component whenever a collision occurs.  
Take a moment to understand what this function does.

Now let's try to make the bullets bounce when they touch the world boundaries instead of
just disappearing.
Uncomment the following lines:
```js
if (evt.vx !== 0) {
 this.physics.vx = -this.physics.vx;
} else if (evt.vy !== 0) {
 this.physics.vy = -this.physics.vy;
}
```
and remove the call to `destroy()` indicated by a comment:
```js
// TUTORIAL: remove the next line
this.destroy();
```

Kill the server instance if it was running (CTRL+C) and start a fresh one with
`savannah run`

Refresh your browser window and you should clearly see the result of our modification.

__note:__ You must reload the server each time you change something in the game, otherwise
the client and the server run different versions of the code and errors will occur.


### FPS camera

The next hack is a bit more involved. We want to bind the camera to the player's
pawn such that the pawn is always in the middle of the viewport.

To do so, open `src/prefabs.js`.
In the definition of the `Pawn` prefab, you'll see a commented line:
```js
// { comp: CameraComp },
```

Uncomment it. This will bind a new camera to each created pawn.

Now we need to make sure that only the camera bound to the pawn owned by the current
player is active (ie. We don't want to follow another player's pawn). To this end,
open `src/components/Pawn.js`. This component is attached to the Pawn prefab and
defines most of a its behavior. In `onCreate()`, you'll see three commented lines
of code.
Uncomment them all:  
```js
// import Camera from 'core/components/Camera.js';
 
...

// this.getComponent(Camera).backgroundColor = '#000';

if (game.playerId != this.entity.parent.id) {
  this.getComponent(Input).disable();
  // this.getComponent(Camera).disable();
}
```

The first one imports the Camera component definition used below. The second line
tells the camera to render a black background.  
The last one lives within a conditional block which tests whether this pawn is 
owned by the current player. If it is not the case, then the camera is disabled.

The last tweak we need to do is to get rid of the original camera. This one was 
created in the `scenes/MainScene.js` file.
```js
this.newPrefab(Camera);
```
Remove this line because we don't need a global camera anymore. Restart the game server.  
The camera now follows your pawn!

You'll notice that the image freezes when the pawn is destroyed. This is because the camera is destroyed
with the pawn.

Now, one last task before you go: There's a way to respawn once your pawn died. Try to figure it out!
_hint: The answer is in `src/components/Player.js`_ 

## What next?
 
Well done! You went through the introductory tutorial. You should now have
a vague idea of how a Savannah game works. To dig in more depth, I recommend you read the
following:

- The source of [Pawn.js](https://github.com/hmil/savannah/blob/master/savannah-cli/templates/shooter/src/components/Pawn.js)
  and [Player.js](https://github.com/hmil/savannah/blob/master/savannah-cli/templates/shooter/src/components/Player.js)
- The [concepts](https://hmil.github.io/savannah/docs/manual/usage.html#concepts) documentation page which covers in more depth fundamental concepts of the Savannah framework.
