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
  getAllJobNames = () => cy.get('.jenkins-table__link span')

  clickNewItemMenuLink() {
    this.getNewItemLink().click({ force: true });
    return new NewJobPage();
  }

  addNewProject() {
    this.getNewItemLink().click();
    return new NewJobPage();
  }

  clickCreateJobButton() {
    this.getCreateJobButton().click();
    return new NewJobPage();
  }

  clickJobTitleLink() {
    this.getJobTitleLink().click();
  }

  clickManageJenkins() {
    this.getManageJenkins().click();
    return new ManageJenkinsPage();
  }

  openProjectPage(projectName) {
    this.getProjectName().contains(projectName).click();
  }

  clickJobName(name) {
    this.getJobTable().contains(name).click()
    return new NewJobPage()
  }
};

export default DashboardPage;