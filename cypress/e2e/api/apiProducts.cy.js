const apiProductsUrl = `${Cypress.env("apiUrl")}/products`;
const apiRandomProductsUrl = `${Cypress.env("apiUrl")}/products/random`;

describe("test API /products", () => {
  context("GET /products", () => {
    it("is getting the products list", () => {
      cy.request("GET", `${apiProductsUrl}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).length.to.be.greaterThan(7);
        expect(response.body).to.have.nested.property("[0].id").to.be.a("number");
        expect(response.body).to.have.nested.property("[0].name").to.be.a("string");
        expect(response.body).to.have.nested.property("[0].availableStock").to.be.a("number");
        expect(response.body).to.have.nested.property("[0].skin").to.be.a("string");
        expect(response.body).to.have.nested.property("[0].aromas").to.be.a("string");
        expect(response.body).to.have.nested.property("[0].ingredients").to.be.a("string");
        expect(response.body).to.have.nested.property("[0].description").to.be.a("string");
        expect(response.body).to.have.nested.property("[0].price").to.be.a("number");
        expect(response.body).to.have.nested.property("[0].picture").to.be.a("string");
        expect(response.body).to.have.nested.property("[0].varieties").to.be.a("number");
      });
    });

    it("is getting three random products", () => {
      cy.request("GET", `${apiRandomProductsUrl}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(3);
        expect(response.body).to.have.nested.property("[0].id").to.be.a("number");
        expect(response.body).to.have.nested.property("[0].name").to.be.a("string");
        expect(response.body).to.have.nested.property("[0].availableStock").to.be.a("number");
        expect(response.body).to.have.nested.property("[0].skin").to.be.a("string");
        expect(response.body).to.have.nested.property("[0].aromas").to.be.a("string");
        expect(response.body).to.have.nested.property("[0].ingredients").to.be.a("string");
        expect(response.body).to.have.nested.property("[0].description").to.be.a("string");
        expect(response.body).to.have.nested.property("[0].price").to.be.a("number");
        expect(response.body).to.have.nested.property("[0].picture").to.be.a("string");
        expect(response.body).to.have.nested.property("[0].varieties").to.be.a("number");
      });
    });

    it("is getting a product information sheet data", () => {
      cy.request("GET", `${apiProductsUrl}/3`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id", 3).to.be.a("number");
        expect(response.body).to.have.property("name").to.be.a("string");
        expect(response.body).to.have.property("availableStock").to.be.a("number");
        expect(response.body).to.have.property("skin").to.be.a("string");
        expect(response.body).to.have.property("aromas").to.be.a("string");
        expect(response.body).to.have.property("ingredients").to.be.a("string");
        expect(response.body).to.have.property("description").to.be.a("string");
        expect(response.body).to.have.property("price").to.be.a("number");
        expect(response.body).to.have.property("picture").to.be.a("string");
        expect(response.body).to.have.property("varieties").to.be.a("number");
      });
    });
  });
});
