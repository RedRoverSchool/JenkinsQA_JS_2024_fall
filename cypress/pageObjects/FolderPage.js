/// <reference types="cypress" />
import DashboardPage from "./DashboardPage";
import Header from "./Header";

class FolderPage extends Header {
    getSaveBtn = () => cy.get(".jenkins-submit-button");
    getTitleConfiguration = () => cy.get("#side-panel h1");
    getFolderNameOnMainPanel = () => cy.get("#main-panel h1");
    getDashboardBreadcrumbsLink = () => cy.get('#breadcrumbs a[href="/"]');
    getNewItemMenuOption = () => cy.get('[href $= "/newJob"]');

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
 
};

export default FolderPage;