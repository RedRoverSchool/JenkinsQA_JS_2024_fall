/// <reference types="cypress"/>

describe('US_001|Delete a project', ()=>{
    it('TC-001-1|Create a project by clicking on "Create a job"', () => {
        cy.get('span').contains('Create a job').click();
        cy.wait(500);
        cy.get('input[name="name"]').type('New Freestyle project');
        cy.get('span.label').contains('Freestyle project').click();
        cy.get('button').contains("OK").click();
        cy.get('button').contains("Save").click();
        cy.get('h1').contains('New Freestyle project');
    })

    it('TC-001-1|Delete a project', ()=>{
        cy.get('span').contains('New Freestyle project').scrollIntoView();
        cy.get('span').contains('New Freestyle project').realHover();
        cy.get('button[data-href="http://localhost:8080/job/New%20Freestyle%20project/"]').click();
        cy.get('button[href="/job/New%20Freestyle%20project/doDelete"]').click();
        cy.get('button.jenkins-button.jenkins-button--primary ').click();
        cy.get('span').contains('New Freestyle project').should('not.exist');
        
    })   
})