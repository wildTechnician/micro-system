require('./preScript')
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

let currentPath = path.resolve(__dirname, '../_example')
exec(`ls -all`, { cwd: currentPath }).then(({ stdout, stderr }) => {
  console.log(stdout, stderr)
})
