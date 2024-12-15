/// <reference types="cypress" />
import BasePage from "./basePage";
import NewJobPage from "./NewJobPage";

class FolderPage extends BasePage {

    getTitleConfiguration = () => cy.get("#side-panel h1");
    getFolderNameOnMainPanel = () => cy.get("#main-panel");
    getDashboardBreadcrumbsLink = () => cy.get('#breadcrumbs a[href="/"]');
    getNewItemMenuOption = () => cy.get('[href $= "/newJob"]');

    getNewNameField = () => cy.get('input[name="newName"]');
    getFolderUrl = () => cy.url({ decode: true });
    getItemName = () => cy.get('*.jenkins-table__link span');
    getCreateAJobLink = () => cy.get('a[href="newJob"]');
    getDisplayNameField = () => cy.get('input[class="jenkins-input validated  "]');
    getDescriptionField = () => cy.get('[name$="description"]');
    getFolderDescription = () => cy.get('#view-message');
    getDisplayNameTooltip = () => cy.get('[tooltip="Help for feature: Display Name"]');

    verifyTitleConfigurationIsVisible () {
        this.getTitleConfiguration()
            .should('be.visible');
        return this;
    }

    clearNewNameField () {
        this.getNewNameField().clear();
        return this;
    }

    typeNewFolderName (newFolderName) {
        this.getNewNameField().type(newFolderName);
        return this;
    }   

    verifyFolderUrl(folderName) {
        this.getFolderUrl().should('contain', folderName)
    }

    clickCreateAJobLink () {
        this.getCreateAJobLink().click()
        return new NewJobPage();
    }

    typeDescription (description) {
        this.getDescriptionField().type(description, {delay: 0});
        return this;
    };

    clickItemName (itemName) {
        this.getItemName().contains(itemName).click();
        return this;
    }

    typeDisplayName (displayName) {
        this.getDisplayNameField().type(displayName);
        return this;
    }
};

export default FolderPage;