describe("products", () => {
  it("shows a list of products", () => {
    cy.standardLogin();
    cy.visit("http://localhost:4200/");

    cy.findAllByLabelText("item").should("have.length.least", 1);
  });
});
