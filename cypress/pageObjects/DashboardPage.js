/// <reference types="cypress" />
import NewJobPage from "./NewJobPage";
import BasePage from "./basePage";

class DashboardPage extends BasePage {

  getCreateJobButton = () => cy.get('a[href="newJob"]').contains("Create a job");
  getMainPanel = () => cy.get("div#main-panel");
  getJobTable = () => cy.get("#projectstatus");
  getJobTitleLink = () => cy.get(".model-link.inside");
  getManageJenkins = () => cy.get('a[href="/manage"]');
  getItemName = () => cy.get('*.jenkins-table__link span');
  getItemChevronIcon = (itemName) => cy.get(`span:contains('${itemName}') + .jenkins-menu-dropdown-chevron`);
  getJobTableDropdownChevron = () => cy.get('.jenkins-table__link > .jenkins-menu-dropdown-chevron');
  getJobTableDropdownItem = () => cy.get('.jenkins-dropdown__item ');
  getAllJobNames = () => cy.get('.jenkins-table__link span');
  getDeleteProjectDropdownMenuItem = () => cy.get('button.jenkins-dropdown__item ').contains('Delete Project');
  getDeleteOrganizationFolderDropdownMenuItem = () => cy.get('[class="jenkins-dropdown__item "]').contains('Delete Organization Folder');
  getWelcomeToJenkinsHeadline = () => cy.get('.empty-state-block h1');
  getMoveTheProject = () => cy.get('a[href*="move"]');
  getRenameDropdownOption = () => cy.get('a.jenkins-dropdown__item ').contains('Rename');
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
  getSortingArrowOfNameColumn = () => cy.get('th[initialsortdir="down"] span.sortarrow');
  getAllItemNamesFromNameColumn = () => cy.get('table#projectstatus tbody tr a span');
  getBuildNowDropdownMenuItem = () => cy.get('button.jenkins-dropdown__item').contains('Build Now');
  getNotificationBar = () => cy.get('#notification-bar');
  getUserName = (userName) => cy.contains('a', userName);

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

  clickItemName (projectName) {
    this.getItemName().contains(projectName).click();
  }

  getSessionCookie(cookieName) {
    return cy.getCookies().then((cookies) => {
      return (cookies.find((cookie) => cookie.name.includes(cookieName))).value;
    });
  }

  openDropdownForItem (projectName) {
    this.getItemName().contains(projectName)
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

  clickRenameDropdownOption() {
    this.getRenameDropdownOption().click();
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

  clickSortingArrowOfNameColumn() {
    this.getSortingArrowOfNameColumn().click()
    return this
  }

  clickBuildNowDropdownMenuItem() {
    this.getBuildNowDropdownMenuItem().click();
    return this;
  }

  checkUserNameVisible(userName) {
    this.getUserName(userName).should('be.visible');
    return this;
  }
  
  clickViewTab(viewName) {
    this.getViewTab(viewName).click()
    return this;
  }

};

export default DashboardPage;
