/// <reference types="cypress" />
import Header from "./Header";

class FolderPage extends Header {
    getSaveBtn = () => cy.get(".jenkins-submit-button");
    getTitleConfiguration = () => cy.get("#side-panel h1");
    getFolderNameOnMainPanel = () => cy.get("#main-panel h1");

    clickSaveBtn () {
        this.getSaveBtn().click();
        return this;
    }

    verifyTitleConfigurationIsVisible () {
        this.getTitleConfiguration()
            .should('be.visible');
        return this;
    }
};

export default FolderPage;