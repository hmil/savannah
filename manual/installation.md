# Installing Savannah

This page describes how to install Savannah. This is a prerequisite for anything
you plan to do with Savannah.

## Node.js

First, install nodejs.  Go to https://nodejs.org/en/download/ and choose the package matching 
your operating system.

**note for Ubuntu users**: You must install nodejs through nvm. It's the only reasonnable way to install nodejs on Ubuntu.  
First install nvm as described in the [installation](https://github.com/creationix/nvm#install-script)
section. Then run:  
`nvm install 5.0` to install nodejs v5.0 through nvm  
`nvm use 5.0` to use nodejs v5.0  
_note_: You might need to run `nvm use 5.0` each time you launch a new shell to
tell nvm you are using nodejs version 5.0.

## git

This step is only necessary while the project is in prerelease phase: There is no
stable branch at the moment so you must install the package from the sources.  
(at some point it will be available as an npm package)

To get the sources, first [install git](https://git-scm.com/downloads) (be sure to download the cli-tool, not the graphical
interface).

## Savannah

node.js and git are the only prerequisites to Savannah. From there, all steps are common
no matter your operating system.

In your working directory, clone the Savannah repository  
`git clone https://github.com/hmil/savannah.git`  
( or `git clone git@github.com/hmil.savannah.git` if you have setup ssh keys with github)

Then install the module _via_ npm:  
`npm install -g ./savannah/savannah-cli`

## Editor

While you can use any decent code editor to edit Savannah projects, the only officially
supported setup is the following:

[Atom](https://atom.io/) with the following plugin (which can be installed within atom's settings view):
- [jshint](https://github.com/sindresorhus/atom-jshint) (To highlight possible errors in your code)

## What's next

All right, you've just setup a decent development environmnet for Savannah. Head-on to
the [tutorial](https://hmil.github.io/savannah/docs/manual/tutorial.html) to get
started!
