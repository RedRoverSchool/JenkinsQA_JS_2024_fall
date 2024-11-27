/// <reference types="cypress"/>
describe('example_test', () => {

    it('jenkins_test', () => {
        cy.get('.task-link-text').contains('New Item').click({ force: true })
        cy.get('#name.jenkins-input').type('Hi bro')
        cy.get('.desc').eq(0).click()
        cy.get('#ok-button').click()
    })
})
