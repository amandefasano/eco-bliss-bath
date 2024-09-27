import { faker } from "@faker-js/faker";

const apiRegisterUrl = `${Cypress.env("apiUrl")}/register`;
const apiLoginUrl = `${Cypress.env("apiUrl")}/login`;

const randomEmail = faker.internet.email();
const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomPwd = faker.internet.password();
const pwd = randomPwd;

describe("test API /login", () => {
  context("POST /login", () => {
    it("is logging in a random user", () => {
      // Registering a new random user
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
        // Logging in the user
        const username = response.body.email;
        const password = response.body.plainPassword;

        cy.request({
          method: "POST",
          url: apiLoginUrl,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: {
            username: username,
            password: password,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("token");
        });
      });
    });
  });
});
