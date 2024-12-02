/// <reference types="cypress" />

import MyViewsPage from "./MyViewsPage";

class UsersCurrentViewPage {
    
  getCurrentViewBreadcrumbsItem = () =>
    cy.get(".jenkins-breadcrumbs__list-item").eq(3);
  getMyViewsBreadcrumbsItem = () =>
    cy.get(".jenkins-breadcrumbs__list-item").contains("My Views");

  clickMyViewsBreadcrumbsItem() {
    this.getMyViewsBreadcrumbsItem().click();
    return new MyViewsPage();
  }
}

export default UsersCurrentViewPage;
