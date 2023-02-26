const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const { allProductsResponse, rightProductBody, productCreateResponse, productUpdateBody } = require('../../../__tests__/_dataMock');
const connection = require('../../../src/models/connection');

describe('Teste de unidade do productsModel', function () {
  it('Recuperando a lista dos produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsResponse]);
    const result = await productsModel.getAll();
    expect(result).to.be.deep.equal(allProductsResponse);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[allProductsResponse[0]]]);
    const result = await productsModel.getById(1);
    expect(result).to.be.deep.equal(allProductsResponse[0]);
  });

  it('Crie endpoint para cadastrar produtos', async function () {
    sinon.stub(connection, 'execute').resolves([{insertId: 4}]);
    const result = await productsModel.insert(rightProductBody.name);
    expect(result).to.be.deep.equal(4);
  });

  it('Crie endpoint para atualizar um produto', async function () {
    sinon.stub(connection, 'execute').resolves(productCreateResponse);
    const result = await productsModel.updateProduct(1, productUpdateBody.name);
    expect(result.id).to.be.deep.equal(1);
    expect(result.name).to.be.deep.equal("Machado do Thor Stormbreaker");
  });

  it('Crie endpoint para deletar um produto', async function () {
    sinon.stub(connection, 'execute').resolves(1);
    const result = await productsModel.deleteProduct(1);
    expect(result).to.be.deep.equal({id: 1});
  });

  afterEach(function () {
    sinon.restore();
  });
});