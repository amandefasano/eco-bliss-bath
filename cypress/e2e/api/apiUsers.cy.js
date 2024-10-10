import { faker } from "@faker-js/faker";

const apiRegisterUrl = `${Cypress.env("apiUrl")}/register`;
const apiUserUrl = `${Cypress.env("apiUrl")}/me`;

describe("test API end-points for user registration and getting user's info", () => {
  before(function () {
    // Creating a random user
    const randomEmail = faker.internet.email();
    const randomFirstname = faker.person.firstName();
    const randomLastname = faker.person.lastName();
    const randomPwd = faker.internet.password();
    const pwd = randomPwd;

    cy.wrap(randomEmail).as("email");
    cy.wrap(randomFirstname).as("firstname");
    cy.wrap(randomLastname).as("lastname");
    cy.wrap(pwd).as("password");
  });

  it("POST /register: is registering a new user", function () {
    cy.request({
      method: "POST",
      url: apiRegisterUrl,
      body: {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        plainPassword: {
          first: this.password,
          second: this.password,
        },
      },
    }).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id").that.is.a("number");
      expect(response.body)
        .to.have.property("email")
        .that.is.a("string")
        .to.deep.eq(this.email);
      expect(response.body).to.have.property("roles").that.is.an("array");
      expect(response.body).to.have.property("password").that.is.a("string");
      expect(response.body)
        .to.have.property("firstname")
        .that.is.a("string")
        .to.deep.eq(this.firstname);
      expect(response.body)
        .to.have.property("lastname")
        .that.is.a("string")
        .to.deep.eq(this.lastname);
      expect(response.body)
        .to.have.property("plainPassword")
        .that.is.a("string")
        .to.deep.eq(this.password);
      expect(response.body)
        .to.have.property("userIdentifier")
        .that.is.a("string")
        .to.deep.eq(this.email);
      expect(response.body)
        .to.have.property("username")
        .that.is.a("string")
        .to.deep.eq(this.email);
      expect(response.body).to.have.property("salt");
    });
  });

  it("GET /me: is getting information on the logged in user", function () {
    // Logging in the user
    cy.simulate_login(this.email, this.password).then(() => {
      const token = Cypress.env("token");

      // Getting the logged in user info
      cy.request({
        method: "GET",
        url: apiUserUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id").that.is.a("number");
        expect(response.body)
          .to.have.property("email")
          .that.is.a("string")
          .to.deep.eq(this.email);
        expect(response.body)
          .to.have.property("userIdentifier")
          .that.is.a("string")
          .to.deep.eq(this.email);
        expect(response.body)
          .to.have.property("username")
          .that.is.a("string")
          .to.deep.eq(this.email);
        expect(response.body).to.have.property("roles").that.is.an("array");
        expect(response.body).to.have.property("password").that.is.a("string");
        expect(response.body).to.have.property("salt");
        expect(response.body)
          .to.have.property("firstname")
          .that.is.a("string")
          .to.deep.eq(this.firstname);
        expect(response.body)
          .to.have.property("lastname")
          .that.is.a("string")
          .to.deep.eq(this.lastname);
      });
    });
  });
});
