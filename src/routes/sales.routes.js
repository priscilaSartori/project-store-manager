const express = require('express');
const salesController = require('../controllers/sales.controller');

const salesRouter = express.Router();

salesRouter.post('/', salesController.createSale);
salesRouter.get('/', salesController.listSales);
salesRouter.get('/:id', salesController.getSales);
salesRouter.delete('/:id', salesController.deleteSales);

module.exports = salesRouter;