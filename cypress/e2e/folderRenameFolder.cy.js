/// <reference types="cypress"/>
const LOCAL_PORT = Cypress.env('local.port');
const LOCAL_HOST = Cypress.env('local.host');

describe('Folder > Rename Folder', () => {
    it('US_04.001 |Verify to rename the folder from drop-down menu of the folder element in the breadcrumbs', () => {
        cy.get('span').contains('New Item').click()
        cy.wait(1000)
        cy.get('input[name="name"]').clear()
        cy.get('input[name="name"]').type('Folder')
        cy.get('.com_cloudbees_hudson_plugins_folder_Folder').click()
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Save').click()
        cy.get('div[id="breadcrumbBar"]').contains('Folder')
        cy.get('a[href="/job/Folder/"]').realHover()
        cy.get(`[data-href="http://${LOCAL_HOST}:${LOCAL_PORT}/job/Folder/"]`).should('be.visible')
        cy.get(`button[data-href="http://${LOCAL_HOST}:${LOCAL_PORT}/job/Folder/"]`).click()
        cy.get('a[href="/job/Folder/confirm-rename"]').eq(0).click()
        cy.get('input[name="newName"]').clear()
        cy.get('input[name="newName"]').type('Folder2')
        cy.get('button[name="Submit"]').click()
        cy.get('div[id="main-panel"]').contains('Folder2')

    });
})
