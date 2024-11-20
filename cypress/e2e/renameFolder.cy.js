/// <reference types="cypress" />
const USERNAME = Cypress.env('local.admin.username');
const PASSWORD = Cypress.env('local.admin.password');
const LOCAL_PORT = Cypress.env('local.port');
const LOCAL_HOST = Cypress.env('local.host');

describe('Folder > Rename Folder', () => {

    it('Successfully enter a valid folder name in the special field', () => {
        //preconditions
        cy.get('span').contains('New Item').click();
        cy.get('input[name="name"]').clear();
        cy.get('input[name="name"]').type('Test Folder');
        cy.get('.com_cloudbees_hudson_plugins_folder_Folder').click();
        cy.get('button').contains('OK').click();
        cy.get('button').contains('Save').click();
        cy.get('div[id="breadcrumbBar"]').contains('Test Folder').should('exist');
        cy.visit(`${LOCAL_HOST}:${LOCAL_PORT}`);
        //steps
        cy.get('[href="job/Test%20Folder/"]').realHover();
        cy.get('[href="job/Test%20Folder/"] .jenkins-menu-dropdown-chevron').click();
        cy.get('.jenkins-dropdown__item[href="/job/Test%20Folder/confirm-rename"]').click();
        cy.get('[checkdependson="newName"]').click();
        cy.get('[checkdependson="newName"]').type(' 1219').should('have.value', 'Test Folder 1219');
    });

    it('Enter a folder name in a non-Latin language', () => {
        //preconditions
        cy.get('span').contains('New Item').click();
        cy.get('input[name="name"]').clear();
        cy.get('input[name="name"]').type('Test Folder');
        cy.get('.com_cloudbees_hudson_plugins_folder_Folder').click();
        cy.get('button').contains('OK').click();
        cy.get('button').contains('Save').click();
        cy.get('div[id="breadcrumbBar"]').contains('Test Folder').should('exist');
        cy.visit(`${LOCAL_HOST}:${LOCAL_PORT}`);
        //steps
        cy.get('[href="job/Test%20Folder/"]').realHover();
        cy.get('[href="job/Test%20Folder/"] .jenkins-menu-dropdown-chevron').click();
        cy.get('.jenkins-dropdown__item[href="/job/Test%20Folder/confirm-rename"]').click();
        cy.get('[checkdependson="newName"]').click().clear();
        cy.get('[checkdependson="newName"]').type('Тестовая 日本語 中文').should('have.value', 'Тестовая 日本語 中文');
        // Folders with Japanese characters are not automatically deleted through cleanData. 
        // manually deleting the folder.
        cy.get('[formnovalidate="formNoValidate"]').click();
        cy.get('h1').invoke('text')
            .then((text) => {
                expect(text.trim()).to.eq('Тестовая 日本語 中文');
            })
        cy.get('[data-title="Delete Folder"]').click();
        cy.get('[data-id="ok"]').click();
    });

    
})

