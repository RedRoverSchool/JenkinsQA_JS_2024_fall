/// <reference types="cypress" />

import NewViewPage from "./NewViewPage";

class MyViewsPage {
  getAddNewViewLink = () => cy.get('a[title="New View"]');
  getViewTab = (viewName) => cy.get("div.tab").contains(viewName);

  clickAddNewViewLink() {
    this.getAddNewViewLink().click();
    return new NewViewPage();
  }
}

export default MyViewsPage;
