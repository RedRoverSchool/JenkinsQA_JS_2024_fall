/// <reference types="cypress"/>

describe('Freestyle project Delete', () => {
    beforeEach('Create freestyle project', () => {
      cy.get('a[href="newJob"]').click()
      cy.get('#name').type("new_Freestyle_project")
      cy.get('.hudson_model_FreeStyleProject').click()
      cy.get('#ok-button').click()
      cy.get('button[name="Submit"]').click()
    
    })

    it('Freestyle project |Delete Project on Project Page', () => {
        cy.get('a[data-title="Delete Project"]').should('be.visible').click();
        cy.on('window:confirm', (str) => {
            
            expect(str).to.equal('Your confirmation message text here');
            return true; 
            
        });
        cy.wait(4000);
        cy.get('.jenkins-button.jenkins-button--primary ').click();
        cy.get('span').contains('new_Freestyle_project').should('not.exist');
//         cy.get('dialog[open]').debug(); // Check if the dialog is present
// cy.get('dialog[open] button[data-id="ok"]').debug().click(); // Debug the button before clicking
// //
    
    //cy.get('dialog[open] button[data-id="ok"]').debug().should('be.visible').click()
        //cy.get('button[data-id="ok"]').should('contain','yes').should('be.visible').click({ force: true });
    });
})
