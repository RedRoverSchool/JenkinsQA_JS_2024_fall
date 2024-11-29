/// <reference types="cypress" />

class OrganizationFolderPage {

    getSaveButton = () => cy.get('button[name="Submit"]');
    getOKButton = () => cy.get('button').contains('Yes');
    getSideMenuDeleteLink = () => cy.get('[class="task "]').contains("Delete Organization Folder");
    getJobHeadline = () => cy.get('#main-panel h1');
    getBreadcrumbsFolderName = () => cy.get(':nth-child(3) > .model-link');
    getBreadcrumbsFolderDropdownMenu = () => cy.get(':nth-child(3) > .model-link > .jenkins-menu-dropdown-chevron');
    getDropdownMenuDeleteLink = () =>  cy.get('.jenkins-dropdown > [href$="elete"]');
    
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

    selectBreadcrumbsFolderDropdownMenu() {
        this.getBreadcrumbsFolderName().trigger('mouseover');
        return this;
    }

    clickBreadcrumbsFolderDropdownMenu() {
        this.getBreadcrumbsFolderDropdownMenu().click({force:true});
        return this; 
    }
    
    clickDropdownMenuDeleteLink() {
        this.getDropdownMenuDeleteLink().click();
        return this;
    }

}

export default OrganizationFolderPage;