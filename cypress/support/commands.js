// /// <reference types="cypress" />
import "@testing-library/cypress/add-commands";
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add("standardLogin", () => {
  cy.session("standard_login", () => {
    cy.visit("http://localhost:4200/login");
    cy.findByText("Username").click().type("mor_2314");
    cy.findByText("Password").click().type("83r5^_");
    cy.get("form").contains("Log in").click();
    cy.url().should("equal", "http://localhost:4200/");
  });
});

Cypress.Commands.add("adminLogin", () => {
  cy.session("admin_login", () => {
    cy.visit("http://localhost:4200/login");
    cy.intercept("https://fakestoreapi.com/auth/login").as("login");
    cy.findByText("Username").click().type("johnd");
    cy.findByText("Password").click().type("m38rmF$");
    cy.get("form").contains("Log in").click();
    cy.wait("@login");
    cy.visit("http://localhost:4200/admin");
    cy.url().should("equal", "http://localhost:4200/admin");
  });
});
