const productsUrl = `${Cypress.env("baseUrl")}/products`;
const product3Url = `${Cypress.env("baseUrl")}/products/3`;

describe("cart functional tests", () => {
  beforeEach(function () {
    // Logging in the user
    cy.simulate_login("test2@test.fr", "testtest").then(() => {
      cy.window().then((window) => {
        window.localStorage.setItem("user", `${Cypress.env("token")}`);
      });
    });
  });

  it("cannot add the product in the cart when its stock amount is inferior to 1", function () {
    cy.intercept("/products/3", {
      statusCode: 200,
      body: {
        id: 3,
        name: "Sentiments printaniers",
        availableStock: 0,
        skin: "Propre, fra\u00eeche",
        aromas: "Frais et fruit\u00e9",
        ingredients: "Framboise, zeste de citron et feuille de menthe",
        description:
          "Savon avec une formule douce \u00e0 base d\u2019huile de framboise, de citron et de menthe qui nettoie les mains efficacement sans les dess\u00e9cher.",
        price: 60,
        picture:
          "https://cdn.pixabay.com/photo/2020/02/08/10/35/soap-4829708_960_720.jpg",
        varieties: 4,
      },
    }).as("outOfStockProduct3");

    cy.visit(productsUrl);

    /*// Targetting the first product and clicking on the "consult" button //*/
    cy.get('.list-products > [data-cy="product"]')
      .eq(0)
      .find('[data-cy="product-link"]')
      .click();

    // Redirection to the product information sheet
    cy.wait("@outOfStockProduct3").then(function () {
      // Expect "out of stock" message and button "add to cart" disabled
      cy.getBySel("detail-product-add").should("be.disabled");
      cy.getBySel("detail-product-stock").should("have.text", "En rupture de stock");
    })
  });

  it("is adding one product 3 in the cart", function () {
    cy.visit(productsUrl);

    /*// Targetting the first product and clicking on the "consult" button //*/
    cy.intercept("/products/3").as("product3");
    cy.get('.list-products > [data-cy="product"]')
      .eq(0)
      .find('[data-cy="product-link"]')
      .click();

    // Storing the product 3 initial stock amount
    cy.wait("@product3").then(function () {
      cy.getBySel("detail-product-stock")
        .invoke("text")
        .then(function (stockText) {
          cy.wrap(parseInt(stockText))
            .as("initialStockAmount")
            .should("be.a", "number");
        });
    });

    cy.getBySel("detail-product-add").click();

    // Redirection to the cart
    // Expecting the product to be there
    cy.getBySel("cart-line")
      .should("exist")
      .find("[data-cy=cart-line-name]")
      .should("have.text", "Sentiments printaniers");
  });

  it("is checking that the product 3 stock amount has decreased by one", function () {
    // Redirection to the product information sheet page
    // Expecting the stock amount to have decreased by one
    cy.visit(productsUrl);

    /*// Targetting the first product and clicking on the "consult" button //*/
    cy.intercept("/products/3").as("product3");
    cy.get('.list-products > [data-cy="product"]')
      .eq(0)
      .find('[data-cy="product-link"]')
      .click();

    cy.wait("@product3").then(function () {
      cy.getBySel("detail-product-stock")
        .invoke("text")
        .then(function ($stockText) {
          const updatedStockAmount = parseInt($stockText);

          expect(updatedStockAmount).to.eq(this.initialStockAmount - 1);
        });
    });
  });

  it("cannot add less than 0 product in the cart", function () {
    cy.visit(product3Url);

    cy.getBySel("detail-product-quantity").type("-1");
    cy.getBySel("detail-product-add").click();
  })
});

/*// Storing the order line id //*/
// cy.wait("@addProduct").then(function (response) {
//   cy.wrap(response.body.orderLines[0].id).as("orderLineId");
// });

// .then(function (product3stockAmount) {
//   product3stockAmount = "1 en stock";
// });

/*// Storing the product 3 initial stock amount //*/
// cy.wait("@product3").then(function () {});

// Setting the product 3 initial stock amount to 1 and storing it
// cy.visit(product3Url);

// cy.getBySel("detail-product-stock").invoke("text", "1 en stock");

// cy.getBySel("detail-product-stock")
//   .invoke("text")
//   .then(function (stockText) {
//     const stockAmount = parseInt(stockText);

//     cy.wrap(stockAmount)
//       .as("initialStockAmount")
//       .should("be.a", "number")
//       .should("equal", 1);
//   });
