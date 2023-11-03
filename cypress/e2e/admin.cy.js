describe("login", () => {
  it("should be able to visit /admin", () => {
    cy.adminLogin();
  });

  it("should be able to delete user", () => {
    cy.intercept("https://fakestoreapi.com/users").as("loadUsers");
    cy.adminLogin();
    cy.visit("http://localhost:4200/admin");
    cy.wait("@loadUsers");

    cy.findByText("don@gmail.com").parent().as("row");
    cy.get("@row").findByTitle("Delete user").click();
    cy.findByText("don@gmail.com").should("not.exist");
  });

  it("should update fields when user is edited", () => {
    cy.intercept("https://fakestoreapi.com/users").as("loadUsers");
    cy.adminLogin();
    cy.visit("http://localhost:4200/admin");
    cy.wait("@loadUsers");

    cy.intercept("https://fakestoreapi.com/users/4").as("updateUser");

    cy.findByText("don@gmail.com").parent().as("row");
    cy.get("@row").findByTitle("Edit user").click();
    cy.findByDisplayValue("don@gmail.com")
      .clear()
      .click()
      .type("don@yahoo.com");
    cy.findByTitle("Apply").click();
    cy.wait("@updateUser");
    cy.findByText("don@yahoo.com").should("exist");
  });

  it("should be able to add new users", () => {
    cy.intercept("https://fakestoreapi.com/users").as("loadUsers");
    cy.adminLogin();
    cy.visit("http://localhost:4200/admin");
    cy.wait("@loadUsers");

    cy.intercept("POST", "https://fakestoreapi.com/users").as("createUser");

    cy.findByText("Add new user").click();
    cy.findByTitle("Cancel").parent().parent().as("row");
    cy.get("@row").get("#email").type("test@test");
    cy.get("@row").get("#username").type("test");
    cy.get("@row").get("#firstname").type("test");
    cy.get("@row").get("#lastname").type("test");
    cy.get("@row").get("#phone").type("692584092");
    cy.get("@row").findByTitle("Edit address").click();
    cy.get("@row").get("#street").type("fake st.");
    cy.get("@row").get("#number").type("123");
    cy.get("@row").get("#city").type("Chicago");
    cy.get("@row").get("#zipcode").type("1231-123");
    cy.get("@row").get("#latitude").type("30");
    cy.get("@row").get("#longitude").type("30");
    cy.findByText("Save address").click();
    cy.findByTitle("Apply").click();
    cy.wait("@createUser");
    cy.findByText("692584092").should("exist");
  });
});
