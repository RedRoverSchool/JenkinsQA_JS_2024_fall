/// <reference types="cypress" />
describe('US_00.000 | New Item > Create New item', () => {
    const jobName = 'Item_1'
    it('TC_00.000-02 | New Item > Create New item | Create new item from "Create a job" button', () => {
        cy.visit('http://localhost:8080/login?from=%2F')
        cy.get('input#j_username').type('admin')
        cy.get('input#j_password').type('admin')
        cy.get('button.jenkins-button.jenkins-button--primary').contains('Sign in').click()
        cy.get('span').contains(jobName).should('not.exist')
        cy.get('a[href="newJob"]').contains('Create a job').click()
        cy.get('input#name.jenkins-input').type(jobName)
        cy.get('.desc').eq(0).click()
        cy.get('#ok-button').click()
        cy.get('a#jenkins-home-link').click()
        cy.get('table.jenkins-table.sortable').contains(jobName).should('exist')
    })
})