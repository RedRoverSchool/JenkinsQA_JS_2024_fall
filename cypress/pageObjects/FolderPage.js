/// <reference types="cypress" />

import DashboardPage from "./DashboardPage";
import Header from "./Header";
import NewJobPage from "./NewJobPage";

class FolderPage extends Header {
    getSaveBtn = () => cy.get(".jenkins-submit-button");
    getTitleConfiguration = () => cy.get("#side-panel h1");
    getFolderNameOnMainPanel = () => cy.get("#main-panel h1");
    getDashboardBreadcrumbsLink = () => cy.get('#breadcrumbs a[href="/"]');
    getNewItemMenuOption = () => cy.get('[href $= "/newJob"]');
    getNewNameField = () => cy.get('input[name="newName"]');
    getFolderUrl = () => cy.url({ decode: true });
    getProjectName = () => cy.get('*.jenkins-table__link span');
    getCreateAJobLink = () => cy.get('a[href="newJob"]');
    getDescriptionField = () => cy.get('[name$="description"]');
    getFolderDescription = () => cy.get('#view-message');


    clickSaveBtn () {
        this.getSaveBtn().click();
        return this;
    }

    verifyTitleConfigurationIsVisible () {
        this.getTitleConfiguration()
            .should('be.visible');
        return this;
    }

    clickDashboardBreadcrumbsLink () {
        this.getDashboardBreadcrumbsLink().click();
        return new DashboardPage();
    }

    clickNewItemMenuOption () {
        this.getNewItemMenuOption().click();
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
        this.getDescriptionField().type(description);
            return this;
        };
 
};

export default FolderPage;