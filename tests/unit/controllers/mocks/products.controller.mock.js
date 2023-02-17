const productsMock = {
  name: 'Martelo de Thor',
};

const newProductsMock = { id: 1, ...productsMock };

const productsListMock = [newProductsMock];

module.exports = {
  productsMock,
  newProductsMock,
  productsListMock,
};