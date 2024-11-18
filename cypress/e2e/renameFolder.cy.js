/// <reference types="cypress"/>
const USERNAME = Cypress.env('local.admin.username');
const PASSWORD = Cypress.env('local.admin.password');
const LOCAL_PORT = Cypress.env('local.port');
const LOCAL_HOST = Cypress.env('local.host');

describe('Folder > Rename Folder', () => {
        it('Verify that error message is displayed when an invalid folder name is entered in the Rename Folder field', () => {
            cy.get('span').contains('New Item').click()
            cy.wait(1000)
            cy.get('input[name="name"]').clear()
            cy.get('input[name="name"]').type('Folder1')
            cy.get('.com_cloudbees_hudson_plugins_folder_Folder').click()
            cy.get('button').contains('OK').click()
            cy.get('button').contains('Save').click()
            cy.get('#jenkins-home-link').click()
            cy.get('[href="job/Folder1/"]').realHover({ position: 'center' })
            cy.get(`[data-href="http://${LOCAL_HOST}:${LOCAL_PORT}/job/Folder1/"]`).should('be.visible')
            cy.get(`[data-href="http://${LOCAL_HOST}:${LOCAL_PORT}/job/Folder1/"]`).click();
            cy.get('a[href="/job/Folder1/confirm-rename"]').click()
            cy.get('input[name="newName"]').clear()
            cy.get('input[name="newName"]').type('Folder*')
            cy.get('button[name="Submit"]').click()
            cy.get('div[id="main-panel"]').contains('Error')

       
});
})
