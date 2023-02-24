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

const createProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;
  const newProductId = await productsModel.insert({ name });
  const newProduct = await productsModel.getById(newProductId);
  return { type: null, message: newProduct };
};

const updateProduct = async (id, name) => {
  const error = schema.validateUpdate(id, name);
  if ((await error).type) return error;

  const hasProduct = await productsModel.updateProduct(id, name);
  return { type: null, message: hasProduct };
};

module.exports = { getAll, getById, createProduct, updateProduct };