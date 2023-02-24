const productsModel = require('../../models/products.model');
// const salesModel = require('../../models/sales.model');
const { idSchema, addProductsSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: '422', message: '"id" must be a number' };
  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  if (!name) return { type: '400', message: { message: '"name" is required' } };
  const { error } = addProductsSchema.validate({ name });
  if (error) {
 return {
    type: '422',
      message: { message: '"name" length must be at least 5 characters long' } }; 
}
  return { type: null, message: '' };
};

const valideIdSale = async (id) => {
const result = await productsModel.getById(id);
  if (!result) return { type: '404', message: 'Product not found' };
  return { type: null, message: '' };
};

const validateUpdate = async (id, name) => {
  if (!name) return { type: '400', message: { message: '"name" is required' } };
  const { error } = addProductsSchema.validate({ name });
  if (error) {
    return {
      type: '422',
      message: { message: '"name" length must be at least 5 characters long' },
    };
  }
  const product = await productsModel.getById(id);
  if (!product) return { type: '404', message: { message: 'Product not found' } };
  return { type: null, message: '' };
};

const valideIdSaleUpdate = async (id) => {
const result = await productsModel.getById(id);
  if (!result) return { type: '404', message: { message: 'Product not found' } };
  return { type: null, message: '' };
};

const validateUpdateSale = async (id, sales) => {
  const quantityNumber = sales.every((sale) => sale.quantity <= 0);
  if (quantityNumber) {
    return { type: '422', message: { message: '"quantity" must be greater than or equal to 1' } };
  }
  const quantityRequired = sales.every((sale) => sale.quantity);
  if (!quantityRequired) return { type: '400', message: { message: '"quantity" is required' } };
  const productRequired = sales.every((sale) => sale.productId);
  if (!productRequired) return { type: '400', message: { message: '"productId" is required' } };
  
  const database = await Promise.all(sales.map((sale) => valideIdSaleUpdate(sale.productId)));
  const idNotFound = database.find((e) => e.type !== null);
  if (idNotFound) return idNotFound;

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  valideIdSale,
  validateUpdate,
  validateUpdateSale,
};