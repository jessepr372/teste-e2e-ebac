describe('Teste E2E na Loja EBAC', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    // adicionar produto ao carrinho
    Cypress.Commands.add('adicionarProduto', (categoriaSelector, produtoSelector, tamanho, cor) => {
      cy.get(categoriaSelector).click();
      cy.get(produtoSelector).click();
      cy.get(`.button-variable-item-${tamanho}`).click();
      cy.get(`.button-variable-item-${cor}`).click();
      cy.get('.single_add_to_cart_button').click();
      cy.get('.tbay-woocommerce-breadcrumb > :nth-child(1)').click();
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
  
      // Preencher os dados de login
      cy.get('.showlogin').click();
      cy.get('#username').type('aluno_ebac@teste.com');
      cy.get('#password').type('teste@teste.com');
      cy.get('.woocommerce-button').click();
  
      // Finalizar o pedido
      cy.get('#terms').click();
      cy.get('#place_order').click();
  
      // Verificar mensagem de sucesso (com timeout de 10 segundos)
      cy.get('.woocommerce-notice', { timeout: 10000 }).should('contain', 'Obrigado. Seu pedido foi recebido.');
    });
  });
  