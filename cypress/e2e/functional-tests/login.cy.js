const baseUrl = Cypress.env("baseUrl");

describe("login functional tests", () => {
  it("login the user", function () {
    cy.visit(baseUrl);
    cy.getBySel("nav-link-login").click();

    // Redirection to the login page
    cy.getBySel("login-input-username").type("test2@test.fr");
    cy.getBySel("login-input-password").type("testtest");
    cy.intercept("POST", "/login").as("postLogin");
    cy.getBySel("login-submit").click();

    // Redirection to the home page
    cy.wait("@postLogin");
    cy.window().then((window) => {
      const token = window.localStorage.getItem("user");
      expect(token).to.exist;
    });
    cy.getBySel("nav-link-cart")
      .should("exist")
      .should("contain", "Mon panier");
  });
});
