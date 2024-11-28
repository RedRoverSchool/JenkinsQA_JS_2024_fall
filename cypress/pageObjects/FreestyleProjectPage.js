/// <reference types="cypress" />

import DashboardPage from "./DashboardPage";

class FreestyleProjectPage {

    getSaveButton = () => cy.get('button[name="Submit"]');
    getJobHeadline = () => cy.get("#main-panel h1");
    getJobDescription = () => cy.get('[id="description"]');
    getJobDescriptionField = () => cy.get('textarea[name="description"]');
    getDashboardBreadcrumbsLink = () => cy.get('#breadcrumbs a[href="/"]');
    getAddDescriptionButton = () => cy.get('[href="editDescription"]');
    getMoveMenuItem = () => cy.get('a[href$="/move"]');
    getProjectDestination = () => cy.get('select[name="destination"]');
    getMoveButton = () => cy.get('button[name="Submit"]');
    getProjectInfoSection = () => cy.get('#main-panel');
    getDashboardLink = () => cy.get('a[href="/"].model-link');
    getDeleteMenuItem = () => cy.get('a[data-title="Delete Project"]');
    getCancelButton = () => cy.get('button[data-id="cancel"]');

    clickSaveButton() {
        this.getSaveButton().click();
        return this;
    }

    typeJobDescription(jobDescription) {
        this.getJobDescriptionField().type(jobDescription);
        return this;
    }

    clickDashboardBreadcrumbsLink() {
        this.getDashboardBreadcrumbsLink().click();
        return new DashboardPage();
    }

    clickAddDescriptionButton() {
        this.getAddDescriptionButton().click();
        return this;
    }

    clickMoveMenuItem() {
        this.getMoveMenuItem().click();
        return this;
    }

    selectNewProjectDestination(movingDestination) {
        this.getProjectDestination().select(movingDestination);
        return this;
    }

    clickMoveButton() {
        this.getMoveButton().click();
        return this;
    }

    clickDeleteMenuItem() {
        this.getDeleteMenuItem().click()
        return this
    }

    clickCancelButton() {
        this.getCancelButton().click()
        return this
    }

}

export default FreestyleProjectPage;