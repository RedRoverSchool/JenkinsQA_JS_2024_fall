/// <reference types="cypress" />

describe('US_00.001 | New item > Create Freestyle Project', () => {

    it('TC_00.001.02 | New item > Create Freestyle Project > Verify a new freestyle project can be created from the Dahsboard page', () => {
        
        const projectName = 'New Freestyle Project';

        cy.get('a[href$="/newJob"]').click();
        cy.get('input#name').type(projectName);
        cy.get('#items li[class$="FreeStyleProject"]').click();
        cy.get('button[id="ok-button"]').click();
        cy.get('button[name="Submit"]').click();

        cy.get('#main-panel h1').should('have.text', projectName);

    });
    
});