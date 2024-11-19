/// <reference types="cypress" />
  
describe('US_00.002 | New Item > Create Pipeline Project #14', () => {
    it('Create a new Pipeline Project using the "New Item" button from the Dashboard', () => {
        let projectname ='PipelineProject1'
        cy.get('.task-link-text').contains('New Item').click({ force: true });
        cy.get('#name').type(projectname);
        cy.get('.label').contains('Pipeline').click();
        cy.get('#ok-button').click();
        cy.url().should('include', projectname); 
        cy.get('button[name="Submit"]').click();
        cy.get('.model-link').click();
        cy.get('.jenkins-table__link > span').should('have.text',projectname);
        cy.get('a[href="job/PipelineProject1/"]').realHover();
        cy.get('button.jenkins-menu-dropdown-chevron:first-child').click({force:true});
        cy.get(`button[data-href*="/job/${projectname}"]`).click();
        cy.get(`button[href="/job/${projectname}/doDelete"]`).click();
        cy.get('button[data-id="ok"]').click()
    })})