const apiProductsUrl = `${Cypress.env("apiUrl")}/products`;
const apiRandomProductsUrl = `${Cypress.env("apiUrl")}/products/random`;

describe("tests API /products", () => {
  it("GET /products: is getting the products list", () => {
    cy.request("GET", `${apiProductsUrl}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).length.to.be.greaterThan(7);

      response.body.forEach((product) => {
        expect(product).to.have.property("id").to.be.a("number");
        expect(product).to.have.property("name").to.be.a("string");
        expect(product).to.have.property("availableStock").to.be.a("number");
        expect(product).to.have.property("skin").to.be.a("string");
        expect(product).to.have.property("aromas").to.be.a("string");
        expect(product).to.have.property("ingredients").to.be.a("string");
        expect(product).to.have.property("description").to.be.a("string");
        expect(product).to.have.property("price").to.be.a("number");
        expect(product).to.have.property("picture").to.be.a("string");
        expect(product).to.have.property("varieties").to.be.a("number");
      });
    });
  });

  it("GET /products/random: is getting three random products", () => {
    cy.request("GET", `${apiRandomProductsUrl}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(3);

      response.body.forEach((product) => {
        expect(product).to.have.property("id").to.be.a("number");
        expect(product).to.have.property("name").to.be.a("string");
        expect(product).to.have.property("availableStock").to.be.a("number");
        expect(product).to.have.property("skin").to.be.a("string");
        expect(product).to.have.property("aromas").to.be.a("string");
        expect(product).to.have.property("ingredients").to.be.a("string");
        expect(product).to.have.property("description").to.be.a("string");
        expect(product).to.have.property("price").to.be.a("number");
        expect(product).to.have.property("picture").to.be.a("string");
        expect(product).to.have.property("varieties").to.be.a("number");
      });
    });
  });

  it("GET /products/{id}: is getting a product information sheet data", () => {
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
