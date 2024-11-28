// Comando para adicionar um produto ao carrinho
Cypress.Commands.add('adicionarProduto', (categoriaSelector, produtoSelector, tamanho, cor) => {
    cy.get(categoriaSelector).click();
    cy.get(produtoSelector).click();
    cy.get(`.button-variable-item-${tamanho}`).click();
    cy.get(`.button-variable-item-${cor}`).click();
    cy.get('.single_add_to_cart_button').click();
    cy.get('.tbay-woocommerce-breadcrumb > :nth-child(1)').click();
  });
  
  // Comando para realizar login
  Cypress.Commands.add('login', (username, password) => {
    cy.get('.dropdown-toggle > .zmdi').click();
    cy.get('#topmenu > .menu-item-222 > a').click();
    cy.get('.showlogin').click();
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('.woocommerce-button').click();
  });
  