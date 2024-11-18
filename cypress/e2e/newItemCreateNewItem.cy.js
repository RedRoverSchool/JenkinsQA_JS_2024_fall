/// <reference types="cypress" />
describe('US_00.000 | New Item > Create New item', () => {
    const jobName = 'Item_1'
    const sidebarJobName = 'Item_2'
    const LOCAL_PORT = Cypress.env('local.port');
    const LOCAL_HOST = Cypress.env('local.host');

    it('TC_00.000-02 | New Item > Create New item | Create new item from "Create a job" button', () => {
        cy.get('span').contains('jobName').should('not.exist')
        cy.get('a[href="newJob"]').contains('Create a job').click()
        cy.get('input#name.jenkins-input').type(jobName)
        cy.get('.desc').eq(0).click()
        cy.get('#ok-button').click()
        cy.get('a#jenkins-home-link').click()
        cy.get('table.jenkins-table.sortable').contains(jobName).should('exist')
    })

    it('TC_00.000-04 | New Item > Create New item | New item from left Sidebar', () => {
        cy.get('span').contains('New Item').click()
        cy.get('input#name').type(sidebarJobName)
        cy.get('span.label').contains('Freestyle project').click();
        cy.get('button#ok-button').click()
        cy.get('button[name="Submit"]').click()
        cy.get('.job-index-headline')
            .should('contain.text', sidebarJobName)
            .should('be.visible')
        cy.url()
            .should('eq', `http://${LOCAL_HOST}:${LOCAL_PORT}/job/${sidebarJobName}/`);
    })
})