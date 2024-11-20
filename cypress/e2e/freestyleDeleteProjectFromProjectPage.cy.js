/// <reference types="cypress"/>
describe('US_01.004 | FreestyleProject > Delete Project', () => {
    it('TC_01.004.04 | FreestyleProject > Delete Project|Delete a project from the Project Page', () => {
        //Create a project
        cy.get('span').contains('New Item').click()
        cy.get('input[name="name"]').type('NewPrj1')
        cy.get('span.label').contains('Freestyle project').click()
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Save').click()
        cy.url().should('include', 'NewPrj1')
        cy.get('.job-index-headline').contains('NewPrj1').should('exist')
        //Delete the project
        cy.get(':nth-child(7) > .task-link-wrapper > .task-link > :nth-child(2)').click()
        cy.get('.jenkins-button--primary').click()
        cy.contains('NewPrj1').should('not.exist')
        cy.get('#main-panel h1').should('have.text', "Welcome to Jenkins!");
    })
})