/// <reference types="cypress" />
describe('New Item > Create Pipeline Project', () => {
    const newItemName = 'New Item Name';
    it('Pipeline item type is highlighted when selected', () => {
        cy.get('span').contains('New Item').click()
        cy.get('input#name').type(newItemName)
        cy.get('span.label').contains('Pipeline').click();
        cy.get('.org_jenkinsci_plugins_workflow_job_WorkflowJob')
            .should('have.attr', 'aria-checked', 'true');
    })
})