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

  it("should redirect to login if not logged in", () => {
    cy.visit("http://localhost:4200/");

    cy.url().should("include", "login");
  });

  it.only("should not be able to visit /login if logged in", () => {
    cy.session("standard_login", () => {
      cy.visit("http://localhost:4200/login");
      cy.findByText("Username").click().type("mor_2314");
      cy.findByText("Password").click().type("83r5^_");
      cy.get("form").contains("Log in").click();
      cy.url().should("equal", "http://localhost:4200/");
    });
    cy.visit("http://localhost:4200/login");
    cy.url().should("not.include", "login");
  });
});
