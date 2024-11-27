/// <reference types="cypress" />

import JobPage from "./JobPage";
import NewJobPage from "./NewJobPage"
import ManageJenkinsPage from "./ManageJenkinsPage"
import ProjectConfigurePage from "./ProjectConfigurePage";

class DashboardPage {

  getNewItemLink = () => cy.get('a[href="/view/all/newJob"]');
  getCreateJobBtn = () => cy.get('a[href="newJob"]').contains("Create a job");
  getMainPanel = () => cy.get("div#main-panel");
  getJobTable = () => cy.get("table.jenkins-table.sortable");
  getJobTitleLink = () => cy.get(".model-link.inside");
  getManageJenkins = () => cy.get('a[href="/manage"]');
  getProjectName = () => cy.get('*.jenkins-table__link span');

  clickNewItemMenuLink() {
    this.getNewItemLink().click({ force: true });
    return new NewJobPage();
  }

  addNewProject() {
    this.getNewItemLink().click();
    return new NewJobPage();
  }

  clickCreateJobBtn() {
    this.getCreateJobBtn().click();
    return new NewJobPage();
  }

  clickJobTitleLink() {
    this.getJobTitleLink().click();
    return new JobPage();
  }

  clickManageJenkins() {
    this.getManageJenkins().click();
    return new ManageJenkinsPage();
  }

  openProjectPage(projectName) {
    this.getProjectName().contains(projectName).click()
    return new ProjectConfigurePage()
  }

};

export default DashboardPage;