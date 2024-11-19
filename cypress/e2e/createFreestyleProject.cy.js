/// <reference types="cypress" />

const projectName = 'New Freestyle Project';
const projectDescription = 'New Freestyle Project Description';
const folderName = 'New Folder';
  
describe('US_00.001 | New item > Create Freestyle Project', () => {
    
    it('TC_00.001.03 | Create a new Freestyle Project using the "New Item" button from the Dashboard', () => {
        cy.get(':nth-child(1) > .task-link-wrapper > .task-link').first().click();
        cy.get('.jenkins-input').type('Sandra');
        cy.get('.label').first().click();
        cy.get('#ok-button').click();
        cy.get('.jenkins-submit-button').click();
        cy.get('h1').should('have.text', 'Sandra');
        cy.get('.model-link').should('contain', 'Sandra');
    });
    
    it('TC_00.001.02 | Verify a new freestyle project can be created from the Dahsboard page', () => {

        cy.get('a[href$="/newJob"]').click();
        cy.get('input#name').type(projectName);
        cy.get('#items li[class$="FreeStyleProject"]').click();
        cy.get('button[id="ok-button"]').click();
        cy.get('button[name="Submit"]').click();

        cy.get('#main-panel h1').should('have.text', projectName);
    
    });

    it('TC_00.001.04 | Verify a friendly reminder appeared when attempting to create a new Freestyle Project without a name', () => {
        
        const emptyFieldReminder = '» This field cannot be empty, please enter a valid name'

        cy.get('a[href$="/newJob"]').click();
        cy.get('#items li[class$="FreeStyleProject"]').click();
        
        cy.get('div[class$="validation-message"]').should('have.text', emptyFieldReminder);

    });

    it('TC_00.001.05 | Verify a description can be added when creating a new Freestyle Project', () => {
        
        cy.get('a[href$="/newJob"]').click();
        cy.get('input#name').type(projectName);
        cy.get('#items li[class$="FreeStyleProject"]').click();
        cy.get('button[id="ok-button"]').click();
        cy.get('textarea[name="description"]').type(projectDescription);
        cy.get('button[name="Submit"]').click();

        cy.get('div#description').should('have.text', projectDescription);

    });

    it('TC_00.001.06 | Verify a new Freestyle Project can be created from a new Folder', () => {
        
        cy.get('a[href$="/newJob"]').click();
        cy.get('input#name').type(folderName);
        cy.get('#items li[class$="_Folder"]').click();
        cy.get('button[id="ok-button"]').click();
        cy.get('button[name="Submit"]').click();
        cy.get('a[href="newJob"]').click();
        cy.get('input#name').type(projectName);
        cy.get('#items li[class$="FreeStyleProject"]').click();
        cy.get('button[id="ok-button"]').click();
        cy.get('button[name="Submit"]').click();

        cy.get('#main-panel h1').should('have.text', projectName);
        cy.get('#main-panel').should('include.text', `${folderName}/${projectName}`);

    });

    it('TC_00.001-08 | Friendly messages are shown', () =>{
        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('.hudson_model_FreeStyleProject').click();

        cy.get('#itemname-required').should('be.visible').and('have.text', '» This field cannot be empty, please enter a valid name');
        cy.get('#ok-button').should('be.disabled');
    });

});