const apiOrdersUrl = `${Cypress.env("apiUrl")}/orders`;
const apiProductsUrl = `${Cypress.env("apiUrl")}/products`;
const baseUrl = Cypress.env('baseUrl');
const productsUrl = `${baseUrl}/products`;
const cartUrl = `${baseUrl}/cart`;

describe("test API method 'GET'", () => {
  context("GET /orders", () => {
    it("is trying to get the list of products currently in the cart without being connected: expects error 403", () => {
      cy.request({
        method: "GET",
        url: apiOrdersUrl,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(403);
      });
    });

    it("returns an object containing the list of products currently in the cart", () => {
      cy.visit(baseUrl);
      cy.getBySel("nav-link-login").should("exist").click();

      // Logging in
      cy.getBySel("login-input-username").type("testApi@test.fr");
      cy.getBySel("login-input-password").type("testApi");
      cy.intercept('POST', '/login').as('postLogin');
      cy.getBySel("login-submit").click();

      // Adding a product in the cart
      cy.wait('@postLogin');
      cy.visit(`${productsUrl}/3`);
      cy.getBySel("detail-product-add").click();

      // Sending the api request
      cy.request({
        method: "GET",
        url: apiOrdersUrl,
        failOnStatusCode: false,
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjcyNzQyMTIsImV4cCI6MTcyNzI3NzgxMiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdEFwaUB0ZXN0LmZyIn0.J2bk_ZzXtLx-4uHs05HxtLHYPQ4UWWHjOYBV8gaZTSpi5nZVP01qcyi8GpYsNHEVX67k-aX3nIfZlGMMyHb8OLP-hLPDZVSOYUa0WxYP_uWAoxRpMBLPQxl5-EMjoh5AhCZDZM5kmpOr08CRXWBAflDjNTCM23b2AT4oGqF-AwuDFq-NzMHqZDXrCfwzUnkdxGjSLEYwafYH73YrEvvuIRH7VKtK8QdVxaqDOqSRJKdavpRRTAy-7Fr1wKnxs_lpP_wEBXl1bhd10ejsjkEejn-KmBzqTF4cmr2rbo3118oc9BOYjDz13HvN_56GEewcjIy-6IzQv9_AzoCuw7GaIA",
        },
      }).then((response) => {
        // if(response.status === 200) {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("orderLines");
        // } else {
        //   expect(response.status).to.eq(404);
        // }
      });

      // Emptying the cart and logging out
      cy.visit(cartUrl);
      cy.getBySel("cart-line-delete").click();
      cy.getBySel("nav-link-logout").click();
    });
  });

  context("GET /products/{id}", () => {
    it("returns the product information sheet data", () => {
      cy.request("GET", `${apiProductsUrl}/3`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("description");
      });
    });
  });
});

// it("it check the presence of the disponibility field on the product information sheet", () => {
//     cy.visit("/");

//     // Redirection to the product page
//     cy.getBySel("nav-link-products").click();
//     cy.getBySel("product").find('[data-cy="product-link"]').should("exist");

//     // Targetting the first product and clicking on the "consult" button
//     cy.get('.list-products > [data-cy="product"]')
//       .eq(0)
//       .find('[data-cy="product-link"]')
//       .click();

//     // Redirection to the product information sheet page
//     cy.getBySel("detail-product-stock").should("exist").should("be.visible");
//   });
