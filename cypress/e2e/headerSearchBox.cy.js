/// <reference types="cypress" />

describe('US_14.002 | Header > Search Box', () => {
    
    it('TC_14.002-06-A | Header > Search Box | If there are multiple matches, the result page displays all matches', () => {
      cy.get('#search-box').clear().type('conf{enter}'); 
      cy.url().should('include', '/search');
      cy.get('.yui-ac-content').its('length').should('be.greaterThan', 0);
      cy.get('#item_config').should('contain.text', 'config');
      cy.get('#item_configure').should('contain.text', 'configure');
    })
})