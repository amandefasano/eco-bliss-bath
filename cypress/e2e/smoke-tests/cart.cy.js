describe("smoke test: cart", () => {
  it("it check the presence of 'add to the cart' button on the product information sheet when connected", () => {
    cy.visit("/");

    // Logging in
    cy.getBySel("nav-link-login").click();
    cy.getBySel("login-input-username").type("test2@test.fr");
    cy.getBySel("login-input-password").type("testtest");
    cy.intercept('POST', '/login').as('postLogin');
    cy.getBySel("login-submit").click();

    // Redirection to the product page
    cy.wait('@postLogin');
    cy.getBySel("nav-link-products").click();
    cy.getBySel("product").find('[data-cy="product-link"]').should("exist");

    // Targetting the first product and clicking on the "consult" button
    cy.get('.list-products > [data-cy="product"]').eq(0)
      .find('[data-cy="product-link"]')
      .click();
    
    // Redirection to the product information sheet page
    cy.getBySel("detail-product-add").should("exist").should("be.visible");
    cy.getBySel("detail-product-stock").should("exist").should("be.visible");
  });

  it("it check the presence of the disponibility field on the product information sheet", () => {
    cy.visit("/");

    // Redirection to the product page
    cy.getBySel("nav-link-products").click();
    cy.getBySel("product").find('[data-cy="product-link"]').should("exist");

    // Targetting the first product and clicking on the "consult" button
    cy.get('.list-products > [data-cy="product"]').eq(0)
      .find('[data-cy="product-link"]')
      .click();
    
    // Redirection to the product information sheet page
    cy.getBySel("detail-product-stock").should("exist").should("be.visible");
  });
});
