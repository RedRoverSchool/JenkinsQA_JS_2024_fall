/// <reference types="cypress"/>
describe('createFreestyleProject.cy.js', ()=>{
    it('Create a new Freestyle Project using the "New Item" button from the Dashboard', () => {
        cy.get(':nth-child(1) > .task-link-wrapper > .task-link').first().click();
        cy.get('.jenkins-input').type('Sandra');
        cy.get('.label').first().click();
        cy.get('#ok-button').click();
        cy.get('.jenkins-submit-button').click();
        cy.get('h1').should('have.text', 'Sandra');
        cy.get('.model-link').should('contain', 'Sandra');
    });
    
});