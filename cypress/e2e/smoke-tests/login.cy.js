// const homePageUrl = Cypress.env("baseUrl");

describe("smoke test: login", () => {
it("it check the presence of login's buttons and fields", () => {
cy.visit('/');
cy.getBySel("nav-link-login").should("exist").click();

// Redirection to the login page
cy.getBySel("login-input-username").should("exist");
cy.getBySel("login-input-password").should("exist");
cy.getBySel("login-submit").should("exist");
});
});

// cy.getBySel("email").type("test@test.fr");
// cy.getBySel("message").type("Bonjour, je vends des croissants à la pomme.");
// cy.getBySel("sendButton").click();
// cy.getBySel("successMessage")
// .should("be.visible")
// .should("contain", "Message envoyé avec succès.");

// it("it did not contain XSS vulnerability", () => {
// cy.getBySel("name").type("name");
// cy.getBySel("email").type("test@test.fr");
// cy.getBySel("message").type('<script>alert("XSS");</script>');
// cy.getBySel("sendButton").click();

// cy.getBySel("successMessage")
// .should("be.visible")
// .should("contain", "Message envoyé avec succès.");
// cy.on("window:alert", () => {
// throw new Error("Une fenêtre d'alerte s'est affichée !");
// });
// });
// it("it did not send empty form", () => {
// cy.getBySel("sendButton").click();
// cy.getBySel("name").should("have.class", "ng-invalid");
// cy.getBySel("email").should("have.class", "ng-invalid");
// cy.getBySel("message").should("have.class", "ng-invalid");
// cy.getBySel("successMessage").should("not.exist");
// });
// it("it did not send a form where the message is longer than 250 characters", () => {
// cy.getBySel("name").type("test");
// cy.getBySel("email").type("test@test.fr");
// cy.getBySel("message").type(
// "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin molestie magna, sed volutpat sem vestibulum nec. Aliquam erat volutpat. Morbi cursus nisi eu auctor placerat. Duis leo quam, maximus ut facilisis ac, molestie ut nibh porta ante."
// );
// cy.getBySel("sendButton").click();
// cy.getBySel("successMessage").should("not.exist");
// });