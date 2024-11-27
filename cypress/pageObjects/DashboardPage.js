/// <reference types="cypress" />

import NewJobPage from "./NewJobPage";
import ManageJenkinsPage from "./ManageJenkinsPage";
import ProjectConfigurePage from "./ProjectConfigurePage";
import LoginPage from "./LoginPage"

class DashboardPage {

  getNewItemLink = () => cy.get('a[href="/view/all/newJob"]');
  getCreateJobButton = () => cy.get('a[href="newJob"]').contains("Create a job");
  getMainPanel = () => cy.get("div#main-panel");
  getJobTable = () => cy.get("table.jenkins-table.sortable");
  getJobTitleLink = () => cy.get(".model-link.inside");
  getManageJenkins = () => cy.get('a[href="/manage"]');
  getProjectName = () => cy.get('*.jenkins-table__link span');
  getLogOutButton = () => cy.get('a[href="/logout"]')

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
    return new ProjectConfigurePage()
  }

  clickLogOutButton() {
    this.getLogOutButton().click()
    return new LoginPage()
  }

  getSessionCookie(cookieName) {
    return cy.getCookies().then((cookies) => {
      return (cookies.find((cookie) => cookie.name.includes(cookieName))).value;
    });
  }
};

export default DashboardPage;