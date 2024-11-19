/// <reference types="cypress"/>

describe('US_01.004 | FreestyleProject > Delete Project', ()=>{
    it('TC_00.001.04 A|FreestyleProject > Delete Project from the dashboard', () => {
        cy.get('span').contains('Create a job').click();
        cy.get('input[name="name"]').type('New Freestyle project');
        cy.get('span.label').contains('Freestyle project').click();
        cy.get('button').contains("OK").click();
        cy.get('button').contains("Save").click();
        cy.get('a').contains("Dashboard").click();
        cy.get('span').contains('New Freestyle project').scrollIntoView();
        cy.get('span').contains('New Freestyle project').realHover();
        cy.get('button[data-href="http://localhost:8080/job/New%20Freestyle%20project/"]').click();
        cy.get('button[href="/job/New%20Freestyle%20project/doDelete"]').click();
        cy.get('button.jenkins-button.jenkins-button--primary ').click();
        cy.get('#main-panel h1').should('have.text', "Welcome to Jenkins!");
    })
})