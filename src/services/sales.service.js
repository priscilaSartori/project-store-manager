const salesModel = require('../models/sales.model');
const { valideIdSale } = require('./validations/validationsInputValues');

const createSale = async (sales) => {
  const quantityNumber = sales.every((sale) => sale.quantity <= 0);
  if (quantityNumber) {
    return { type: '422', message: '"quantity" must be greater than or equal to 1' };
  }
  const quantityRequired = sales.every((sale) => sale.quantity);
  if (!quantityRequired) return { type: '400', message: '"quantity" is required' };
  const productRequired = sales.every((sale) => sale.productId);
  if (!productRequired) return { type: '400', message: '"productId" is required' };

  const database = await Promise.all(sales.map((sale) => valideIdSale(sale.productId)));
  const idNotFound = database.find((e) => e.type !== null);
  if (idNotFound) return idNotFound;

  const id = await salesModel.insert();
  const itemsSold = await Promise.all(sales.map(({ productId, quantity }) => {
    salesModel.insertProduct(id, productId, quantity);
    return { productId, quantity };
  }));
  return { type: null, message: { id, itemsSold } };
};

const getAll = async () => {
  const allSales = await salesModel.getAll();
  return { type: null, message: allSales };
};

const getById = async (saleId) => {
  const sale = await salesModel.getById(saleId);
  if (sale[0] === undefined) return { type: '404', message: { message: 'Sale not found' } };
  return { type: null, message: sale };
};

const deleteSales = async (id) => {
  const sales = await salesModel.getById(id);
  if (sales[0] === undefined) return { type: '404', message: { message: 'Sale not found' } };
  
  await salesModel.deleteSales(id);
  return { type: 204, message: '' };
};

module.exports = {
  createSale, getAll, getById, deleteSales,
};