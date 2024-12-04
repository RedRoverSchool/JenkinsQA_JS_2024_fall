/// <reference types="cypress" />

class PipelinePage {

    getPipelineSaveBtn = () => cy.get('.jenkins-submit-button');

    clickOnSaveBtn() {
        this.getPipelineSaveBtn().click()
        return this
    }

}

export default PipelinePage;