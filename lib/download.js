const download = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');
const { exec } = require('child_process');
const shell = require('shelljs');
const __root = process.cwd();

module.exports = (template, answers) => {
	const spinner = ora('downloading template...');
	const name = answers.name
	const autoInstallNpm = answers.autoInstallNpm
	const url = __root + '/' + name
	spinner.start();

	const findNpm = () => {
		try {
			which.sync('npm');
			return 'npm';
		} catch (err) {
			return err
		}
		throw new Error('please install npm');
	}

	return download(template, url).then(() => {
		spinner.stop();
		console.log(err ? chalk.red('download template failed') : chalk.green('download template success'));
		if (!autoInstallNpm) return Promise.resolve(template);
		const spinnerInstall = ora('Auto Installing...');
		spinnerInstall.start();
		try {
			const npm = findNpm();
			shell.exec(`cd ${path.join('./', name)} && ${npm} install`, function () {
				console.log(chalk.green(npm + ' install end'));
				spinnerInstall.stop();
				console.log('pro-cli生成的新项目成功');
			});
			exec('pwd', function () {
				cwd: url
			}, function (err, stdout, stderr) {
				if (err) {
					console.log(err);
				} else {
					console.log('进入项目目录');
					return Promise.resolve(template);
				}
			});
		} catch (err) {
			spinnerInstall.stop();
			console.log(err);
			return Promise.reject(err);
		}
	})
}