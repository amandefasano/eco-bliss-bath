describe("smoke test: login", () => {
  it("is checking the presence of login's buttons and fields", () => {
    cy.visit("/");
    cy.getBySel("nav-link-login").should("exist").click();

    // Redirection to the login page
    cy.getBySel("login-input-username").should("exist");
    cy.getBySel("login-input-password").should("exist");
    cy.getBySel("login-submit").should("exist");
  });
});
