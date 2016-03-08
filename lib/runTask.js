const spawn = require('child_process').spawn;
const path = require('path');

module.exports = function(directory) {
  var cwd = path.join(directory || process.cwd(), 'src');

  console.log(`===> Starting game server. Press CTRL+C to stop.`);

  const child = spawn('node', ['../bootstrap.js'], {
    cwd: cwd,
    stdio: ['inherit', 'inherit', 'inherit']
  });
};
