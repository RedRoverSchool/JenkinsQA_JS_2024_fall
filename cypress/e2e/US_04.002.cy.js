/// <reference types="cypress" />
const USERNAME = Cypress.env('local.admin.username');
const PASSWORD = Cypress.env('local.admin.password');
const LOCAL_PORT = Cypress.env('local.port');
const LOCAL_HOST = Cypress.env('local.host');


describe('Folder Movement Tests', () => {

    it('creates two folders', () => {
        cy.get('span').contains('New Item').click()
        cy.wait(1000)
        cy.get('input[name="name"]').clear()
        cy.get('input[name="name"]').type('Folder_01')
        cy.get('.com_cloudbees_hudson_plugins_folder_Folder').click()
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Save').click()
        cy.get('#jenkins-home-link').click()
        cy.get('span').contains('New Item').click()
        cy.wait(1000)
        cy.get('input[name="name"]').clear()
        cy.get('input[name="name"]').type('Folder_02')
        cy.get('.com_cloudbees_hudson_plugins_folder_Folder').click()
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Save').click()
    });


    it('Selects path to move a folder', () => {
        cy.get('[href="job/Folder_02/"]').realHover({ position: 'center' })
        cy.get(`[data-href="http://${LOCAL_HOST}:${LOCAL_PORT}/job/Folder_02/"]`).should('be.visible')
        cy.get(`[data-href="http://${LOCAL_HOST}:${LOCAL_PORT}/job/Folder_02/"]`).click();
        cy.get('[href="/job/Folder_02/move"]').should('be.visible')
        cy.get('[href="/job/Folder_02/move"]').click();
        cy.get('[name="destination"].select').should('be.visible')

        cy.get('[name="destination"].select')
            .find('option')
            .contains('Folder_01')
            .then(option => {
                cy.get('[name="destination"].select').select(option.val());
            });
        cy.wait(3000)
        cy.get('select[name="destination"]')
            .invoke('val')               
            .then(value => {
                console.log(value);       
                cy.log('Selected value:', value); 
                expect(value).to.include('Folder_01')
            });
        cy.get('[name="Submit"]').click();
    });

    it('Delete two folders', () => {
        cy.get('span').contains('Folder_01').scrollIntoView()
        cy.get('span').contains('Folder_01').realHover()
        cy.get('button[data-href="http://localhost:8080/job/Folder_01/"]').click()
        cy.get('button[href="/job/Folder_01/doDelete"]').click()
        cy.get('button.jenkins-button.jenkins-button--primary ').click()
        cy.get('span').contains('Folder_01').should('not.exist')

    });
})