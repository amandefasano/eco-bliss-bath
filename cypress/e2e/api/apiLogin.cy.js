import { faker } from "@faker-js/faker";

const apiRegisterUrl = `${Cypress.env("apiUrl")}/register`;
const apiLoginUrl = `${Cypress.env("apiUrl")}/login`;

describe("test API /login", () => {
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
    }).then((response) => {
      cy.wrap(response.body.email).as("username");
      cy.wrap(response.body.plainPassword).as("password");
    });
  });

  it("POST /login: is logging in a user", function () {
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
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
    });
  });
});

describe("negative scenarios", function () {
  it("is trying to log in a non existing user: expects error 401", function () {
    cy.request({
      method: "POST",
      url: apiLoginUrl,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        username: "doNotExist@test.fr",
        password: "do*not*exist",
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property("message")
      .to.deep.equal("Invalid credentials.");
    });
  });
});
