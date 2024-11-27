/// <reference types="cypress" />

import NewJobPage from "./NewJobPage";
import ManageJenkinsPage from "./ManageJenkinsPage";

class DashboardPage {

  getNewItemLink = () => cy.get('a[href="/view/all/newJob"]');
  getCreateJobButton = () => cy.get('a[href="newJob"]').contains("Create a job");
  getMainPanel = () => cy.get("div#main-panel");
  getJobTable = () => cy.get("#projectstatus");
  getJobTitleLink = () => cy.get(".model-link.inside");
  getManageJenkins = () => cy.get('a[href="/manage"]');
  getProjectName = () => cy.get('*.jenkins-table__link span');
  getAllJobNames = () => cy.get('.jenkins-table__link span');
  getProjectDropdownMenu = () => cy.get("#main-panel button.jenkins-menu-dropdown-chevron");
  getDeleteProjectDropdownMenuItem = () => cy.get('button.jenkins-dropdown__item ').contains('Delete Project');
  getCancelProjectDeletingButton = () => cy.get('button[data-id="cancel"]');
  getSubmitProjectDeletingButton = () => cy.get('button[data-id="ok"]')
  getProjectChevronIcon = (projectName) => cy.get(`span:contains('${projectName}') + .jenkins-menu-dropdown-chevron`);
  getAllJobNames = () => cy.get('.jenkins-table__link span')
              
  clickNewItemMenuLink() {
    this.getNewItemLink().click({ force: true });
    return new NewJobPage();
  }

  clickNewItemMenuLink () {
    this.getNewItemLink().click({ force: true });
    return new NewJobPage();
  }

  clickJobTitleLink () {
    this.getJobTitleLink().click();
  }

  clickManageJenkins () {
    this.getManageJenkins().click();
    return new ManageJenkinsPage();
  }

  openProjectPage (projectName) {
    this.getProjectName().contains(projectName).click();
  }

  openDropdownForProject (projectName) {
    this.getProjectName().contains(projectName)
      .trigger("mouseover").should("be.visible");
    this.getProjectChevronIcon(projectName)
      .click({ force: true });
    return this;
  }
  
  clickJobName (name) {
    this.getJobTable().contains(name).click()
    return new NewJobPage()
  }

  mouseOverJobTitle(projectName) {
    this.getJobTitleLink().contains(projectName).trigger('mouseover')
    return this.page
  }

  clickProjectDropdownMenu() {
    this.getProjectDropdownMenu().click({ force: true })
    return this.page
  }

  clickDeleteProjectFromProjectDropdownMenu() {
    this.getDeleteProjectDropdownMenuItem().click()
    return this.page
  }

  cancelProjectDeleting() {
    this.getCancelProjectDeletingButton().click()
    return this.page
  }

  submitProjectDeleting() {
    this.getSubmitProjectDeletingButton().click()
    return this.page
  }

};

export default DashboardPage;