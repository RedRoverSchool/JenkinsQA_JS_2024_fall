/// <reference types="cypress" />

class PipelinePage {
   
    getPipelineSaveBtn = () => cy.get('.jenkins-submit-button');
    getStatusDisаbledText = () => cy.get('#enable-project').contains('currently disabled');

    clickOnSaveBtn() {
        this.getPipelineSaveBtn().click()
        return this
    }
    
    
}

export default PipelinePage;