const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const { allProductsResponse, productCreateResponse, productUpdateBody, rightProductBody, productSearchNameResponse, wrongSizeProductBody } = require('../../../__tests__/_dataMock');

describe('Verificando service dos produtos', function () {
  describe('listagem dos produtos', function () {
    it('retorna a lista completa dos produtos', async function () {
      sinon.stub(productsModel, 'getAll').resolves(allProductsResponse);
      const result = await productsService.getAll();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProductsResponse);
    });
  });
  
  describe('busca de um produto', function () {
  it('retorna um erro caso receba um ID inválido', async function () {
      // Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!
      const result = await productsService.getById('a');
      expect(result.type).to.equal('422');
      expect(result.message).to.equal('"id" must be a number');
    });

    // it('retorna um erro caso o produto não exista', async function () {
    //   sinon.stub(productsModel, 'getById').resolves(undefined);
    //   const result = await productsService.getById(1);
    //   expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    //   expect(result.message).to.equal({ message: 'Product not found' });
    // });
    
    it('retorna o produto caso o ID seja existente', async function () {
      sinon.stub(productsModel, 'getById').resolves(allProductsResponse[0]);
      const result = await productsService.getById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProductsResponse[0]);
    }); 
  });
  
  afterEach(function () {
    sinon.restore();
  });
 });