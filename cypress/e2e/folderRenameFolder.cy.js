/// <reference types="cypress"/>

describe('US_04.001 |Folder > Rename Folder', () => {
    it('Verify that error message is displayed when an invalid folder name is entered in the Rename Folder field', () => {
        cy.get('span').contains('New Item').click()
        cy.get('input[name="name"]').type('Folder*')
        cy.get('div[id="itemname-invalid"]').should('contain', "is an unsafe character")
    });
});