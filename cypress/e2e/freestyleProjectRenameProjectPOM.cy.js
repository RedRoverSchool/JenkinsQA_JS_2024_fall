/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";
import Header from "../pageObjects/Header";

import genData from "../fixtures/genData"

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();
const header = new Header();

describe("US_01.002 | FreestyleProject > Rename Project", () => {

  let project = genData.newProject();

  it.skip("TC_01.002.02 | Rename a project from the Project Page", () => {
    dashboardPage.clickNewItemMenuLink();
    newJobPage
      .typeNewItemName(project.name)
      .selectFreestyleProject()
      .clickOKButton();
    freestyleProjectPage.clickSaveButton().clickDashboardBreadcrumbsLink();
    dashboardPage.openProjectPage(project.name);
    freestyleProjectPage
      .clickRenameButton()
      .typeNewName(project.newName)
      .clickSaveButton();
    cy.url({ decode: true }).should("include", project.newName);
    freestyleProjectPage.getJobHeadline().should("have.text", project.newName);
    freestyleProjectPage.clickDashboardBreadcrumbsLink();

    dashboardPage.getJobTitleLink().should("have.text", project.newName);
  });
  
  it('TC-01.002.06| Rename a project name from the Dashboard page', () => {
    
    dashboardPage.clickNewItemMenuLink();
    newJobPage.typeNewItemName(project.name).selectFreestyleProject();
    newJobPage.clickOKButton();
    freestyleProjectPage.clickSaveButton().clickDashboardBreadcrumbsLink();

    dashboardPage.clickJobTableDropdownChevron().clickRenameProjectDropdownMenuItem();
    freestyleProjectPage.getNewNameField().click();
    freestyleProjectPage.clearRenameField().typeRenameField(project.newName);
    freestyleProjectPage.clickRenameButtonSubmit();
    freestyleProjectPage.getJobHeadline().should('have.text', project.newName);
  })

  it("TC_01.002.04 | Rename a project name from the Dashboard page", () => {
    //Preconditions, Create new item nameJob
    dashboardPage
        .clickNewItemMenuLink();
    newJobPage
        .typeNewItemName(project.name)
        .selectFreestyleProject()
        .clickOKButton();
    freestyleProjectPage
        .clickSaveButton()
        .clickDashboardBreadcrumbsLink();
    //Navigate drop-down menu
    dashboardPage
        .clickJobTableDropdownChevron()
        .clickRenameProjectDropdownMenuItem();
    //Rename job
    freestyleProjectPage
      .typeNewName(project.newName)
      .clickSaveButton();
    //Checks
    freestyleProjectPage
        .getJobHeadline().should('contain', project.newName)
    freestyleProjectPage
        .clickDashboardBreadcrumbsLink();
    dashboardPage
        .getJobTitleLink()
        .should("contain", project.newName);
    });

  it('TC_01.002.10 | Receive an Error when the new name is invalid', () => {

    cy.log("Creating Freestyle Project");
    dashboardPage.clickNewItemMenuLink();
    newJobPage
        .typeNewItemName(project.name)
        .selectFreestyleProject()
        .clickOKButton()
    freestyleProjectPage
        .typeJobDescription(project.description)
        .clickSaveButton();
    header.clickJenkinsLogo()

    cy.log("Steps")
    dashboardPage
        .openDropdownForProject(project.name)

    dashboardPage.clickRenameFolderDropdownMenuItem()

    freestyleProjectPage
        .validateSpecialCharacters()
  });
    
});
