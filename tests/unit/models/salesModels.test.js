const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');
const { rightSaleBody, saleCreateResponse, allSaleResponse, deleteSaleResponse, updateSaleResponse, idSaleResponse } = require('../../../__tests__/_dataMock');

describe("Teste de unidade do salesModels", () => {
  it("Crie endpoint para validar e cadastrar vendas, será validado que é possível cadastrar uma venda com sucesso", async () => {
    sinon.stub(connection, 'execute').resolves([saleCreateResponse]);
    const result = await salesModel.insertProduct(1, rightSaleBody);
    expect(result).to.be.deep.equal(saleCreateResponse);
  });

  it("Crie endpoints para listar vendas, será validado que é possível listar todas as vendas", async () => {
    sinon.stub(connection, "execute").resolves([allSaleResponse]);
    const result = await salesModel.getAll();
    expect(result).to.be.deep.equal(allSaleResponse);
  });

  it("Crie endpoints para listar vendas, será validado que é possível listar uma venda específica com sucesso", async () => {
    sinon.stub(connection, "execute").resolves([idSaleResponse]);
    const result = await salesModel.getById(2);
    expect(result).to.be.deep.equal(idSaleResponse);
  });

  it("Crie endpoint para deletar uma venda, será validado que a venda foi removida do banco de dados", async () => {
    sinon.stub(connection, "execute").resolves([allSaleResponse]);
    const result = await salesModel.deleteSales(1);
    expect(result).to.be.deep.equal({id: 1});
  });

  // it("Crie endpoint para atualizar uma venda, será validado que a venda foi alterada no banco de dados", async () => {
  //   sinon.stub(connection, "execute").resolves(allSaleResponse[0]);
  //   const result = await salesModel.updateSales(1, 1, 1);
  //   expect(result).to.be.deep.equal(updateSaleResponse);
  // });

  afterEach(function () {
    sinon.restore();
  });
});