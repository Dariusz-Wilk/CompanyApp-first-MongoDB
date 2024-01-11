const Employee = require('../employee.model');
const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
	before(async () => {
		try {
			await mongoose.connect('mongodb://localhost:27017/companyDBtest', {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
		} catch (err) {
			console.error(err);
		}
	});

	describe('Reading data', () => {
		before(async () => {
			const testEmpOne = new Employee({
				firstName: 'Employee #1',
				lastName: 'TestEmp #1',
				department: 'TestDepartment #1',
			});
			await testEmpOne.save();

			const testEmpTwo = new Employee({
				firstName: 'Employee #2',
				lastName: 'TestEmp #2',
				department: 'TestDepartment #2',
			});
			await testEmpTwo.save();
		});

		it('should return all the data with "find" method', async () => {
			const employees = await Employee.find();
			const expectedLength = 2;
			expect(employees.length).to.be.equal(expectedLength);
		});
		it('should return a proper document by various params with "findOne" method', async () => {
			const employee = await Employee.findOne({ firstName: 'Employee #1' });
			const expectedName = 'Employee #1';
			expect(employee.firstName).to.be.equal(expectedName);
		});

		after(async () => {
			await Employee.deleteMany();
		});
	});

	describe('Creating data', () => {
		it('should insert new document with "insertOne" method', async () => {
			const employee = new Employee({
				firstName: 'Employee #1',
				lastName: 'TestEmp #1',
				department: 'TestDepartment #1',
			});
			await employee.save();
			expect(employee.isNew).to.be.false;

			after(async () => {
				await Employee.deleteMany();
			});
		});
	});
	describe('Updating data', () => {
		beforeEach(async () => {
			const testEmpOne = new Employee({
				firstName: 'Employee #1',
				lastName: 'TestEmp #1',
				department: 'TestDepartment #1',
			});
			await testEmpOne.save();

			const testEmpTwo = new Employee({
				firstName: 'Employee #2',
				lastName: 'TestEmp #2',
				department: 'TestDepartment #2',
			});
			await testEmpTwo.save();
		});

		it('should properly update one document with "updateOne" method', async () => {
			await Employee.updateOne(
				{ firstName: 'Employee #1' },
				{ $set: { firstName: '===Employee #1===' } }
			);
			const updatedEmployee = await Employee.findOne({
				firstName: '===Employee #1===',
			});
			expect(updatedEmployee).to.not.be.null;
		});

		it('should properly update one document with "save" method', async () => {
			const employee = await Employee.findOne({ firstName: 'Employee #1' });
			employee.firstName = '===Employee #1===';
			await employee.save();

			const updatedEmployee = await Employee.findOne({
				firstName: '===Employee #1===',
			});
			expect(updatedEmployee).to.not.be.null;
		});

		it('should properly update multiple documents with "updateMany" method', async () => {
			await Employee.updateMany(
				{},
				{ $set: { firstName: '===Employee Updated===' } }
			);
			const employee = await Employee.find({
				firstName: '===Employee Updated===',
			});
			const expectedLength = 2;
			expect(employee.length).to.be.equal(expectedLength);
		});

		afterEach(async () => {
			await Employee.deleteMany();
		});
	});
	describe('Removing data', () => {
		beforeEach(async () => {
			const testEmpOne = new Employee({
				firstName: 'Employee #1',
				lastName: 'TestEmp #1',
				department: 'TestDepartment #1',
			});
			await testEmpOne.save();

			const testEmpTwo = new Employee({
				firstName: 'Employee #2',
				lastName: 'TestEmp #2',
				department: 'TestDepartment #2',
			});
			await testEmpTwo.save();
		});

		it('should properly remove one document with "deleteOne" method', async () => {
			await Employee.deleteOne({ firstName: 'Employee #1' });
			const employee = await Employee.find();

			expect(employee.length).to.be.equal(1);
		});

		it('should properly remove multiple documents with "deleteMany" method', async () => {
			await Employee.deleteMany({});
			const employees = await Employee.find();

			expect(employees.length).to.be.equal(0);
		});
		afterEach(async () => {
			await Employee.deleteMany();
		});
	});

	describe('Populating data', () => {
		it('should populate "department" with actual department data', async () => {
			const departmentIT = new Department({ name: 'Data Analitics' });
			await departmentIT.save();

			const departmentMarketing = new Department({ name: 'Marketing' });
			await departmentMarketing.save();

			const testDepOne = new Employee({
				firstName: 'John',
				lastName: 'Doe',
				department: departmentIT._id,
			});
			await testDepOne.save();

			const testDepTwo = new Employee({
				firstName: 'Adam',
				lastName: 'Brown',
				department: departmentMarketing._id,
			});
			await testDepTwo.save();

			const employees = await Employee.find().populate('department');

			expect(employees[0].department.name).to.equal('Data Analitics');
			expect(employees[1].department.name).to.equal('Marketing');

			await Employee.deleteMany();
			await Department.deleteMany();
		});
	});
});
