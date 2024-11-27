/// <reference types="cypress" />

import NewJobPage from "./NewJobPage";

class FolderPage {
     
    getNewItemLink = () => cy.get('span.task-link-text').contains('New Item');
    getFolderSaveBtn = () => cy.get('.jenkins-submit-button');

    clickNewItemMenuLink() {
        this.getNewItemLink().click({ force: true });
        return new NewJobPage();
      }

      clickOnSaveBtn() {
        this.getFolderSaveBtn().click()
        return this
    }

}

export default FolderPage;