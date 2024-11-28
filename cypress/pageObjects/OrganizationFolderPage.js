/// <reference types="cypress" />

class OrganizationFolderPage {

    getConfigureNavBar = () => cy.get('a[href$="/configure"].task-link');
    getDisplayNameInput = () => cy.get('input[name="_.displayNameOrNull"]');
    getDescriptionInput = () => cy.get('textarea[name="_.description"]');
    getSaveBtn = () => cy.get('button[name="Submit"]');
    getDescription = () => cy.get("#view-message");
    getDisplayName = () => cy.get("h1");
    getFolderName = () => cy.get("#main-panel");

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

    clickSaveBtn() {
        this.getSaveBtn().click();
        return this;
    }

}

export default OrganizationFolderPage;