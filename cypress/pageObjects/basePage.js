/// <reference types="cypress" />
import Header from "../pageObjects/Header";

class BasePage extends Header {

    getNewItemMenuOption = () => cy.get('[href $= "/newJob"]');
    getMoveMenuItem = () => cy.get('a[href$="/move"]');//please rename to getMoveMenuOption
    getRenameMenuOption = () => cy.get('[href*="rename"]');
    getBuildNowMenuOption = () => cy.contains('a[href*="build"]',"Build Now");
    getNewItemLink = () => cy.get('a[href="/view/all/newJob"]');//please delete as duplicate for getNewItemMenuOption
    getConfigureLink = () => cy.get('#side-panel [href$="configure"]');//please rename to getConfigureMenuOption

    getMoveButton = () => cy.findByRole('button',{ name: /Move/ });
    getYesButton = () => cy.findByRole('button',{ name: /Yes/ });
    getSaveButton = () => cy.findByRole('button',{ name: /Save/ });
    getRenameButton = () => cy.get('button.jenkins-submit-button');
    getCancelButton = () => cy.findByRole('button',{ name: /Cancel/ });
    getOKButton = () => cy.findByRole('button',{ name: /OK/ });//y.get('#ok-button').contains('OK');

    getJobHeadline = () => cy.get("#main-panel h1");// please rename to getItemTitle since we have it in multiple places

    
    clickNewItemMenuOption () {
        this.getNewItemMenuOption().click();
        return this;
    }

    clickNewItemMenuLink () {//please delete as duplicate to clickNewItemMenuOption, make sure to replase all
        this.getNewItemLink().click({ force: true });
        return this;
    }

    clickMoveMenuOption () {
        this.getMoveMenuItem().click();
        return this;
    }

    clickRenameMenuOption () {
        this.getRenameMenuOption().click();
        return this;
    }

    clickBuildNowMenuOption () {
        this.getBuildNowMenuOption().click();
        return this;
    }

    clickConfigureLMenuOption () {
        this.getConfigureLink().click();
        return this;
    }

    clickSaveButton () {
        this.getSaveButton().click();
        return this;
    }

    clickYesButton () {
        this.getYesButton().click();
        return this;
    }

    clickOKButton () {
        this.getOKButton().click();
        return this;
    }

    clickRenameButton () {
        this.getRenameButton().click();
        return this;
    }

    clickMoveButton () {
        this.getMoveButton().click();
        return this;
    }

    clickCancelButton () {
        this.getCancelButton().click();
        return this;
    }
}
export default BasePage;