/// <reference types="cypress" />

describe.skip('US_09.001 | Manage Jenkins > Search settings', () =>{
    it('TC_09.001.01 | "No results" searching', () => {
        cy.get('span.task-link-text').contains('Manage Jenkins')
        .click({force: true})
        cy.get('input.jenkins-search__input').should('be.visible')
        .click()
        .type('q')
        cy.get('p.jenkins-search__results__no-results-label').contains('No results').should('be.visible')
    })
})