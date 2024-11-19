/// <reference types="cypress" />

describe('US_14.002 | Header > Search Box', () => {

    beforeEach(() => {
        cy.get('a.model-link').contains('Dashboard')
    })
    it('TC_14.002.01 | Auto-Completion Suggestion Selection', () => {
        cy.get('input[id="search-box"]').click().clear()
        .type('man')
        cy.get('li').contains('manage').click().should('be.visible')
    })
})