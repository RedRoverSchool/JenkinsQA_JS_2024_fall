/// <reference types="cypress" />

describe('create a "New item', () => {

    it(' create new item from the "Create a job" button on the homepage ', () => {
        cy.get("a[href='newJob']").click()
        cy.url().should('include', '/newJob')
        cy.get('input[name="name"]').type("test2")
        cy.get(".hudson_model_FreeStyleProject").click()
        cy.get("#ok-button").click()
        cy.get('.jenkins-submit-button').click()
        cy.url().should('include', '/test2')
        cy.get("#main-panel").should("contain", "test2").and('exist')
        cy.get("li.jenkins-breadcrumbs__list-item a.model-link").first().click()
        cy.get(':nth-child(1) > .task-link-wrapper > .task-link').click()
        cy.get('input[name="name"]').type("test2")
        cy.get("#itemname-invalid").should("have.class", "input-validation-message")
        cy.get('#itemname-invalid')
            .should('be.visible')
        cy.contains(/already exists with the name ‘test2’/)

    });
});