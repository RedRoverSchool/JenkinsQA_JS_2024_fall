/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";

import genData from "../fixtures/genData"

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();

describe("US_01.002 | FreestyleProject > Rename Project", () => {
  let project = genData.newProject();
  it("TC_01.002.02 | Rename a project from the Project Page", () => {
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
    cy.url().should("include", project.newName);
    freestyleProjectPage.getJobHeadline().should("have.text", project.newName);
    freestyleProjectPage.clickDashboardBreadcrumbsLink();

    dashboardPage.getJobTitleLink().should("have.text", project.newName);
  });
});
