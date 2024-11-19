/// <reference types="cypress" />

describe('US_00.000 | New Item > Create New item', () => {

    it('TC_00.000-01|New Item > Create New item | Create new item from "Create a job" button|Invalid data', () => {
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
        cy.get('input[name="name"]').type("@@@@");
        cy.get("#itemname-invalid").should("have.class", "input-validation-message")
        cy.get('#itemname-invalid')
            .should('be.visible')
        cy.contains(/is an unsafe character/)
        cy.get('input[name="name"]').click()
        cy.get("#itemname-required").contains(/This field cannot be empty/)
            .should("have.class", "input-validation-message")

    });
});
