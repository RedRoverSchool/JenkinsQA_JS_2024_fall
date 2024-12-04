/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";
import genData from "../fixtures/genData";

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();
const jobDescription = faker.lorem.sentence();

describe("US_01.001 | FreestyleProject > Add description", () => {
  let project = genData.newProject();

  beforeEach(() => {
    dashboardPage.clickNewItemMenuLink();
    newJobPage.typeNewItemName(project.name).selectFreestyleProject().clickOKButton();
  });

  it("TC_01.001.01 | Add a description when creating a project", () => {
    freestyleProjectPage
      .typeJobDescription(project.description)
      .clickSaveButton();
    cy.url().should("include", "/job");
    freestyleProjectPage
      .getJobHeadline()
      .should("have.text", project.name);

    freestyleProjectPage
      .getJobDescription()
      .should("be.visible")
      .and("have.text", project.description);
  });

  it("TC_01.001.02 | Add a Description to an Existing Project", () => {
    freestyleProjectPage
      .clickSaveButton()
      .clickDashboardBreadcrumbsLink();
    dashboardPage.clickJobTitleLink();
    freestyleProjectPage
      .clickAddDescriptionButton()
      .typeJobDescription(project.description)
      .clickSaveButton();

    freestyleProjectPage
      .getJobDescription()
      .should("be.visible")
      .and("have.text", project.description);
  });

  it("TC_01.001.03 | Verify updating an existing description", () => {
    freestyleProjectPage
      .clickSaveButton()
      .clickAddDescriptionButton()
      .typeJobDescription(project.description)
      .clickSaveButton()
      .clickAddDescriptionButton()
      .clearJobDescriptionField()
      .typeJobDescription(project.newDescription)
      .clickSaveButton();

    freestyleProjectPage
      .getJobDescription()
      .should("be.visible")
      .and("have.text", project.newDescription);
  });

  it('TC_01.001.08 | Verify the description is added when creating the project', () => {

    cy.log('Adding description and saving the project');
    freestyleProjectPage
      .typeJobDescription(jobDescription)
      .clickSaveButton();

    cy.log('Verifying the desription was added to the project');
    freestyleProjectPage
      .getJobDescription().should('be.visible').and('contain.text', jobDescription);
  });

  it('TC_01.001.09 | Description is shown on project page', () => {

    freestyleProjectPage
      .typeJobDescription(jobDescription)
      .clickSaveButton();

    freestyleProjectPage.getJobDescription().should('contain.text', jobDescription)
  });

  it('TC_01.001.07 | It is possible to add description on project update', () => {

    freestyleProjectPage.typeJobDescription(project.description)
      .clickSaveButton();
    freestyleProjectPage.getJobHeadline()
      .should("have.text", project.name);
    freestyleProjectPage.clickConfigureLMenuOption();
    cy.url().should('include', '/configure');
    freestyleProjectPage.typeJobDescription(project.newDescription)
      .clickSaveButton();

    freestyleProjectPage.getJobDescription().should("have.text", project.newDescription);
  });
});