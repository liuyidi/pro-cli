const { propmt } = require('inquirer');
const createSpa = require('../command/create-spa');
const createStatic = require('../command/create-static');

function normal() {
	const questions = [{
		type: 'list',
		name: 'type',
		message: 'what do you want to generate ?',
		choices: [
			'static',
			'spa'
		]
	}];

	prompt(questions).then(function (answers) {
		switch (answers.type) {
			case 'static':
				createStatic()
				break;
			case 'spa':
				createSpa()
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
		case 'static':
			createStatic()
			break;
		case 'spa':
			createSpa()
			break;
		default:
			normal();
			break;
	}
}