const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
	it('should throw an error if no "firstName" arg', async () => {
		const emp = new Employee({ lastName: 'test', department: 'test' });

		emp.validateSync(err => {
			expect(err.errors.firstName).to.exist;
		});
	});
	it('should throw an error if no "lastName" arg', async () => {
		const emp = new Employee({
			firstName: 'testt',
			department: 'test',
		});

		emp.validateSync(err => {
			expect(err.errors.lastName).to.exist;
		});
	});
	it('should throw an error if no "department" arg', async () => {
		const emp = new Employee({ firstName: 'test', lastName: 'testt' });

		emp.validateSync(err => {
			expect(err.errors.department).to.exist;
		});
	});
	it('should throw an error if "firstName" or "lastName" or "department" are not a string', () => {
		const cases = [{}, []];
		for (let name of cases) {
			const emp = new Employee({ firstName: name });

			emp.validateSync(err => {
				expect(err.errors.firstName).to.exist;
			});
		}
		for (let name of cases) {
			const emp = new Employee({ lastName: name });

			emp.validateSync(err => {
				expect(err.errors.lastName).to.exist;
			});
		}
		for (let name of cases) {
			const emp = new Employee({ department: name });

			emp.validateSync(err => {
				expect(err.errors.department).to.exist;
			});
		}
	});
	it('should not throw an error if all args are okay', async () => {
		const emp = new Employee({
			firstName: 'John',
			lastName: 'Doe',
			department: 'Marketing',
		});

		emp.validateSync(err => {
			expect(err.errors.name).to.not.exist;
		});
	});
});
