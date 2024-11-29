/// <reference types="cypress" />

class OrganizationFolderPage {

    getSaveButton = () => cy.get('button[name="Submit"]');
    getOKButton = () => cy.get('button').contains('Yes');
    getSideMenuDeleteLink = () => cy.get('[class="task "]').contains("Delete Organization Folder");
    getJobHeadline = () => cy.get('#main-panel h1');
    

    clickSaveButton() {
        this.getSaveButton().click();
        return this;
    }

    clickOKButton() {
        this.getOKButton().click();
        return this;
    }

    clickSideMenuDeleteLink() {
        this.getSideMenuDeleteLink().click();
        return this;
    }

}

export default OrganizationFolderPage;