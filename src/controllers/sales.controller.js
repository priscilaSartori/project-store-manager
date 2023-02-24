const salesService = require('../services/sales.service');

const createSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.createSale(sales);
  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};

const listSales = async (_req, res) => {
  const { type, message } = await salesService.getAll(); 
  if (type) return res.status(type).json(message);
  return res.status(200).json(message);
};

const getSales = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getById(id);
  if (type) return res.status(404).json(message);
  res.status(200).json(message);
};

module.exports = { createSale, listSales, getSales };