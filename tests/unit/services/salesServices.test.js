const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const { rightSaleBody, idSaleResponse, saleCreateResponse, nonexistentProductIdBody, allSaleResponse, updatesale, updateSaleResponse } = require('../../../__tests__/_dataMock');

describe("Teste de unidade do salesService", () => {
  it("Crie endpoint para validar e cadastrar vendas, será validado que é possível cadastrar uma venda com sucesso", async () => {
    sinon.stub(salesModel, 'insert').resolves(3);
    sinon.stub(salesModel, 'insertProduct').resolves(rightSaleBody);
    const result = await salesService.createSale(rightSaleBody);
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal(saleCreateResponse);
  });

  it("Crie endpoints para listar vendas, será validado que é possível listar todas as vendas", async () => {
    sinon.stub(salesModel, "getAll").resolves(allSaleResponse);
    const result = await salesService.getAll();
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal(allSaleResponse);
  });

  it("Crie endpoints para listar vendas, será validado que é possível listar uma venda específica com sucesso", async () => {
    sinon.stub(salesModel, "getById").resolves(idSaleResponse);
    const result = await salesService.getById(2);
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal(idSaleResponse);
  });

  it("Crie endpoint para deletar uma venda, será validado que a venda foi removida do banco de dados", async () => {
    sinon.stub(salesModel, "deleteSales").resolves(allSaleResponse);
    const result = await salesService.deleteSales(1);
    expect(result.type).to.be.deep.equal(204);
    expect(result.message).to.be.deep.equal('');
  });

  it("Crie endpoint para atualizar uma venda, será validado que a venda foi alterada no banco de dados", async () => {
    sinon.stub(salesModel, 'updateSales').resolves(updatesale);
    const result = await salesService.updateSales(1, updateSaleResponse);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(updatesale);
  });

  afterEach(function () {
    sinon.restore();
  });
});