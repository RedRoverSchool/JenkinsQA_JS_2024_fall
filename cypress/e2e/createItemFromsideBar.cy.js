/// <reference types="cypress" />

describe('create a "New item', () => {

it('create new item from the "New Item" link in the left sidebar', () => {
    cy.get(':nth-child(1) > .task-link-wrapper > .task-link').click()
    cy.url().should('include', '/newJob')
    cy.get('input[name="name"]').type("test2")
    cy.get(".hudson_model_FreeStyleProject").click()
    cy.get("#ok-button").click()
    cy.get('.jenkins-submit-button').click()
    cy.url().should('include', '/test2')
    cy.get("#main-panel").should("contain", "test2").and('exist')
});
});