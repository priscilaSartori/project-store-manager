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

module.exports = {
  createSale,
};