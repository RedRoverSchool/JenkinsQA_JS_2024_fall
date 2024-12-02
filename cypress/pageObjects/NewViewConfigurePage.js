/// <reference types="cypress" />

import UsersCurrentViewPage from "./UsersCurrentViewPage";

class NewViewConfigurePage {
    
  getOkButton = () => cy.get('button[name="Submit"]');

  clickOkButton() {
    this.getOkButton().click({ force: true });
    return new UsersCurrentViewPage();
  }
}

export default NewViewConfigurePage;
