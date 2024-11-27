/// <reference types="cypress" />
import header from "../fixtures/pomFixtures/headerData.json"
import DashboardPage from "./DashboardPage";

class JobPage {

  getHeadlineIndex = () => cy.get("#main-panel h1");
  getProjectDescription = () => cy.get('[id="description"]');
  getDashboardBreadcrumbsLink = () => cy.get('#breadcrumbs a[href="/"]');
  getAddDescriptionButton = () => cy.get('[href="editDescription"]');
  getSubmitButton = () => cy.get("[name='Submit']");
  getDashboardLink = () => cy.get('a[href="/"].model-link')
  deleteProjectButton = () => cy.get('a[data-title="Delete Project"]')
  CancelButton = () => cy.get('button[data-id="cancel"]')

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

  clickDashboardLink(){
    this.getDashboardLink().click()
    return new DashboardPage()
  }
  
  clickDeleteProjectButton() {
    this.deleteProjectButton().click()
    return new JobPage()
  }

  clickCancelButton() {
    this.CancelButton().click()
    return new JobPage()
  }
}
export default JobPage