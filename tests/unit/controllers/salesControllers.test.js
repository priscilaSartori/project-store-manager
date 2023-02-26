const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);
const { saleCreateResponse, updateSaleResponse, updatesale } = require('../../../__tests__/_dataMock');
const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');

describe("Teste de unidade do salesController", () => {
  it("Crie endpoint para validar e cadastrar vendas, será validado que é possível cadastrar uma venda com sucesso", async () => {
    const res = {};
    const req = { body: saleCreateResponse };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'createSale')
      .resolves({ type: '201', message: [saleCreateResponse] });
    await salesController.createSale(req, res);
    expect(res.status).to.have.been.calledWith('201'); 
    expect(res.json).to.have.been.calledWith({message: [saleCreateResponse]});
  });

  it("Crie endpoints para listar vendas, será validado que é possível listar todas as vendas", async () => {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'getAll')
      .resolves({ type: null, message: saleCreateResponse });
    await salesController.listSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleCreateResponse);
  });

  it("Crie endpoints para listar vendas, será validado que é possível listar uma venda específica com sucesso", async () => {
    const res = {};
    const req = {params: { id: 1 }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'getById')
      .resolves({ type: null, message: [saleCreateResponse] });
    await salesController.getSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([saleCreateResponse]);
  });

  it("Crie endpoint para deletar uma venda, será validado que a venda foi removida do banco de dados", async () => {
    const res = {};
    const req = { params: { id: 1 } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'deleteSales')
      .resolves({ type: null, message: { message: 'Product not found' }  });
    await salesController.deleteSales(req, res);
    expect(res.status).to.have.been.calledWith(200); 
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it("Crie endpoint para atualizar uma venda, será validado que a venda foi alterada no banco de dados", async () => {
    const res = {};
    const req = { params: { id: 1 }, body: updateSaleResponse };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'updateSales')
      .resolves({ type: '200', message: updatesale });
    await salesController.updateSales(req, res);
    expect(res.status).to.have.been.calledWith('200'); 
    expect(res.json).to.have.been.calledWith(updatesale);
  });

  afterEach(function () {
    sinon.restore();
  });
});