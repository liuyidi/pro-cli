const download = require('./download')
const chalk = require('chalk');

module.exports = (template, answers) => {
    download(template, answers).then((res) => {
        console.log(
            chalk.green('New project has been initialized successfully!')
        );
    }).catch(err => {
        console.log(chalk.red(err));
    });
}