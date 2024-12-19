/// <reference types="cypress" />
import BasePage from "./basePage";
import DashboardPage from "./DashboardPage";
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
    getMoveDestinationDropDownList = () => cy.get('select');
    getMoveButton = () => cy.get('form > .jenkins-button');
    getJobTitleLink = () => cy.get(".model-link.inside");
    getDisplayNameTooltip = () => cy.get('[tooltip="Help for feature: Display Name"]');
    getDeleteFolderFromMenu = () => cy.get('a[data-title="Delete Folder"]')
    getYesOptionInPopUpWindow = () => cy.get('.jenkins-button--primary')


    verifyTitleConfigurationIsVisible() {
        this.getTitleConfiguration()
            .should('be.visible');
        return this;
    }

    clearNewNameField() {
        this.getNewNameField().clear();
        return this;
    }

    typeNewFolderName(newFolderName) {
        this.getNewNameField().type(newFolderName);
        return this;
    }

    verifyFolderUrl(folderName) {
        this.getFolderUrl().should('contain', folderName)
    }

    clickCreateAJobLink() {
        this.getCreateAJobLink().click()
        return new NewJobPage();
    }

    typeDescription(description) {
        this.getDescriptionField().type(description, { delay: 0 });
        return this;
    };

    clickItemName(itemName) {
        this.getItemName().contains(itemName).click();
        return this;
    }

    clickFolderMoveDestinationDropdownList(ddOption) {
        this.getMoveDestinationDropDownList().select(ddOption);
        return this;
    }

    clickMoveButton() {
        this.getMoveButton().click();
        return this;
    }

    verifyFolderIsVisible() {
        this.getJobTitleLink();
        return this
    }

    typeDisplayName(displayName) {
        this.getDisplayNameField().type(displayName);
        return this;
    }

    clickDeleteFolderFromMenu() {
        this.getDeleteFolderFromMenu().click();
        return this;
    }

    clickYesOptionInPopUpWindow() {
        this.getYesOptionInPopUpWindow().click();
        return new DashboardPage();
    }

};

export default FolderPage;