/// <reference types="cypress" />

describe('US_14.002 | Header > Search Box', () => {
    
    it('TC_14.002-01-A | Header > Search Box | Dashboard page in Jenkins has a search box on its top right', () => {
        cy.get('#search-box').then($searchBar => {
            const rect = $searchBar[0].getBoundingClientRect();
            const windowWidth = Cypress.config('viewportWidth');
            expect(rect.top).to.be.closeTo(0, 10);
            expect(windowWidth - rect.right).to.be.closeTo(0, 347);
        });
    });
});