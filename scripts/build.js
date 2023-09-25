require('./preScript')
const fs = require('fs');
const path = require('path');
const util = require('util');
const child_app_ath = path.resolve(__dirname, '../packages');
const child_apps = fs.readdirSync(child_app_ath).filter(i => !/^common|\.DS_Store/.test(i));
const { version } = require('../package.json')
const exec = util.promisify(require('child_process').exec);
const fileExit = util.promisify(fs.stat)
const inquirer = require('inquirer');

const question = [
  {
    type: 'checkbox',
    name: 'apps',
    message: 'Please select a packaged module',
    choices: child_apps,
  },
]
if (!process.env.NODE_ENV) {
  console.error('not select mode,please exec it!');
  process.exit(1)
}

inquirer.prompt(question).then(async (answer) => {
  const buildApps = answer.apps.length <= 0 ? [] : answer.apps;
  buildApps.forEach(async (item) => {
    let currentPath = path.resolve(__dirname, '../packages/' + item)
    try {
      const state = await fileExit(currentPath + '/package.json');
      if (state) {
        console.log(`${item}开始打包,耗时较久请耐心等待...`);
        const { stdout, stderr } = await exec('pnpm build', { cwd: currentPath });
        console.log(stdout);
        console.error(stderr);
      } else {
        throw item + 'not package.json,please check it!';
      }
    } catch (e) {
      console.error(e);
      process.exit(1)
    }

  })
})


