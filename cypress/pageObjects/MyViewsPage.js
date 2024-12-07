/// <reference types="cypress" />
import DashboardPage from "../pageObjects/DashboardPage";

class MyViewsPage extends DashboardPage{

  getAddNewViewLink = () => cy.get('a[title="New View"]');
  getViewTab = (viewName) => cy.get("div.tab").contains(viewName);
  getViewNameInput = () => cy.get("input#name");
  getIncludeGlobalViewButton = () => cy.get('label[for="hudson.model.ProxyView"]');
  getCreateButton = () => cy.get("button#ok");
  getCurrentViewBreadcrumbsItem = () => cy.get(".jenkins-breadcrumbs__list-item").eq(3);
  getMyViewsBreadcrumbsItem = () => cy.get(".jenkins-breadcrumbs__list-item").contains("My Views");
  getMyViewsRadio = () => cy.get('label[for="hudson.model.MyView"]');
  getAllListJobsCheckboxes = () => cy.get('.listview-jobs .jenkins-checkbox')

  clickAddNewViewLink() {
    this.getAddNewViewLink().click();
    return this;
  }
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
    return this;
  }

  clickMyViewsBreadcrumbsItem() {
    this.getMyViewsBreadcrumbsItem().click();
    return this;
  }

  clickMyViewRadio() {
    this.getMyViewsRadio().click();
    return this;
  }

  clickListJobCheckbox(itemName) {
    this.getAllListJobsCheckboxes().contains(itemName).click()
    return this
  }
}

export default MyViewsPage;
