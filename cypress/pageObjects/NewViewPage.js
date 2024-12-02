/// <reference types="cypress" />

import NewViewConfigurePage from "./NewViewConfigurePage";

class NewViewPage {
    
  getViewNameInput = () => cy.get("input#name");
  getIncludeGlobalViewButton = () =>
    cy.get('label[for="hudson.model.ProxyView"]');
  getCreateButton = () => cy.get("button#ok");

  typeViewName(viewName) {
    this.getViewNameInput().type(viewName);
    return this;
  }

  clickIncludeGlobalViewButton() {
    this.getIncludeGlobalViewButton().click();
    return this;
  }

  clickCreateButton() {
    this.getCreateButton().click();
    return new NewViewConfigurePage();
  }
}

export default NewViewPage;
