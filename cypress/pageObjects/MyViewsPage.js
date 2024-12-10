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
  getCheckboxForJob = () => cy.get('.listview-jobs .jenkins-checkbox');
  getListViewRadio = () => cy.get('label[for="hudson.model.ListView"]');
  getAddColumnButton = () => cy.findByRole('button', { name: /Add column/ });
  getGitBranchesMenuItem = () => cy.contains('button.jenkins-dropdown__item ', 'Git Branches');
  getOKButton = () => cy.findByRole('button', { name: /OK/ });
  getDeleteWeatherColumnButton = () => cy.get('div[descriptorid="hudson.views.WeatherColumn"] button[title="Delete"]');
  getProjectDescriptionMenuItem = () => cy.contains('button.jenkins-dropdown__item ', 'Project description');

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

  selectJobCheckbox(itemName) {
    this.getCheckboxForJob().contains(itemName).click()
    return this
  }

  clickListViewRadio() {
    this.getListViewRadio().click();
    return this;
  }

  clickAddColumnButton() {
    this.getAddColumnButton().click();
    return this;
  }

  selectGitBranchesMenuItem() {
    this.getGitBranchesMenuItem().contains('Git Branches').click();
    return this;
  }

  clickOKButton() {
    this.getOKButton().click()
    return this
  }

  clickDeleteWeatherColumnButton() {
    this.getDeleteWeatherColumnButton().click()
    return this
  }

  selectProjectDescriptionMenuItem() {
    this.getProjectDescriptionMenuItem().contains('Project description').click();
    return this;
  }

}

export default MyViewsPage;
