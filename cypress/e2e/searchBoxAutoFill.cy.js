/// <reference types="cypress"/>
describe('US_14.002| Header > Search Box', ()=>{
    
    it('TC_14.002.15_A|Verify a User can select a suggestion to auto-fill the search box and complete the search', ()=>{
    cy.get(":nth-child(1) > .task-link-wrapper > .task-link").click();
    cy.get('input[id="name"]').type("New Folder TC_14.002.15_A");
    cy.get(".com_cloudbees_hudson_plugins_folder_Folder").click();
    cy.get("#ok-button").contains("OK").click();
    cy.get(".jenkins-submit-button").click();
    cy.get('span.task-link-text').contains('New Item').click({force:true})
    cy.get('input[id="name"]').type("Project TC_14.002.15_A");
    cy.get('.org_jenkinsci_plugins_workflow_job_WorkflowJob > :nth-child(2) > .desc').click()
    cy.get('#ok-button').contains("OK").click();
    cy.get(".jenkins-submit-button").click({force:true});
    cy.get("#jenkins-name-icon").click();
    cy.get('#search-box').type('Pro')
    cy.get('#search-box-completion').contains("Project TC_14.002.15_A").click()
    cy.get('#search-box').type('{enter}')
    cy.get('.job-index-headline').should('have.text', 'Project TC_14.002.15_A')
    })
})
