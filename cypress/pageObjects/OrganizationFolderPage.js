/// <reference types="cypress" />
import FolderPage from "../pageObjects/FolderPage";

class OrganizationFolderPage extends FolderPage {

    getSideMenuDeleteLink = () => cy.get('[class="task "]').contains("Delete Organization Folder");
    getDropdownMenuDeleteLink = () => cy.get('.jenkins-dropdown > [href$="elete"]');
    getDisplayNameInput = () => cy.get('input[name="_.displayNameOrNull"]');//please review locators we have in FreestyleProject for desription, and if it duplicates, please delete this
    getDescriptionInput = () => cy.get('textarea[name="_.description"]');//please review locators we have in FreestyleProject for desription, and if it duplicates, please delete this
    getDescription = () => cy.get("#view-message");//please review locators we have in FreestyleProject for desription, and if it duplicates, please delete this
    getDisplayName = () => cy.get("h1");
    getFolderName = () => cy.get("#main-panel");


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
    
    clickDropdownMenuDeleteLink() {//please rename to clickDeleteDropdownOption
        this.getDropdownMenuDeleteLink().click();
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