/// <reference types="cypress" />

describe("Header > Search Box", () => {
  it("Header > Search Box | User can select suggestion to auto-fill and complete the search", () => {
    cy.get("#search-box").click();
    cy.get("#search-box").type("s");
    cy.get("#search-box-completion li").first().click();
    cy.get("#search-box").type('{enter}');
    cy.get(".jenkins-app-bar h1").should('contain.text', 'SYSTEM')
  });
});