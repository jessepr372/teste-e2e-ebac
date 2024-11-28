// cypress/e2e/exercicio-e2e.cy.js
describe('Teste E2E na Loja EBAC', () => {
    beforeEach(() => {
      cy.visit('/');  // Visita a página inicial antes de cada teste
    });
  
    // Adicionar produto ao carrinho
    Cypress.Commands.add('adicionarProduto', (categoriaSelector, produtoSelector, tamanho, cor) => {
      cy.get(categoriaSelector).click();  // Clica na categoria
      cy.get(produtoSelector).click();    // Clica no produto
      cy.get(`.button-variable-item-${tamanho}`).click();  // Seleciona o tamanho
      cy.get(`.button-variable-item-${cor}`).click();  // Seleciona a cor
      cy.get('.single_add_to_cart_button').click();  // Adiciona ao carrinho
      cy.get('.tbay-woocommerce-breadcrumb > :nth-child(1)').click();  // Volta à página inicial
    });
  
    it('Deve adicionar 4 produtos ao carrinho e finalizar o pedido', () => {
      const produtos = [
        { categoria: '#primary-menu > .menu-item-629 > a', produto: '.post-3111 > .product-block', tamanho: 'XS', cor: 'Black' },
        { categoria: '#primary-menu > .menu-item-629 > a', produto: '.post-3073 > .product-block', tamanho: '32', cor: 'Blue' },
        { categoria: '#primary-menu > .menu-item-629 > a', produto: '.post-2622 > .product-block', tamanho: 'XS', cor: 'Blue' },
        { categoria: '#primary-menu > .menu-item-629 > a', produto: '.post-3647 > .product-block', tamanho: 'XS', cor: 'Gray' },
      ];
  
      // Adicionar os produtos ao carrinho
      produtos.forEach(({ categoria, produto, tamanho, cor }) => {
        cy.adicionarProduto(categoria, produto, tamanho, cor);
      });
  
      // Acessar o carrinho de compras
      cy.get('.dropdown-toggle > .zmdi').click();
      cy.get('#topmenu > .menu-item-222 > a').click();
  
      // Carregar os dados de login do fixture
      cy.fixture('login.json').then((user) => {
        // Preencher os dados de login
        cy.get('.showlogin').click();
        cy.get('#username').type(user.username);
        cy.get('#password').type(user.password);
        cy.get('.woocommerce-button').click();
      });
  
      // Finalizar o pedido
      cy.get('#terms').click();
      cy.get('#place_order').click();
  
      // Verificar mensagem de sucesso
      cy.get('.woocommerce-notice', { timeout: 10000 }).should('contain', 'Obrigado. Seu pedido foi recebido.');
    });
  });
  