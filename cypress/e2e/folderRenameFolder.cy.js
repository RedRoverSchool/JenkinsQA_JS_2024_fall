/// <reference types="cypress" />
const USERNAME = Cypress.env('local.admin.username');
const PASSWORD = Cypress.env('local.admin.password');
const LOCAL_PORT = Cypress.env('local.port');
const LOCAL_HOST = Cypress.env('local.host');


describe('US_04.001 | Folder > Rename Folder', () => {
    it('TC_04.001.06 | Folder > Rename Folder | Successfully enter a valid folder name in the special field', () => {
        //preconditions
        cy.get('span').contains('New Item').click()
        cy.get('input[name="name"]').clear()
        cy.get('input[name="name"]').type('Test Folder')
        cy.get('.com_cloudbees_hudson_plugins_folder_Folder').click()
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Save').click()
        cy.get('div[id="breadcrumbBar"]').contains('Test Folder').should('exist');
        cy.visit(`${LOCAL_HOST}:${LOCAL_PORT}`);
        //steps
        cy.get('[href="job/Test%20Folder/"]').realHover();
        cy.get('[href="job/Test%20Folder/"] .jenkins-menu-dropdown-chevron').click();
        cy.get('.jenkins-dropdown__item[href="/job/Test%20Folder/confirm-rename"]').click();
        cy.get('[checkdependson="newName"]').click();
        cy.get('[checkdependson="newName"]').type(' 1219').should('have.value', 'Test Folder 1219'); 
    })

    it('TC_04.001.07 | Folder > Rename Folder Enter a folder name in a non-Latin language', () => {
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
        .then((text) =>{
            expect(text.trim()).to.eq('Тестовая 日本語 中文');
        })
        cy.get('[data-title="Delete Folder"]').click();
        cy.get('[data-id="ok"]').click();
    });

    it('TC_04.001.08 | Folder > Rename Folder | Enter a valid folder name with numbers and allowed special characters', () => {
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
        cy.get('[checkdependson="newName"]').type('Test_Folder7+').should('have.value', 'Test_Folder7+');
        cy.get('[formnovalidate="formNoValidate"]').click();
        cy.get('h1').invoke('text')
        .then((text) =>{
            expect(text.trim()).to.eq('Test_Folder7+');
        })
    

    it('TC_04.001-05|Folder > Rename Folder|Rename folder on the folder page', ()=>{
        cy.contains('New Item').click()
        cy.get('#name').type('NewFolder')
        cy.get('span').contains('Folder').click()
        cy.get('#ok-button').click()
        cy.get('button').contains('Save').click()
        cy.get('span').contains('Rename').click()
        cy.get('input[name ="newName"]').clear()
        cy.get('input[name ="newName"]').type('Folder1')
        cy.get('button[name="Submit"]').click()
        cy.url().should('include', 'Folder1')
            })
        })
