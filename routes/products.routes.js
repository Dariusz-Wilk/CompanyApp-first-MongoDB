// post.routes.js

const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/products.controller');

router.get('/products', ProductsController.getAllProducts);

router.get('/products/random', ProductsController.getRandomProduct);

router.get('/products/:id', ProductsController.getProductById);

router.post('/products', ProductsController.addNewProduct);

router.put('/products/:id', ProductsController.editProductById);

router.delete('/products/:id', ProductsController.deleteProductById);

module.exports = router;
