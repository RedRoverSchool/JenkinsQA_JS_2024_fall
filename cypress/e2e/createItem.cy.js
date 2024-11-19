
/// <reference types="cypress" />

describe("US_00.000 | New Item > Create New item", () => {

it('TC_00_000.03 | New Item > Create New item | From the "New Item" link in the left sidebar', () => {
    cy.get(':nth-child(1) > .task-link-wrapper > .task-link').click();
    cy.url().should('include', '/newJob');
    cy.get('input[name="name"]').type('test2');
    cy.get('.hudson_model_FreeStyleProject').click();
    cy.get('#ok-button').should('be.visible').click();
    cy.get('.jenkins-submit-button').click();
    cy.url().should('include', '/test2');
    cy.get('#main-panel').should('contain', 'test2').and('exist');
});
});