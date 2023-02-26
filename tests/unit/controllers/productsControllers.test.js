const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);
const { allProductsResponse, productCreateResponse, productUpdateBody, productSearchNameResponse } = require('../../../__tests__/_dataMock');
const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');

describe('Teste de unidade do productsController', function () {
  it('Listando os produtos deve retornar o status 200 e a lista', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'getAll')
      .resolves({ type: null, message: allProductsResponse });
    await productsController.listProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsResponse);
  });
  
  it('Buscando um produto deve responder com 200 e os dados do banco quando existir', async function () {
    const res = {};
    const req = {params: { id: 1 }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'getById')
      .resolves({ type: null, message: [allProductsResponse] });
    await productsController.getProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([allProductsResponse]);
  });

  it('Buscando um produto ao passar um id inválido deve retornar um erro', async function () {
    const res = {};
    const req = {params: { id: 'abc' }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'getById')
      .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });
    await productsController.getProduct(req, res);
    expect(res.status).to.have.been.calledWith(404); 
    expect(res.json).to.have.been.calledWith('"id" must be a number');
  });

  it('Buscando um produto ao passar um id que não existe no banco deve retornar um erro', async function () {
    const res = {};
    const req = {params: { id: 9999 }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'getById')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } });
    await productsController.getProduct(req, res);
    expect(res.status).to.have.been.calledWith(404); 
    expect(res.json).to.have.been.calledWith( { message: 'Product not found' });
  });

  it('Crie endpoint para cadastrar produtos', async function () {
    const res = {};
    const req = { body: productCreateResponse };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'createProduct')
      .resolves({ type: '201', message: [productCreateResponse] });
    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith('201'); 
    expect(res.json).to.have.been.calledWith([productCreateResponse]);
  });

  it('Crie endpoint para atualizar um produto', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: productUpdateBody };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'updateProduct')
      .resolves({ type: '200', message: {id:1,name:'Machado do Thor Stormbreaker'} });
    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith('200'); 
    expect(res.json).to.have.been.calledWith({id:1,name:'Machado do Thor Stormbreaker'});
  });

  it('Crie endpoint para deletar um produto', async function () {
    const res = {};
    const req = { params: { id: 1 } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'deleteProduct')
      .resolves({ type: null, message: { message: 'Product not found' }  });
    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(200); 
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Crie endpoint products/search?q=searchTerm', async function () {
    const res = {};
    const req = { query: 'Martelo' };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'searchProduct')
      .resolves({ type: null, message: productSearchNameResponse });
    await productsController.searchProduct(req, res);
    expect(res.status).to.have.been.calledWith(200); 
    expect(res.json).to.have.been.calledWith(productSearchNameResponse);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});