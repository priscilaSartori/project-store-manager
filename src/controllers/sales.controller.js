const salesService = require('../services/sales.service');

const createSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.createSale(sales);
  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};

module.exports = { createSale };