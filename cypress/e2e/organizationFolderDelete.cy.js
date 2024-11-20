/// <reference types = "cypress" />

describe('US_06.005 | Organization folder > Delete Organization Folder', () => {
    const name = "New Folder";
    beforeEach(() => {
        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('[name="name"]').type(name);
        cy.get('[class="jenkins_branch_OrganizationFolder"]').click();
        cy.get('[id="ok-button"]').click();
        cy.get('[name="Submit"]').click();
        cy.get('[id="main-panel"]').should('contain.text', name);
    });

    it('TC_06.005-01 | Delete Organization Folder on project page', () => {
        cy.get('[class="task "]').contains("Delete Organization Folder").click();
        cy.get('button').contains('Yes').click();
        
        cy.get('[id="main-panel"]').should('not.contain.text', name);
    });

    it('TC_06.005-02 | Delete Organization Folder via folder dropdown menu under the header', () => {
        cy.get(':nth-child(3) > .model-link').contains(name).trigger('mouseover');
        cy.get(':nth-child(3) > .model-link > .jenkins-menu-dropdown-chevron').click({force:true});
        cy.get('.jenkins-dropdown > [href$="elete"]').click();
        cy.get('button').contains('Yes').click();
 
        cy.get('[id="main-panel"]').should('not.contain.text', name);
    });

    it('TC_06.005-03 | Delete Organization Folder from the list of folders on the Dashboard main page', () => {
        cy.get('[id="jenkins-home-link"]').click();
        cy.get('.jenkins-table__link').contains(name).trigger('mouseover');
        cy.get('.jenkins-table__link > .jenkins-menu-dropdown-chevron').click({force:true});
        cy.get('.jenkins-dropdown > [href$="elete"]').click();
        cy.get('button').contains('Yes').click();
 
        cy.get('[id="main-panel"]').should('not.contain.text', name);
    });
});