# savannah-cli

Command line interface for the savannah framework.


**Work in progress**

## Installation

Since this package is not stable yet, you must install it from the git repository.

Clone the repository to a directory called `savannah-cli`,  
then install it using npm like this: `npm install -g ./savannah-cli`

## Usage

This will create a sample project. The sample project is a simple shooter game.

- Type `savannah new dest` where `dest` is the destination folder for your project.
- Copy `savannah-core/src` (from the [savannah-core](https://github.com/hmil/savannah/savannah-core) repository) to `dest/src/core`. At some point this tool will include a package manager making this step unnecessary...

To run the project:

- `cd dest`
- `savannah run` to launch the game
- Open a browser window at [http://localhost:3000/] and start playing! (Tips: to see networked multiplayer in action, open two browser windows!)
