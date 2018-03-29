const __root = process.cwd();
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');                   // 显示不同的问答日志
const inquirer = require('inquirer');             // node问答式获取信息
const download = require('download-git-repo');    // 从github仓库拉取模板
const ora = require('ora');                       // 进度条-加载中
const which = require('which');                   // 找到npm是否存在
const shell = require('shelljs');                 // shelljs命令行工具

/**
 * 目的: 快速高效地完成业务需求~
 * vue-spa 中后台管理系统的spa方案
 * vue-h5  移动端的模板
 */
function findNpm() {
    try {
        which.sync('npm');
        return 'npm';
    } catch (e) {

    }
    throw new Error('please install npm');
}

function vueSpa() {
    const questions = [{
        type: 'input',
        name: 'name',
        message: 'vue-spa project name:'
    }];

    inquirer.prompt(questions).then(function (answers) {
        const name = answers.name;
        if (name === undefined) {
            return;
        } else {
            console.log("准备创建项目：" + name);
            var proPath = __root + '/' + name;
            if (!fs.existsSync(proPath)) {
                const spinner = ora('downloading template...');
                spinner.start();
                download('vuejs-templates/webpack', __root + '/' + name, function(err) {
                    spinner.stop();
                    console.log(err ? chalk.red('项目创建失败') : chalk.green('项目创建成功'));
                    // install npm_modules
                    const spinnerInstall = ora('Auto Installing...');
                    spinnerInstall.start();
                    const npm = findNpm();
                    shell.exec(`cd ${path.join('./', name)} && ${npm} install`, function () {
                        console.log(chalk.green(npm + ' install end'));
                        spinnerInstall.stop();
                        console.log('pro-cli生成的新项目成功');
                    });
                    try {
                        exec('pwd', function() {
                            cwd: __root + '/' + name
                        }, function(err, stdout, stderr){
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('进入项目目录');
                            }
                        });
                    } catch (err) {
                        console.log(err);
                    }
                });
            } else {
                console.log(chalk.red('项目已经存在，请使用别的名字'));
            }
        }
    });
}

function normal() {
    const questions = [{
        type: 'list',
        name: 'type',
        message: 'what do you want to generate ?',
        choices: [
            'vue-spa',
            'component',
            'model',
            'service',
            'custom'
        ]
    }];

    inquirer.prompt(questions).then(function (answers) {
        switch (answers.type) {
            case 'vue-spa':
                vueSpa();
                break;
            case 'component':
                console.log('component');
                break;
            case 'model':
                console.log('model');
                break;
            case 'service':
                console.log('service');
                break;
            case 'custom':
                console.log('custom');
                break;
            default:
                break;
        }
    });
}

module.exports = function (args) {
    const name = args[3];
    if (!name) {
        normal();
        return;
    }

    switch (name) {
        case 'vue-spa':
            vueSpa();
            break;
        case 'component':
            console.log('component');
            break;
        case 'model':
            console.log('model');
            break;
        case 'service':
            console.log('service');
            break;
        case 'custom':
            console.log('custom');
            break;
        default:
            normal();
            break;
    }
}