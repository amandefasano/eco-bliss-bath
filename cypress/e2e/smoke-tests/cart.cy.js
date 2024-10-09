const productsUrl = `${Cypress.env("baseUrl")}/products`;

describe("smoke tests: cart", () => {
  it("A 'add to the cart' button is present on the product information sheet when connected", () => {
    // Logging in the user
    cy.simulate_login("test2@test.fr", "testtest").then(() => {
      const token = Cypress.env("token");
      cy.wrap(token).as("token");
    });

    cy.visit(productsUrl);
    cy.getBySel("product").find('[data-cy="product-link"]').should("exist");

    // Targetting the first product and clicking on the "consult" button
    cy.get('.list-products > [data-cy="product"]')
      .eq(0)
      .find('[data-cy="product-link"]')
      .click();

    // Redirection to the product information sheet page
    cy.getBySel("detail-product-add").should("exist").should("be.visible");
    cy.getBySel("detail-product-quantity").should("exist").should("be.visible");
  });

  it("The disponibility field is present on the product information sheet", () => {
    cy.visit("/");

    // Redirection to the product page
    cy.getBySel("nav-link-products").click();
    cy.getBySel("product").find('[data-cy="product-link"]').should("exist");

    // Targetting the first product and clicking on the "consult" button
    cy.get('.list-products > [data-cy="product"]')
      .eq(0)
      .find('[data-cy="product-link"]')
      .click();

    // Redirection to the product information sheet page
    cy.getBySel("detail-product-stock").should("exist").should("be.visible");
  });
});
