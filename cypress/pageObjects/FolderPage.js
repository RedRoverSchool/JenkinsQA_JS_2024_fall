/// <reference types="cypress" />
import Header from "./Header";

class FolderPage extends Header {
    getSaveBtn = () => cy.get(".jenkins-submit-button");
    getTitleConfiguration = () => cy.get("#side-panel h1");
    getFolderNameOnMainPanel = () => cy.get("#main-panel h1");
    getNewItemMenuOption = () => cy.get('[href $= "/newJob"]');
    getProjectName = () => cy.get('.jenkins-table__link > span');

    clickSaveBtn () {
        this.getSaveBtn().click();
        return this;
    }

    verifyTitleConfigurationIsVisible () {
        this.getTitleConfiguration()
            .should('be.visible');
        return this;
    }

    clickNewItemMenuOption () {
        this.getNewItemMenuOption().click();
        return this;
    }
};

export default FolderPage;