const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
	it('should throw an error if no "name" arg', async () => {
		const dep = new Department({});

		dep.validateSync(err => {
			expect(err.errors.name).to.exist;
		});
	});
	it('should throw an error if "name" is not a string', () => {
		const cases = [{}, []];
		for (let name of cases) {
			const dep = new Department({ name });

			dep.validateSync(err => {
				expect(err.errors.name).to.exist;
			});
		}
	});
	it('should throw an error if "name" arg < 5 letters || > 20 letters', async () => {
		const cases = ['test', 'long test that contains more than 20 letters'];
		for (let name of cases) {
			const dep = new Department({ name });

			dep.validateSync(err => {
				expect(err.errors.name).to.exist;
			});
		}
	});
	it('should not throw an error if "name" is okay', async () => {
		const cases = ['Management', 'Human Resources'];
		for (let name of cases) {
			const dep = new Department({ name });

			dep.validateSync(err => {
				expect(err.errors.name).to.not.exist;
			});
		}
	});

	after(() => {
		mongoose.models = {};
	});
});
