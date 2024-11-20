/// <reference types="cypress" />

describe('US_00.001 | New item > Create Freestyle Project',() => {

    it('TC_00.001.11_A | Change Name',() => {
        cy.get('span').contains('New Item').click()
        cy.get('#name').click()
        cy.get('#name').type('Test Folder')
        cy.get('span.label').contains('Folder').click()
        cy.get('#ok-button').click()
        cy.get('input[name="_.displayNameOrNull"]').click()
        cy.get('input[name="_.displayNameOrNull"]').type('Folder Name')
        cy.get('textarea[name="_.description"]').click()
        cy.get('textarea[name="_.description"]').type('Description of The Folder')
        cy.get('button[name="Submit"]').click()
        cy.get('#view-message').should('have.text','Description of The Folder')
    })
})