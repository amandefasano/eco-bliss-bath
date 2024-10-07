const productsUrl = `${Cypress.env("baseUrl")}/products`;

describe("cart functional tests", () => {
  before(function () {
    // Logging in the user
    cy.simulate_login("test2@test.fr", "testtest").then(() => {
      cy.window().then((window) => {
        window.localStorage.setItem("user", `${Cypress.env("token")}`);
      });
    });
  });

  it("is adding a product to the cart", function () {
    cy.visit(productsUrl);

    // Targetting the first product and clicking on the "consult" button
    cy.intercept("/products/3").as("product3");
    cy.get('.list-products > [data-cy="product"]')
      .eq(0)
      .find('[data-cy="product-link"]')
      .click();

    // Redirection to the product information sheet page
    cy.wait("@product3");
    cy.getBySel("detail-product-add").click();

    // Redirection to the cart
    cy.getBySel("cart-line").should("exist").find(".product-name").should("have.text", "Sentiments printaniers");
  });
});
