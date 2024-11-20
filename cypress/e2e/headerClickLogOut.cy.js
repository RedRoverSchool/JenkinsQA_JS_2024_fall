/// <reference types="cypress"/>
describe('US_14.003| Header > Click Log out', () => {
    it('TC_14.003.01| Header > Click Log out|Log out from Jenkins', () => {
        cy.get('[href="/logout"]').should('be.visible')
        cy.get('[href="/logout"] > .hidden-xs').click()
        cy.get('.app-sign-in-register__content-inner').contains('Sign in to Jenkins').should('exist')
        cy.url().should('eq', 'http://localhost:8080/login?from=%2F')
    })

    it('TC_14.003.02-A | Verify Log out button is seen and works properly.', () => {
        cy.get('a[href="/logout"]').click();

        cy.get('#main-panel h1').should('be.visible').and('have.text', 'Sign in to Jenkins');
    });
})