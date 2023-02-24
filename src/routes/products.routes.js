const express = require('express');
const productsController = require('../controllers/products.controller');

const productsRouter = express.Router();

productsRouter.get('/', productsController.listProduct);
productsRouter.get('/:id', productsController.getProduct);
productsRouter.post('/', productsController.createProduct);
productsRouter.put('/:id', productsController.updateProduct);

module.exports = productsRouter;