const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const { allProductsResponse, productCreateResponse, productUpdateBody, rightProductBody, productSearchNameResponse, wrongSizeProductBody } = require('../../../__tests__/_dataMock');

describe('Verificando service dos produtos', function () {
  
  it('retorna a lista completa dos produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProductsResponse);
    const result = await productsService.getAll();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allProductsResponse);
  });
  
  it('Na busca de um produto retorna um erro caso receba um ID inválido', async function () {
    const result = await productsService.getById('a');
    expect(result.type).to.equal('422');
    expect(result.message).to.equal('"id" must be a number');
  });

  it('Na busca de um produto retorna o produto caso o ID seja existente', async function () {
    sinon.stub(productsModel, 'getById').resolves(allProductsResponse[0]);
    const result = await productsService.getById(1);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(allProductsResponse[0]);
  }); 

  it('Crie endpoint para cadastrar produtos', async function () {
    sinon.stub(productsModel, 'insert').resolves(rightProductBody);
    sinon.stub(productsModel, 'getById').resolves(productCreateResponse);
    const result = await productsService.createProduct('Produto1');
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(productCreateResponse);
  });
  
  it('Crie endpoint para atualizar um produto, será validado que o produto foi alterado no banco de dados', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves(productCreateResponse);
    const result = await productsService.updateProduct(1, productUpdateBody.name);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(productCreateResponse);
  });

  it("Crie endpoint para atualizar um produto, será validado que não é possível realizar operações em um produto sem o campo name", async () => {
    sinon.stub(productsModel, 'updateProduct').resolves(productCreateResponse);
    const result = await productsService.updateProduct(1);
    expect(result.type).to.be.equal('400');
    expect(result.message).to.deep.equal({ message: '\"name\" is required' });
  });

  it("Crie endpoint para atualizar um produto, será validado que não é possível realizar operações em um produto com o campo name menor que 5 caracteres", async () => {
    sinon.stub(productsModel, 'updateProduct').resolves(productCreateResponse);
    const result = await productsService.updateProduct(1, wrongSizeProductBody.name);
    expect(result.type).to.be.equal('422');
    expect(result.message).to.deep.equal({ message: "\"name\" length must be at least 5 characters long" });
  });

  it("Crie endpoint para atualizar um produto, será validado que não é possível alterar um produto que não existe", async () => {
    sinon.stub(productsModel, 'updateProduct').resolves(productCreateResponse);
    const result = await productsService.updateProduct(999, productUpdateBody.name);
    expect(result.type).to.be.equal('404');
    expect(result.message).to.deep.equal({ message: "Product not found" });
  });
  
  it('Crie endpoint para deletar um produto, será validado que o produto foi removido do banco de dados', async function () {
    sinon.stub(productsModel, 'deleteProduct').resolves(1);
    const result = await productsService.deleteProduct(1);
    expect(result.type).to.be.equal(204);
    expect(result.message).to.deep.equal('');
  });

  it("Crie endpoint para deletar um produto, será validado que não é possível deletar um produto que não existe", async () => {
    sinon.stub(productsModel, 'deleteProduct').resolves(999);
    const result = await productsService.deleteProduct(999);
    expect(result.type).to.be.equal('404');
    expect(result.message).to.deep.equal({ message: 'Product not found' });
  });

  it('Crie endpoint products/search?q=searchTerm, será validado que é possível buscar um produto pelo name', async function () {
    const result = await productsService.searchProduct('Martelo');
    expect(result.type).to.be.equal(200);
    expect(result.message).to.deep.equal(productSearchNameResponse);
  });

  it('Crie endpoint products/search?q=searchTerm, será validado que é possível buscar todos os produtos quando passa a busca vazia', async function () {
    const result = await productsService.searchProduct('w');
    expect(result.type).to.be.equal(200);
    expect(result.message).to.deep.equal([]);
  });
  
  afterEach(function () {
    sinon.restore();
  });
 });