const Employee = require('../models/employee.model');

exports.getAllEmployees = async (req, res) => {
	try {
		res.json(await Employee.find().populate('department'));
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getRandomEmployee = async (req, res) => {
	try {
		const count = await Employee.countDocuments();
		const rand = Math.floor(Math.random() * count);
		const emp = await Employee.findOne().populate('department').skip(rand);
		if (!emp) res.status(404).json({ message: 'Not Found' });
		else res.json(emp);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getEmployeeById = async (req, res) => {
	try {
		const emp = await Employee.findById(req.params.id);
		if (!emp) res.status(404).json({ message: 'Not Found' });
		else res.json(emp);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.addNewEmployee = async (req, res) => {
	try {
		const { firstName, lastName } = req.body;
		const newEmployee = new Employee({ firstName, lastName });
		await newEmployee.save();
		res.json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.editEmployeeById = async (req, res) => {
	try {
		const { firstName, lastName } = req.body;

		const emp = await Employee.findById(req.params.id);
		if (emp) {
			await Employee.updateOne(
				{ _id: req.params.id },
				{ $set: { firstName, lastName } }
			);
		} else {
			res.status(404).json({ message: 'Not Found' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.deleteEmployeeById = async (req, res) => {
	try {
		const emp = await Employee.findById(req.params.id);
		if (emp) {
			await Employee.deleteOne({ _id: req.params.id });
			res.json({ message: 'OK' });
		} else {
			res.status(404).json({ message: 'Not Found' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
