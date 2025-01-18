const apiReviewsUrl = `${Cypress.env("apiUrl")}/reviews`;

describe("test API /reviews", () => {
  before(function () {
    // Logging in a user
    cy.simulate_login(
      Cypress.env("apiEmail"),
      Cypress.env("apiPassword")
    );
  });

  it("GET /reviews: is getting all the reviews", function () {
    cy.request(apiReviewsUrl).then((response) => {
      // Check status and body structure
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");

      // Loop through each review and perform assertions
      response.body.forEach((review) => {
        expect(review).to.have.property("id").that.is.a("number");
        expect(review)
          .to.have.property("date")
          .that.satisfies((value) => !isNaN(Date.parse(value)));
        expect(review).to.have.property("title").that.is.a("string");
        expect(review).to.have.property("comment").that.is.a("string");
        expect(review).to.have.property("rating").that.is.a("number");

        // Assertions for nested author properties
        expect(review).to.have.nested.property("author.id").that.is.a("number");
        expect(review)
          .to.have.nested.property("author.email")
          .that.is.a("string");
        expect(review)
          .to.have.nested.property("author.userIdentifier")
          .that.is.a("string");
        expect(review)
          .to.have.nested.property("author.username")
          .that.is.a("string");
        expect(review)
          .to.have.nested.property("author.roles")
          .that.is.an("array");
        expect(review)
          .to.have.nested.property("author.password")
          .that.is.a("string");
        expect(review).to.have.nested.property("author.salt");
        expect(review)
          .to.have.nested.property("author.firstname")
          .that.is.a("string");
        expect(review)
          .to.have.nested.property("author.lastname")
          .that.is.a("string");
        expect(review).to.have.nested.property("author.__initializer__");
        expect(review).to.have.nested.property("author.__cloner__");
        expect(review).to.have.nested.property("author.__isInitialized__").to.be
          .true;
      });
    });
  });

  it("POST /reviews: is posting a review", function () {
    cy.request({
      method: "POST",
      url: apiReviewsUrl,
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      body: {
        title: "Bons produits",
        comment:
          "Les savons sont de bonne qualité, mais certains ont un prix qui ne semble pas justifiable...",
        rating: 3,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id").that.is.a("number");
      expect(response.body)
        .to.have.property("date")
        .that.satisfies((value) => !isNaN(Date.parse(value)));
      expect(response.body)
        .to.have.property("title")
        .that.is.a("string")
        .to.deep.eq("Bons produits");
      expect(response.body)
        .to.have.property("comment")
        .that.is.a("string")
        .to.deep.eq(
          "Les savons sont de bonne qualité, mais certains ont un prix qui ne semble pas justifiable..."
        );
      expect(response.body)
        .to.have.property("rating")
        .that.is.a("number")
        .to.deep.eq(3);
      expect(response.body)
        .to.have.nested.property("author.id")
        .that.is.a("number")
        .to.deep.eq(12);
      expect(response.body)
        .to.have.nested.property("author.email")
        .that.is.a("string")
        .to.deep.eq(`${Cypress.env("apiEmail")}`);
      expect(response.body)
        .to.have.nested.property("author.userIdentifier")
        .that.is.a("string")
        .to.deep.eq(`${Cypress.env("apiEmail")}`);
      expect(response.body)
        .to.have.nested.property("author.username")
        .that.is.a("string")
        .to.deep.eq(`${Cypress.env("apiEmail")}`);
      expect(response.body)
        .to.have.nested.property("author.roles")
        .that.is.an("array");
      expect(response.body).to.have.nested.property("author.salt");
      expect(response.body)
        .to.have.nested.property("author.firstname")
        .that.is.a("string")
        .to.deep.eq("Marie");
      expect(response.body)
        .to.have.nested.property("author.lastname")
        .that.is.a("string")
        .to.deep.eq("Test");
    });
  });
});
