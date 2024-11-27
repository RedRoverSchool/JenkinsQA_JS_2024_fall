/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();

const jobName = `${faker.hacker.adjective()} ${faker.hacker.noun()}`;
const jobDescription = faker.lorem.sentence();

describe("US_01.001 | FreestyleProject > Add description", () => {

  beforeEach(() => {
    dashboardPage.addNewProject();
    newJobPage.addNewProjectName(jobName).selectFreestyleProject().clickOKButton();
  });

  it("TC_01.001.01 | Add a description when creating a project", () => {
    freestyleProjectPage.typeJobDescription(jobDescription).clickSaveButton();
    cy.url().should("include", "/job");
    freestyleProjectPage.getJobHeadline().should("have.text", jobName);
    freestyleProjectPage
      .getJobDescription()
      .should("be.visible")
      .and("have.text", jobDescription);
  });

  it("TC_01.001.02 | Add a Description to an Existing Project", () => {
    freestyleProjectPage.clickSaveButton()
                        .clickDashboardBreadcrumbsLink();
    dashboardPage.clickJobTitleLink();
    freestyleProjectPage.clickAddDescriptionButton()
                        .typeJobDescription(jobDescription)
                        .clickSaveButton();

    freestyleProjectPage.getJobDescription()
                        .should("be.visible")
                        .and("have.text", jobDescription);
  });

  it('TC_01.001.08 | Verify the description is added when creating the project', () => {

    cy.log('Adding description and saving the project');
    freestyleProjectPage
      .typeJobDescription(jobDescription)
      .clickSaveButton();

    cy.log('Verifying the Freestyle Project was saved together with its description');
    freestyleProjectPage
      .getJobHeadline().should('be.visible').and('exist');
    freestyleProjectPage
      .getJobDescription().should('be.visible').and('contain.text', jobDescription);
  });

  it('TC_01.001.09 | Description is shown on project page', () => {

    freestyleProjectPage
        .typeJobDescription(jobDescription)
        .clickSaveButton();

    freestyleProjectPage.getJobDescription().should('contain.text', jobDescription)
  });
});