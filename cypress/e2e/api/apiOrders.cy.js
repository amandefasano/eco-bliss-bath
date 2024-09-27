import { faker } from "@faker-js/faker";

const apiRegisterUrl = `${Cypress.env("apiUrl")}/register`;
const apiLoginUrl = `${Cypress.env("apiUrl")}/login`;
const apiAddProductUrl = `${Cypress.env("apiUrl")}/orders/add`;
const apiOrdersUrl = `${Cypress.env("apiUrl")}/orders`;

describe("test API /orders", () => {
  beforeEach(function () {
    // Registering a new random user
    const randomEmail = faker.internet.email();
    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomPwd = faker.internet.password();
    const pwd = randomPwd;
    const randomAddress = faker.location.streetAddress();
    const randomCity = faker.location.city();

    cy.request({
      method: "POST",
      url: apiRegisterUrl,
      body: {
        email: randomEmail,
        firstname: randomFirstName,
        lastname: randomLastName,
        plainPassword: {
          first: pwd,
          second: pwd,
        },
      },
    }).then(function (response) {
      cy.wrap(response.body.email).as("username");
      cy.wrap(response.body.plainPassword).as("password");

      // logging in the user
      cy.request({
        method: "POST",
        url: apiLoginUrl,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          username: response.body.email,
          password: response.body.plainPassword,
        },
      }).then(function (response) {
        cy.wrap(response.body.token).as("token");

        // Putting a product in the cart
        cy.request({
          method: "PUT",
          url: apiAddProductUrl,
          headers: {
            Authorization: `Bearer ${response.body.token}`,
          },
          body: {
            product: 3,
            quantity: 1,
          },
        }).then(function (response) {
          cy.wrap(response.body.orderLines[0].id).as("id");
        });
      });
    });

    cy.wrap(randomFirstName).as("randomFirstName");
    cy.wrap(randomLastName).as("randomLastName");
    cy.wrap(randomAddress).as("randomAddress");
    cy.wrap(randomCity).as("randomCity");
  });

  it("GET /orders: is getting the connected user's cart", function () {
    cy.request({
      method: "GET",
      url: apiOrdersUrl,
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("orderLines");
    });
  });

  it("POST /orders: is sending an order", function () {
    cy.request({
      method: "POST",
      url: apiOrdersUrl,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: {
        firstname: this.randomFirstName,
        lastname: this.randomLastName,
        address: this.randomAddress,
        zipCode: 13008,
        city: this.randomCity,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("orderLines");
    });
  });

  it("POST /orders/add: is adding a product in the cart", function () {
    cy.request({
      method: "PUT",
      url: apiAddProductUrl,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: {
        product: 3,
        quantity: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("orderLines");
      cy.wrap(response.body.orderLines[0].id).as("id");
    });
  });

  it("PUT /{id}/change-quantity: is modifying the quantity", function () {
    cy.get("@id").then(function (id) {
      cy.request({
        method: "PUT",
        url: `${apiOrdersUrl}/${id}/change-quantity`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: {
          quantity: 2,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("orderLines");
      });
    });
  });

  it("DELETE /{id}/delete: is removing a product from the cart", function () {
    cy.get("@id").then(function (id) {
      cy.request({
        method: "DELETE",
        url: `${apiOrdersUrl}/${id}/delete`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("orderLines").to.have.length(0);
      });
    });
  });
});

describe("negative scenarios", () => {
  before(function () {
    // Registering a new random user
    const randomEmail = faker.internet.email();
    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomPwd = faker.internet.password();
    const pwd = randomPwd;

    cy.request({
      method: "POST",
      url: apiRegisterUrl,
      body: {
        email: randomEmail,
        firstname: randomFirstName,
        lastname: randomLastName,
        plainPassword: {
          first: pwd,
          second: pwd,
        },
      },
    }).then(function (response) {
      cy.wrap(response.body.email).as("username");
      cy.wrap(response.body.plainPassword).as("password");
    });
  });

  it("is trying to get a newly registered user's empty cart: expects error 404", function () {
    // logging in the user
    cy.request({
      method: "POST",
      url: apiLoginUrl,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        username: this.username,
        password: this.password,
      },
    }).then((response) => {
      // Getting the user's cart
      cy.request({
        method: "GET",
        url: apiOrdersUrl,
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${response.body.token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  it("is trying to get a non connected user's cart: expects error 403", () => {
    cy.request({
      method: "GET",
      url: apiOrdersUrl,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
});
