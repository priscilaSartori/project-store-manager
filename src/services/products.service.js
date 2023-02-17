const productsModel = require('../models/products.model');
const schema = require('./validations/validationsInputValues');

const getAll = async () => {
  const allProducts = await productsModel.getAll();
  return { type: null, message: allProducts };
};

const getById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.getById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };

  return { type: null, message: product };
};

module.exports = { getAll, getById };