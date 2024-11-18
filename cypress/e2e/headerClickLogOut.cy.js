/// <reference types="cypress"/>
describe('US_14.003| Header > Click Log out', () => {
    it('TC_14.003.01| Header > Click Log out|Log out from Jenkins', () => {
        cy.get('[href="/logout"]').contains('выход').should('be.visible')
        cy.get('[href="/logout"] > .hidden-xs').contains('выход').click()
        cy.get('.app-sign-in-register__content-inner').contains('Sign in to Jenkins').should('exist')
        cy.url().should('eq', 'http://localhost:8080/login?from=%2F')
    })
})