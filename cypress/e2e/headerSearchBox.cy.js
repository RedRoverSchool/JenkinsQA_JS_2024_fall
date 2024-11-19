/// <reference types="cypress" />

describe('US_14.002 | Header > Search Box', () => {

    beforeEach(() => {
        cy.get('a.model-link').contains('Dashboard')
        cy.get('input[id="search-box"]').should('be.visible')
    })
    it('TC_14.002.01 | Auto-Completion Suggestion Selection', () => {
        cy.get('input[id="search-box"]').click().clear()
        .type('Manage{enter}')
        cy.url().should('include', 'manage')
    })
})