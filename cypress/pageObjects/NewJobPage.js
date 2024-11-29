/// <reference types="cypress" />

class NewJobPage {

    getJobNameField = () => cy.get('#name');
    getFreeStlPrjType = () => cy.get('.label').contains('Freestyle project');
    getPipelinePrjType = () => cy.get('span.label').contains('Pipeline');
    getPipelineSelectedState = () => cy.get('.org_jenkinsci_plugins_workflow_job_WorkflowJob');
    getOKButton = () => cy.get('#ok-button');
    getItemNameInvalidErrorMessage = () => cy.get("#itemname-invalid");
    getUnsaveItemInvalidName = () => cy.get("#itemname-invalid").contains(/is an unsafe character/);
    getEmptyItemInvalidName = () => cy.get("#itemname-required");
    getFolferType = () => cy.get('.label').contains('Folder');
    getOrganizationFolderType = () => cy.get('[class="jenkins_branch_OrganizationFolder"]');

    typeNewItemName (prjName) {
        this.getJobNameField().type(prjName);
        return this;
    }

    selectFreestyleProject () {
        this.getFreeStlPrjType().click();
        return this;
    }

    selectPipelineProject () {
        this.getPipelinePrjType().click();
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

    clearItemNameField () {
        this.getJobNameField().clear();
        return this;
    }

    selectPipelineProject() {
        this.getPipelinePrjType().click()
        return this
    }

    selectOrganizationFolder() {
        this.getOrganizationFolderType().click();
        return this
    }

};

export default NewJobPage;