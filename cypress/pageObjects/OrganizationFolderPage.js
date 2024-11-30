/// <reference types="cypress" />

class OrganizationFolderPage {

 
    getSaveButton = () => cy.get('button[name="Submit"]');
    getOKButton = () => cy.get('button').contains('Yes');
    getSideMenuDeleteLink = () => cy.get('[class="task "]').contains("Delete Organization Folder");
    getJobHeadline = () => cy.get('#main-panel h1');
    getBreadcrumbsFolderName = () => cy.get(':nth-child(3) > .model-link');
    getBreadcrumbsFolderDropdownMenu = () => cy.get(':nth-child(3) > .model-link > .jenkins-menu-dropdown-chevron');
    getDropdownMenuDeleteLink = () =>  cy.get('.jenkins-dropdown > [href$="elete"]');
    getConfigureNavBar = () => cy.get('a[href$="/configure"].task-link');
    getDisplayNameInput = () => cy.get('input[name="_.displayNameOrNull"]');
    getDescriptionInput = () => cy.get('textarea[name="_.description"]');
    getDescription = () => cy.get("#view-message");
    getDisplayName = () => cy.get("h1");
    getFolderName = () => cy.get("#main-panel");
    
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

    clickConfigureNavBar() {
        this.getConfigureNavBar().click();
        return this;
    }

    typeDisplayName = (displayName) => {
        this.getDisplayNameInput().type(displayName);
        return this;
    };
    
    typeDescription = (description) => {
        this.getDescriptionInput().type(description);
        return this;
    };

}

export default OrganizationFolderPage;