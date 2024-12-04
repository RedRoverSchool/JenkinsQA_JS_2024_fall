/// <reference types="cypress" />
import BasePage from "./basePage";

class NewJobPage extends BasePage{

    getItemNameField = () => cy.get('#name');
    getFreeStlPrjType = () => cy.get('.label').contains('Freestyle project');
    getPipelinePrjType = () => cy.get('span.label').contains('Pipeline');
    getPipelineSelectedState = () => cy.get('.org_jenkinsci_plugins_workflow_job_WorkflowJob');
    getItemNameInvalidErrorMessage = () => cy.get("#itemname-invalid");
    getUnsaveItemInvalidName = () => cy.get("#itemname-invalid").contains(/is an unsafe character/);
    getEmptyItemInvalidName = () => cy.get("#itemname-required");
    getFolferType = () => cy.get('.label').contains('Folder');
    getOrganizationFolderType = () => cy.get('[class="jenkins_branch_OrganizationFolder"]');
    getAllItemsList = () => cy.get('#items li');
    getUrlConfigurePageField = () => cy.location('href');
    getBreadcrumbsListItem = () => cy.get("[aria-current='page']");
    configurePagePipelineButton = () => cy.get('button[data-section-id="pipeline"]');
    getEmptyNameFieldReminder = () => cy.get('div[class$="validation-message"]');
  

    typeNewItemName (itemName) {
        this.getItemNameField().type(itemName);
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

    clearItemNameField () {
        this.getItemNameField().clear();
        return this;
    }

    selectPipelineProject () {
        this.getPipelinePrjType().click();
        return this;
    }

    selectOrganizationFolder () {
        this.getOrganizationFolderType().click();
        return this;
    }

    chooseRandomItemFromList () {
        this.getAllItemsList().then((items) => {
            const randomIndex = Math.floor(Math.random() * items.length);
            cy.wrap(items).eq(randomIndex).click();
        }).then(() => this);
        return this;
    }

    verifyItemInvalidNameMessageExist () {
        this.getItemNameInvalidErrorMessage()
            .should('not.have.class','input-message-disabled');
        return this;
    }

    verifyItemInvalidNameMessageNotExist () {
        this.getItemNameInvalidErrorMessage()
            .should('have.class','input-message-disabled');
        return this;
    }
};

export default NewJobPage;