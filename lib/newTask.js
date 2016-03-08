const path = require('path');
const fs = require('fs');
const ncp = require('ncp').ncp;
const spawn = require('child_process').spawn;

ncp.limit = 16;

module.exports = function(dest) {
  const destination = path.join(process.cwd(), dest);
  const source = path.join(__dirname, '../templates/shooter');

  // Making sure we don't overwrite anything
  try {
    fs.statSync(destination);
    console.log(`${destination} already exists, aborting.`);
    console.log('Consider using this command only on non existing directories.');
    process.exit(1);
  } catch(e) {
    if (e.code != 'ENOENT') {
      throw new Error('Unexpected error: '+e);
    }
    // else: file does not exist and we are good to go!
  }

  console.log(`===> Creating new project in ${destination}`);

  ncp(source, destination, (err) => {
    if (err) {
      return console.error(err);
    }

    console.log('===> Downloading dependencies');

    const child = spawn('npm', ['install'], {
      cwd: destination,
      stdio: ['inherit', 'inherit', 'inherit']
    });

    child.on('exit', (code) => {
      if (code === 0) {
        console.log(`\n===> New project successfully created in ${dest}!`);
      } else {
        console.error('\n==> Something went wrong with npm :(');
      }
    });
  });
};
