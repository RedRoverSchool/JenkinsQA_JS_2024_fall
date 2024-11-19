/// <reference types = "cypress" />

describe('US_06.005 | Organization folder > Delete Organization Folder', () => {
    const name = "New Folder";

    it('TC_06.005-01 | Delete Organization Folder on project page', () => {
        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('[name="name"]').type(`${name}`);
        cy.get('[class="jenkins_branch_OrganizationFolder"]').click();
        cy.get('[id="ok-button"]').click();
        cy.get('[name="Submit"]').click();
        cy.get('[id="main-panel"]').should('contain.text', `${name}`)

        cy.get('[class="task "]').contains("Delete Organization Folder").click();
        cy.get('button').contains('Yes').click();
        cy.get('h1').should('not.contain.text', `${name}`);
    });
});