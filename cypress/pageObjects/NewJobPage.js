/// <reference types="cypress" />

class NewJobPage {

    getJobNameField = () => cy.get('#name');
    getFreeStlPrjType = () => cy.get('.label').contains('Freestyle project');
    getOKButton = () => cy.get('#ok-button');
    getItemNameInvalidErrorMessage = () => cy.get("#itemname-invalid");
    getUnsaveItemInvalidName = () => cy.get("#itemname-invalid").contains(/is an unsafe character/);
    getEmptyItemInvalidName = () => cy.get("#itemname-required");
    getFolferType = () => cy.get('.label').contains('Folder');

    typeNewItemName (prjName) {
        this.getJobNameField().type(prjName);
        return this;
    }

    selectFreestyleProject () {
        this.getFreeStlPrjType().click();
        return this;
    }

    selectFolder () {
        this.getFolferType().click();
        return this;
    }

    clickOKButton () {
        this.getOKButton().click();
        return this;
    }

    addUnsaveNameItem () {
        this.getJobNameField().type("<");
        return this;
    }

    addEmptyNameItem () {
        this.getJobNameField().clear();
        return this;
    }

};

export default NewJobPage;