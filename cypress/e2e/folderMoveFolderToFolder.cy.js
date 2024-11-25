// <reference types="cypress"/>
describe('US_04.002|Folder > Move Folder to Folder', () => {

  it('TC_04.002-01A |Folder > Move Folder to Folder', () => {
    const folder1Name = "Folder1";
    const folder2Name = "Folder2";
        cy.get('span').contains('New Item').click();
        cy.get('input[name="name"]').clear();
        cy.get('input[name="name"]').type(folder1Name);
        cy.get('#j-add-item-type-nested-projects .j-item-options li[class*="folder_Folder"]').click();
        cy.get('#ok-button').click();
        cy.get('.jenkins-submit-button').click();
        cy.get('#jenkins-home-link').click();

        cy.get('span').contains('New Item').click();
        cy.get('input[name="name"]').clear();
        cy.get('input[name="name"]').type(folder2Name);
        cy.get('#j-add-item-type-nested-projects .j-item-options li[class*="folder_Folder"]').click();
        cy.get('#ok-button').click();
        cy.get('.jenkins-submit-button').click();       
        cy.get('#jenkins-home-link').click();
        
        cy.get(`a[href="job/${folder2Name}/"]`).realHover();
        cy.get(`a[href="job/${folder2Name}/"] .jenkins-menu-dropdown-chevron`).click();        
        cy.get(`a[href="/job/${folder2Name}/move"]`).click();
        cy.get('.select').select(`/${folder1Name}`);
        cy.get('.jenkins-submit-button').click();
        cy.get('li:nth-child(5) a').should('have.attr', 'href', `/job/${folder1Name}/job/${folder2Name}/`);
  })
  
})
