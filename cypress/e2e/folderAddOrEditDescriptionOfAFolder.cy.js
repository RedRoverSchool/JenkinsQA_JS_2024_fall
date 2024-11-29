/// <reference types="cypress" />

describe('US_04.004 | Folder > Add or Edit Description of a Folder', () => {
    it('TC_04.004-01-A | Folder > Add or Edit Description of a Folder | Enter a description in a special field', () => {
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
        cy.get('#view-message').should('have.text', 'Description of The Folder')
    })
    it('TC_04.004-02  Folder > Add or Edit Description of a Folder | Edit existing description', () => {
        //Preconditions
        const folder1Name = "Folder1";
            cy.get('span').contains('New Item').click();
            cy.get('input[name="name"]').clear();
            cy.get('input[name="name"]').type(folder1Name);
            cy.get('#j-add-item-type-nested-projects .j-item-options li[class*="folder_Folder"]').click();
            cy.get('#ok-button').click();
            cy.get('.jenkins-submit-button').click();
            
            cy.get('a#description-link').click();
            cy.get('textarea.jenkins-input').type('Description of the folder');
            cy.get('button.jenkins-submit-button').click();
            cy.get('a#description-link').click();
            cy.get('textarea.jenkins-input').clear('Description of the folder').type('Updated description of the folder');
            cy.get('button.jenkins-submit-button').click;
            cy.get('div#description').should('be.visible', 'Updated description of the folder');
    });

    it('TC_04.004-03  Folder > Add or Edit Description of a Folder|Enter&Save description in a special field', () => {
        //Preconditions
        const folder1Name = 'Folder1';
            cy.get('span').contains('New Item').click();
            cy.get('input[name="name"]').clear();
            cy.get('input[name="name"]').type(folder1Name);
            cy.get('#j-add-item-type-nested-projects .j-item-options li[class*="folder_Folder"]').click();
            cy.get('#ok-button').click();

            cy.get('textarea.jenkins-input').type('This is the test description!');
            cy.get('a.textarea-show-preview').click();
            cy.get('div.textarea-preview').should('be.visible',"This is the test description!");
            cy.get('a.textarea-hide-preview').click();
            cy.get('.jenkins-submit-button').click();
            cy.get('div#view-message').should('have.text',"This is the test description!");
    });
})