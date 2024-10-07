const apiLoginUrl = `${Cypress.env("apiUrl")}/login`;

describe("test API /login", () => {
  it("POST /login: is logging in a user", function () {
    cy.request({
      method: "POST",
      url: apiLoginUrl,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        username: `${Cypress.env("userEmail")}`,
        password: `${Cypress.env("userPassword")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token").to.be.a("string");
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
      .to.deep.eq("Invalid credentials.");
    });
  });
});
