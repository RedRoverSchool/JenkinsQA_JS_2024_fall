/// <reference types="cypress" />
  
describe('US_00.001 | New item > Create Freestyle Project', () => {
    
    it('Create a new Freestyle Project using the "New Item" button from the Dashboard', () => {
        cy.get(':nth-child(1) > .task-link-wrapper > .task-link').first().click();
        cy.get('.jenkins-input').type('Sandra');
        cy.get('.label').first().click();
        cy.get('#ok-button').click();
        cy.get('.jenkins-submit-button').click();
        cy.get('h1').should('have.text', 'Sandra');
        cy.get('.model-link').should('contain', 'Sandra');
    });
    
    it('TC_00.001.02 | New item > Create Freestyle Project > Verify a new freestyle project can be created from the Dahsboard page', () => {
        
        const projectName = 'New Freestyle Project';

        cy.get('a[href$="/newJob"]').click();
        cy.get('input#name').type(projectName);
        cy.get('#items li[class$="FreeStyleProject"]').click();
        cy.get('button[id="ok-button"]').click();
        cy.get('button[name="Submit"]').click();

        cy.get('#main-panel h1').should('have.text', projectName);
    
    });

    it('TC_00.001.04 | New item > Create Freestyle Project > Verify a friendly reminder appeared when attempting to create a new Freestyle Project without a name', () => {
        
        const emptyFieldReminder = '» This field cannot be empty, please enter a valid name'

        cy.get('a[href$="/newJob"]').click();
        cy.get('#items li[class$="FreeStyleProject"]').click();
        cy.get('div[class$="validation-message"]').should('have.text', emptyFieldReminder);

    });
    
});