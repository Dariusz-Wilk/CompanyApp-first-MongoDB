const Product = require('../models/product.model');

exports.getAllProducts = async (req, res) => {
	try {
		res.json(await Product.find());
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getRandomProduct = async (req, res) => {
	try {
		const count = await Product.countDocuments();
		const rand = Math.floor(Math.random() * count);
		const prod = await Product.findOne().skip(rand);
		if (!prod) res.status(404).json({ message: 'Not Found' });
		else res.json(prod);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getProductById = async (req, res) => {
	try {
		const prod = await Product.findOne(req.params.id);
		if (!prod) res.status(404).json({ messagee: 'Not Found' });
		else res.json(prod);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.addNewProduct = async (req, res) => {
	try {
		const { name, client } = req.body;
		const newProduct = new Product({ name, client });
		await newProduct.save();
		res.json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.editProductById = async (req, res) => {
	try {
		const { name, client } = req.body;
		const prod = await Product.findById(req.params.id);
		if (prod) {
			await Product.updateOne(
				{ _id: req.params.id },
				{ $set: { name, client } }
			);
			res.json({ message: 'OK' });
		} else {
			res.status(404).json({ message: 'Not Found' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.deleteProductById = async (req, res) => {
	try {
		const prod = await Product.findById(req.params.id);
		if (prod) {
			await Product.deleteOne({ _id: req.params.id });
			res.json({ message: 'OK' });
		} else {
			res.status(404).json({ message: 'Not Found' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
