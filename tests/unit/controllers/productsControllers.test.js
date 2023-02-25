const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');
const { productsListMock, productsMock, newProductsMock} = require('./mocks/products.controller.mock');

describe('Teste de unidade do productsController', function () {
  describe('Listando os produtos', function() {
    it('Deve retornar o status 200 e a lista', async function () {
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getAll')
        .resolves({ type: null, message: productsListMock });

      await productsController.listProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsListMock);
    });
  });
  
  describe('Buscando um produto', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getById')
        .resolves({ type: null, message: newProductsMock });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newProductsMock);
    });
  });

   it('ao passar um id inválido deve retornar um erro', async function () {
      const res = {};
      const req = {
        params: { id: 'abc' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith('"id" must be a number');
    });

    it('ao passar um id que não existe no banco deve retornar um erro', async function () {
      const res = {};
      const req = {
        params: { id: 9999 },
      };

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
    // sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // const result = await productsModel.getById(1);
    // expect(result).to.be.deep.equal(products[0]);
  });

  it('Crie endpoint para atualizar um produto', async function () {
    // sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // const result = await productsModel.getById(1);
    // expect(result).to.be.deep.equal(products[0]);
  });

  it('Crie endpoint para deletar um produto', async function () {
    // sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // const result = await productsModel.getById(1);
    // expect(result).to.be.deep.equal(products[0]);
  });

  it('Crie endpoint products/search?q=searchTerm', async function () {
    // sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // const result = await productsModel.getById(1);
    // expect(result).to.be.deep.equal(products[0]);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});