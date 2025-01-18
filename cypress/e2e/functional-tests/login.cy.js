const baseUrl = Cypress.env("baseUrl");

describe("login functional tests", () => {
  it("login the user", function () {
    cy.visit(baseUrl);
    cy.getBySel("nav-link-login").click();

    // Redirection to the login page
    cy.getBySel("login-input-username").type(`${Cypress.env("funcEmail")}`);
    cy.getBySel("login-input-password").type(`${Cypress.env("funcPassword")}`);
    cy.intercept("POST", "/login").as("postLogin");
    cy.getBySel("login-submit").click();

    // Redirection to the home page
    cy.wait("@postLogin");

    // Expect the token to be stored in the local storage
    cy.window().then((window) => {
      const token = window.localStorage.getItem("user");
      expect(token).to.exist;
    });

    // Expect the nav links to contain "Mon panier"
    cy.getBySel("nav-link-cart")
      .should("exist")
      .should("contain", "Mon panier");
  });
});
