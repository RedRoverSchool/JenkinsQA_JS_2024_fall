/// <reference types="cypress" />

import NewJobPage from "./NewJobPage";

class FolderPage {
     
    getNewItemLink = () => cy.get('span.task-link-text').contains('New Item');

    clickNewItemMenuLink() {
        this.getNewItemLink().click({ force: true });
        return new NewJobPage();
      }

}

export default FolderPage;