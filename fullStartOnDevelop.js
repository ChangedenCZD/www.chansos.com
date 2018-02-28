const shell = require('shelljs');
shell.exec('node ./start.js', {silent: true}, (code, stdout, stderr) => {
  console.log('Exit code:', code);
  console.log('Program output:', stdout);
  console.log('Program stderr:', stderr);
});
shell.exec('node --max-old-space-size=10000 build/dev-server.js');
