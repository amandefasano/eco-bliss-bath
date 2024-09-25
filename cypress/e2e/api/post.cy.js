const apiOrdersUrl = `${Cypress.env("apiUrl")}/orders`;

describe("test API method 'POST'", () => {
  context("POST /register", () => {
    it("Trying to get  without being connected should return error 403", () => {
      cy.request({
        method: "GET",
        url: apiOrdersUrl,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(403);
      });
    });
  });
});
