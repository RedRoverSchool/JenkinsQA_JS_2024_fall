/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";
import Header from "../pageObjects/Header";

import { faker } from '@faker-js/faker';
import genData from "../fixtures/genData"

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();
const header = new Header();


describe("US_01.002 | FreestyleProject > Rename Project", () => {

  const renamedProjectName = faker.lorem.words();
  let project = genData.newProject();

  beforeEach(() => {
    dashboardPage.clickNewItemMenuLink();
    newJobPage
        .typeNewItemName(project.name)
        .selectFreestyleProject()
        .clickOKButton()
    freestyleProjectPage
        .typeJobDescription(project.description)
        .clickSaveButton();
    header.clickJenkinsLogo()
  });

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

    dashboardPage.clickJobTableDropdownChevron().clickRenameProjectDropdownMenuItem();
    freestyleProjectPage.getNewNameField().click();
    freestyleProjectPage.clearRenameField().typeRenameField(renamedProjectName);
    freestyleProjectPage.clickRenameButtonSubmit();
    freestyleProjectPage.getJobHeadline().should('have.text', renamedProjectName);
   })

  it('TC_01.002.10 | Receive an Error when the new name is invalid', () => {

    dashboardPage
        .openDropdownForProject(project.name)
        .clickRenameFolderDropdownMenuItem()

    freestyleProjectPage
        .validateSpecialCharacters()
    });
});
