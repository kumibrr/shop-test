describe("Cart", () => {
  it("loads cart data", () => {
    cy.standardLogin();
    cy.intercept("https://fakestoreapi.com/carts/user/2").as("getCart");
    cy.visit("http://localhost:4200/");
    cy.wait("@getCart");
    cy.findByText("shopping cart").click();
    cy.get("#shopping-cart")
      .findByText(/Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i)
      .should("exist");
  });

  it("should display the correct price", () => {
    cy.standardLogin();
    cy.intercept("https://fakestoreapi.com/carts/user/2").as("getCart");
    cy.visit("http://localhost:4200/");
    cy.wait("@getCart");
    cy.findByText("shopping cart").click();
    cy.get("#shopping-cart")
      .findByText(/Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i)
      .parent()
      .as("row");

    cy.get("@row").findByDisplayValue("2");
    cy.get("@row").findByText("€219.90").should("exist");
    cy.get("@row").findByText("€64.00").should("not.exist");
  });

  it("should remove an item", () => {
    cy.standardLogin();
    cy.intercept("https://fakestoreapi.com/carts/user/2").as("getCart");
    cy.intercept("https://fakestoreapi.com/carts/3").as("removeItem");
    cy.visit("http://localhost:4200/");
    cy.wait("@getCart");
    cy.findByText("shopping cart").click();
    cy.get("#shopping-cart")
      .findByText(/Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i)
      .parent()
      .as("row");
    cy.get("@row").findByLabelText("Remove item").click();
    cy.wait("@removeItem");
    cy.get("#shopping-cart")
      .findByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
      .should("not.exist");
  });

  it("should update quantity and update price", () => {
    cy.standardLogin();
    cy.intercept("https://fakestoreapi.com/carts/user/2").as("getCart");
    cy.intercept("https://fakestoreapi.com/carts/3").as("updateCart");
    cy.visit("http://localhost:4200/");
    cy.wait("@getCart");
    cy.findByText("shopping cart").click();
    cy.get("#shopping-cart")
      .findByText(/Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i)
      .parent()
      .as("row");
    cy.get("@row").findByDisplayValue("2").type("{backspace}3{enter}");
    cy.wait("@updateCart");
    cy.get("@row").findByText("€329.85").should("exist");
    cy.findByText("total: €393.85").should("exist");
  });

  it("admin can view anyone's shopping cart", () => {
    cy.adminLogin();
    cy.intercept("https://fakestoreapi.com/users").as("loadUsers");
    cy.intercept("https://fakestoreapi.com/carts/6").as("updateCart");
    cy.visit("http://localhost:4200/admin");
    cy.wait("@loadUsers");

    cy.findByText("don@gmail.com").parent().as("row");
    cy.get("@row").findByTitle("View user's shopping cart").click();
    cy.findByText("SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s").should(
      "exist"
    );
    cy.findByDisplayValue("3").type("{backspace}4{enter}");
    cy.wait("@updateCart");
    cy.findByText("€456.00").should("exist");
  });
});
