/// <reference types="cypress" />
import BasePage from "./basePage"

class PipelinePage extends BasePage { 

    getPipelineSaveBtn = () => cy.get('.jenkins-submit-button');
    getPipelineDescriptionField = () => cy.get('textarea[name="description"]')
    getConfigurePipelineMenuButton = () => cy.get('a[href$="configure"]')
    getPipelineJobDescription = () => cy.get('#description')
    getStatusDisabledText = () => cy.get('#enable-project').contains('currently disabled');
    getToggleSelector = () => cy.get('#enable-disable-project');

    clickOnSaveBtn() {
        this.getPipelineSaveBtn().click()
        return this
    }

    typePipelineDescription(description) {
        this.getPipelineDescriptionField().type(description)
        return this
    }

    clickConfigurePipelineMenuButton() {
        this.getConfigurePipelineMenuButton().click()
        return this
    }

    clearPipelineDescriptionField() {
        this.getPipelineDescriptionField().clear()
        return this
    }

    clickOnToggle() {
        this.getToggleSelector().uncheck({force:true});
        return this
    }
}

export default PipelinePage;