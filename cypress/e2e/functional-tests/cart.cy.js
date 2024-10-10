const productsUrl = `${Cypress.env("baseUrl")}/products`;
const product3Url = `${Cypress.env("baseUrl")}/products/3`;
const apiProduct3Url = `${Cypress.env("apiUrl")}/products/3`;
const apiAddProductUrl = `${Cypress.env("apiUrl")}/orders/add`;
const apiOrdersUrl = `${Cypress.env("apiUrl")}/orders`;
const cartUrl = `${Cypress.env("baseUrl")}/cart`;

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
    cy.intercept(apiProduct3Url, {
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
      cy.getBySel("detail-product-stock").should(
        "have.text",
        "En rupture de stock"
      );
    });
  });

  it("An order line with the added product is created in the cart", function () {
    cy.visit(productsUrl);

    /*// Targetting the first product and clicking on the "consult" button //*/
    cy.intercept(apiProduct3Url).as("product3");
    cy.get('.list-products > [data-cy="product"]')
      .eq(0)
      .find('[data-cy="product-link"]')
      .click();

    /*// Storing the product 3 initial stock amount //*/
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

  it("The added product stock amount has decreased by one", function () {
    // Redirection to the product information sheet page
    cy.visit(productsUrl);

    /*// Targetting the first product and clicking on the "consult" button //*/
    cy.intercept(apiProduct3Url).as("product3");
    cy.get('.list-products > [data-cy="product"]')
      .eq(0)
      .find('[data-cy="product-link"]')
      .click();

    // Expecting the stock amount to have decreased by one
    cy.wait("@product3").then(function () {
      cy.getBySel("detail-product-stock")
        .invoke("text")
        .then(function ($stockText) {
          const updatedStockAmount = parseInt($stockText);

          expect(updatedStockAmount).to.eq(this.initialStockAmount - 1);
        });
    });
  });

  it("The product has been added in the cart (API call)", () => {
    cy.intercept(apiProduct3Url).as("product3");
    cy.visit(product3Url);
    cy.intercept(apiAddProductUrl).as("addProduct");

    cy.wait("@product3").then(function () {
      cy.getBySel("detail-product-add").click();
      cy.wait("@addProduct").then((interception) => {
        const responseBody = interception.response.body;
        expect(responseBody.orderLines).to.have.length.at.least(1);
        expect(responseBody.orderLines[0])
          .to.have.nested.property("product.id", 3)
          .that.is.a("number");
      });
    });
  });

  it("The stock amount of the removed from the cart product has recovered initial state", function () {
    cy.intercept(apiOrdersUrl).as("orders");
    cy.visit(cartUrl);

    cy.wait("@orders").then(function (interception) {
      const orderLineId = interception.response.body.orderLines[0].id;
      cy.intercept(`/orders/${orderLineId}/delete`).as("deleteProduct");
      cy.getBySel("cart-line-delete").click();
    });

    cy.wait("@deleteProduct").then(function () {
      cy.visit(productsUrl);

    /*// Targetting the first product and clicking on the "consult" button //*/
    cy.intercept(apiProduct3Url).as("product3");
    cy.get('.list-products > [data-cy="product"]')
      .eq(0)
      .find('[data-cy="product-link"]')
      .click();
    });

    // Expecting the stock amount to have recovered initial state
    cy.wait("@product3").then(function () {
      cy.getBySel("detail-product-stock")
        .invoke("text")
        .then(function ($stockText) {
          const updatedStockAmount = parseInt($stockText);

          expect(updatedStockAmount).to.eq(this.initialStockAmount);
        });
    });
  })

  it("cannot add less than 0 product in the cart", function () {
    cy.visit(product3Url);

    cy.getBySel("detail-product-quantity")
      .should("have.value", 1)
      .should("have.class", "ng-valid")
      .clear()
      .type("-1")
      .should("have.class", "ng-invalid");
  });

  it("cannot add more than 20 products in the cart", function () {
    cy.visit(product3Url);

    cy.getBySel("detail-product-quantity")
      .should("have.value", 1)
      .should("have.class", "ng-valid")
      .clear()
      .type("21")
      .should("have.class", "ng-invalid");
  });
});
