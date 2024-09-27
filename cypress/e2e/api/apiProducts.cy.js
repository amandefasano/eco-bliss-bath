const apiProductsUrl = `${Cypress.env("apiUrl")}/products`;
const apiRandomProductsUrl = `${Cypress.env("apiUrl")}/products/random`;

describe("test API /products", () => {
  context("GET /products", () => {
    it("is getting the products list", () => {
      cy.request("GET", `${apiProductsUrl}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).length.to.be.greaterThan(7);
      });
    });

    it("is getting three random products", () => {
      cy.request("GET", `${apiRandomProductsUrl}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(3);
      });
    });

    it("is getting a product information sheet data", () => {
      cy.request("GET", `${apiProductsUrl}/3`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("description");
      });
    });
  });
});
