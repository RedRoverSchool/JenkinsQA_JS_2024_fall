/// <reference types="cypress" />

describe("US_00.002 | New Item > Create Pipeline Project", () => {

  it("New Item > Create Pipeline Project | Special characters are not allowed in the project name", () => {
    cy.get(".task-link-text").contains("New Item").click({ force: true });
    cy.get("#name.jenkins-input").type("New<>Name");
    cy.get("#itemname-invalid")
      .should("have.text", "» ‘<’ is an unsafe character")
      .and("have.css", "color", "rgb(230, 0, 31)");
  });

  it('TC_00.002.04 | Create Pipeline Project with an empty item name field', () => {
    cy.get('span').contains("New Item").click();
    cy.get('.label').contains('Pipeline').click();

    cy.get('#itemname-required').should('have.text', '» This field cannot be empty, please enter a valid name')
      .should('have.css', 'color', 'rgb(230, 0, 31)');
  })
});