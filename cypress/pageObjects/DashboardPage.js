/// <reference types="cypress" />

import NewJobPage from "./NewJobPage";
import ManageJenkinsPage from "./ManageJenkinsPage";
import LoginPage from "./LoginPage"

class DashboardPage {

  getDashboardBreadcrumb = () => cy.get('a[href="/"].model-link');
  getDashboardBreadcrumbChevron = () => cy.get('a[href="/"] .jenkins-menu-dropdown-chevron');
  getNewItemLink = () => cy.get('a[href="/view/all/newJob"]');
  getCreateJobButton = () => cy.get('a[href="newJob"]').contains("Create a job");
  getMainPanel = () => cy.get("div#main-panel");
  getJobTable = () => cy.get("#projectstatus");
  getJobTitleLink = () => cy.get(".model-link.inside");
  getManageJenkins = () => cy.get('a[href="/manage"]');
  getProjectName = () => cy.get('*.jenkins-table__link span');
  getProjectChevronIcon = (projectName) => cy.get(`span:contains('${projectName}') + .jenkins-menu-dropdown-chevron`);
  getJobTableDropdownChevron = () => cy.get('.jenkins-table__link > .jenkins-menu-dropdown-chevron');
  getJobTableDropdownItem = () => cy.get('.jenkins-dropdown__item ');
  getAllJobNames = () => cy.get('.jenkins-table__link span')
  getLogOutButton = () => cy.get('a[href="/logout"]')
  getDeleteProjectDropdownMenuItem = () => cy.get('button.jenkins-dropdown__item ').contains('Delete Project');
  getCancelProjectDeletingButton = () => cy.get('button[data-id="cancel"]');
  getSubmitProjectDeletingButton = () => cy.get('button[data-id="ok"]');
  getWelcomeToJenkins = () => cy.get('.empty-state-block h1');



  hoverDashboardDropdownChevron() {
    this.getDashboardBreadcrumb().realHover()
    return this
  }

  clickDashboardDropdownChevron() {
    this.getDashboardBreadcrumbChevron().click()
    return this
  }

  selectNewItemFromDashboardChevron() {
    this.getJobTableDropdownItem().each(($els) => {
      let eText = $els.text().trim()
      if (eText == 'New Item') { cy.wrap($els).click() }
  });
    return new NewJobPage()
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

  clickLogOutButton() {
    this.getLogOutButton().click()
    return new LoginPage()
  }

  getSessionCookie(cookieName) {
    return cy.getCookies().then((cookies) => {
      return (cookies.find((cookie) => cookie.name.includes(cookieName))).value;
    });
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

  hoverJobTitleLink() {
    this.getJobTitleLink().trigger('mouseover')
    return this
  }

  clickProjectChevronIcon(projectName) {
    this.getProjectChevronIcon(projectName).click({ force: true })
    return this
  }

  clickJobTableDropdownChevron() {
    this.getJobTableDropdownChevron().click({ force: true })
    return this
  }

  clickDeleteProjectDropdownMenuItem() {
    this.getDeleteProjectDropdownMenuItem().click()
    return this
  }

  clickCancelDeletingButton() {
    this.getCancelProjectDeletingButton().click();
    return this;
  }

  clickSubmitDeletingButton() {
    this.getSubmitProjectDeletingButton().click()
    return this
  }
};

export default DashboardPage;