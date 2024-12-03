/// <reference types="cypress" />

class PipelinePage {

    getPipelineSaveBtn = () => cy.get('.jenkins-submit-button');
    getPipelineDescriptionField = () => cy.get('textarea[name="description"]')
    getConfigurePipelineMenuButton = () => cy.get('a[href$="configure"]')
    getPipelineJobDescription = () => cy.get('#description')

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


}

export default PipelinePage;