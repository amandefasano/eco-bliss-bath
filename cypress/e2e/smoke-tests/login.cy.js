const homePage = Cypress.env("baseUrl");

describe("smoke test: login", () => {
  it("Login's buttons and fields are present on the header and the login page", () => {
    cy.visit(homePage);
    cy.getBySel("nav-link-login").should("exist").should("be.visible").click();

    // Redirection to the login page
    cy.getBySel("login-input-username").should("exist").should("be.visible");
    cy.getBySel("login-input-password").should("exist").should("be.visible");
    cy.getBySel("login-submit").should("exist").should("be.visible");
  });
});
