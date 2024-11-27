/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";

import DashboardPage from "../pageObjects/DashboardPage";
import JobPage from "../pageObjects/JobPage";
import NewJobPage from "../pageObjects/NewJobPage";
import ProjectConfigure from "../pageObjects/ProjectConfigurePage";

const dashboardPage = new DashboardPage();
const jobPage = new JobPage();
const newJobPage = new NewJobPage();
const projectConfigure = new ProjectConfigure();

const projectName = `${faker.hacker.adjective()} ${faker.hacker.noun()}`;
const projectDescription = faker.lorem.sentence();

describe("US_01.001 | FreestyleProject > Add description", () => {

  beforeEach(() => {
    dashboardPage.addNewProject();
    newJobPage.addNewProjectName(projectName).selectFreestyleProject().clickOKButton();
  });

  it("TC_01.001.01 | Add a description when creating a project", () => {
    projectConfigure.addProjectDescription(projectDescription).clickSaveButton();
    cy.url().should("include", "/job");
    jobPage.getHeadlineIndex().should("have.text", projectName);
    jobPage
      .getProjectDescription()
      .should("be.visible")
      .and("have.text", projectDescription);
  });

  it("TC_01.001.02 | Add a Description to an Existing Project", () => {
    projectConfigure.clickSaveButton();
    jobPage.clickDashboardBreadcrumbsLink();
    dashboardPage.clickJobTitleLink();
    jobPage.clickAddDescriptionButton();
    jobPage.getProjectDescription().type(projectDescription);
    jobPage.clickSubmitButton();
    jobPage.getProjectDescription()
      .should("be.visible")
      .and("have.text", projectDescription);
  });

  it('TC_01.001.08 | Verify the description is added when creating the project', () => {

    cy.log('Adding description and saving the project');
    projectConfigure
      .addProjectDescription(projectDescription)
      .clickSaveButton();

    cy.log('Verifying the Freestyle Project was saved together with its description');
    jobPage
      .getHeadlineIndex().should('be.visible').and('exist');
    jobPage
      .getProjectDescription().should('be.visible').and('contain.text', projectDescription);
  });

});