describe("login", () => {
  it("login button should be disabled when invalid", () => {
    cy.visit("http://localhost:4200/login");

    cy.findByText("Log in").should("be.disabled");

    cy.findByText("Username").click().type("username");
    cy.findByText("Log in").should("be.disabled");
    cy.findByText("Username").clear();

    cy.findByText("Password").click().type("password");
    cy.findByText("Log in").should("be.disabled");
  });

  it("login button should be enabled when valid", () => {
    cy.visit("http://localhost:4200/login");

    cy.findByText("Username").click().type("username");
    cy.findByText("Password").click().type("password");
    cy.findByText("Log in").should("not.be.disabled");
  });
});
