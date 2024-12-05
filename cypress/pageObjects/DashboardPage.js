/// <reference types="cypress" />
import NewJobPage from "./NewJobPage";
import BasePage from "./basePage";

class DashboardPage extends BasePage {

  getCreateJobButton = () => cy.get('a[href="newJob"]').contains("Create a job");
  getMainPanel = () => cy.get("div#main-panel");
  getJobTable = () => cy.get("#projectstatus");
  getJobTitleLink = () => cy.get(".model-link.inside");
  getManageJenkins = () => cy.get('a[href="/manage"]');
  getProjectName = () => cy.get('*.jenkins-table__link span');//please rename to getItemName, so it can be reused
  getItemChevronIcon = (itemName) => cy.get(`span:contains('${itemName}') + .jenkins-menu-dropdown-chevron`);
  getJobTableDropdownChevron = () => cy.get('.jenkins-table__link > .jenkins-menu-dropdown-chevron');
  getJobTableDropdownItem = () => cy.get('.jenkins-dropdown__item ');
  getAllJobNames = () => cy.get('.jenkins-table__link span');
  getDeleteProjectDropdownMenuItem = () => cy.get('button.jenkins-dropdown__item ').contains('Delete Project');
  getDeleteOrganizationFolderDropdownMenuItem = () => cy.get('[class="jenkins-dropdown__item "]').contains('Delete Organization Folder');
  getWelcomeToJenkinsHeadline = () => cy.get('.empty-state-block h1');
  getMoveTheProject = () => cy.get('a[href*="move"]');
  getRenameFolderDropdownMenuItem = () => cy.get('a.jenkins-dropdown__item ').contains('Rename');//please rename to getRenameDropdownOption
  getRenameProjectDropdownMenuItem = () => cy.get('a.jenkins-dropdown__item').contains('Rename');//duplicate to getRenameFolderDropdownMenuItem, may be deleted
  getDeleteProjectDialogBox = () => cy.get('dialog.jenkins-dialog');
  getAllIconsProjectRow = (projectName) => cy.get(`tr[id$='${projectName}'] svg`);
  getAddViewLink = () => cy.get('[href="/newView"]');
  getViewNameInput = () => cy.get('input#name');
  getListViewRadio = () => cy.get('[for="hudson.model.ListView"]');
  getCreateViewButton = () => cy.get('button#ok');
  getSubmitViewCreationButton = () => cy.get('button[name="Submit"]');//make sure it's a correct button name
  getCurrentViewBreadcrumbsItem = () => cy.get('.jenkins-breadcrumbs__list-item').eq(1);
  getViewTab = (viewName) => cy.get("div.tab").contains(viewName);
  getBackGroundTheme = () => cy.get('#main-panel');

  selectNewItemFromDashboardChevron() {
    this.getJobTableDropdownItem().each(($els) => {
      let eText = $els.text().trim()
      if (eText == 'New Item') { cy.wrap($els).click() }
  });
    return new NewJobPage();
  }

  clickJobTitleLink () {
    this.getJobTitleLink().click();
  }

  clickManageJenkins () {
    this.getManageJenkins().click();
    return this;
  }

  openProjectPage (projectName) {
    this.getProjectName().contains(projectName).click();
  }

  getSessionCookie(cookieName) {
    return cy.getCookies().then((cookies) => {
      return (cookies.find((cookie) => cookie.name.includes(cookieName))).value;
    });
  }

  openDropdownForItem (projectName) {
    this.getProjectName().contains(projectName)
      .trigger("mouseover").should("be.visible");
    this.getItemChevronIcon(projectName)
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
    this.getItemChevronIcon(projectName).click({ force: true })
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

  clickDeleteOrganizationFolderDropdownMenuItem() {
    this.getDeleteOrganizationFolderDropdownMenuItem().click();
    return this;
  }

  clickCreateJobLink() {
    this.getCreateJobButton().click();
    return this;
  }

  clickRenameFolderDropdownMenuItem() {//please rename to  clickRenameDropdownOption, so it can be reused
    this.getRenameFolderDropdownMenuItem().click();
    return this
  }

  clickMoveTheProjectButton() {//rename please to clickMoveDropdownOption since it's available not only for project
    this.getMoveTheProject().click()
    return this;
  }

  clickRenameProjectDropdownMenuItem() {
    this.getRenameProjectDropdownMenuItem().click();
    return this;
  }

  clickAddViewLink() {
    this.getAddViewLink().click();
    return this;
  }

  typeViewName(viewName) {
    this.getViewNameInput().type(viewName)
    return this;
  }

  clickListViewRadio() {
    this.getListViewRadio().click()
    return this;
  }

  clickCreateViewButton() {
    this.getCreateViewButton().click({force:true})
    return this;
  }

  clickSubmitViewCreationButton(){
    this.getSubmitViewCreationButton().click({force:true})
    return this

  }

};

export default DashboardPage;