/// <reference types="cypress"/>

describe('US_04.001|Folder > Rename Folder', ()=>{

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
