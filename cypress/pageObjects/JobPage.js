/// <reference types="cypress" />

import DashboardPage from "./DashboardPage";

class JobPage {

  getHeadlineIndex = () => cy.get("#main-panel h1");
  getProjectDescription = () => cy.get('[id="description"]');
  getDashboardBreadcrumbsLink = () => cy.get('#breadcrumbs a[href="/"]');
  getAddDescriptionButton = () => cy.get('[href="editDescription"]');
  getSubmitButton = () => cy.get("[name='Submit']");

  getTextFromHeadlineIndex() {
    return this.getHeadlineIndex().then(($el) => {
      return $el.text();
    });
  }

  clickDashboardBreadcrumbsLink() {
    this.getDashboardBreadcrumbsLink().click();
    return new DashboardPage();
  }

  clickAddDescriptionButton() {
    this.getAddDescriptionButton().click();
    return this;
  }

  clickSubmitButton() {
    this.getSubmitButton().click();
    return this;
  }

};

export default JobPage;