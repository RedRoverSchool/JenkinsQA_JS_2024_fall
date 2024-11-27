/// <reference types="cypress" />

import NewJobPage from "./NewJobPage";
import ManageJenkinsPage from "./ManageJenkinsPage";

class DashboardPage {

  getNewItemLink = () => cy.get('a[href="/view/all/newJob"]');
  getCreateJobButton = () => cy.get('a[href="newJob"]').contains("Create a job");
  getMainPanel = () => cy.get("div#main-panel");
  getJobTable = () => cy.get("table.jenkins-table.sortable");
  getJobTitleLink = () => cy.get(".model-link.inside");
  getManageJenkins = () => cy.get('a[href="/manage"]');
  getProjectName = () => cy.get('*.jenkins-table__link span');
  getProjectChevronIcon = (projectName) => cy.get(`span:contains('${projectName}') + .jenkins-menu-dropdown-chevron`);


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
};

export default DashboardPage;