/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import Header from "../pageObjects/Header";

import allKeys from "../fixtures/newJobPageData.json";
import { newItem } from "../fixtures/messages.json";
import genData from "../fixtures/genData";
import PipelinePage from '../pageObjects/PipelinePage';

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const header = new Header();
const pipelinePage = new PipelinePage();

const { projectNameInvalid, errorMessageColor } = allKeys;

describe("US_00.002 | New Item > Create Pipeline Project", () => {
  let project = genData.newProject();

  const randomItemName = faker.commerce.productName();

  it("TC_00.002.01 | Special characters are not allowed in the project name", () => {
    dashboardPage
      .clickNewItemMenuLink()
      .typeNewItemName(projectNameInvalid);
    newJobPage.getItemNameInvalidErrorMessage()
      .should("have.text", newItem.newItemNameInvalidMessage)
      .and("have.css", "color", errorMessageColor);
  });

  it('TC_00.002.02 | Pipeline item type is highlighted when selected ', () => {

    dashboardPage
      .clickNewItemMenuLink()
      .typeNewItemName(randomItemName)
      .selectPipelineProject()

    newJobPage.getPipelineSelectedState()
      .should('have.attr', 'aria-checked', 'true')
  });

  it('TC_00.002.04 | Create Pipeline Project with an empty item name field', () => {

    dashboardPage.clickNewItemMenuLink();
    newJobPage.selectPipelineProject()
      .getEmptyItemInvalidName()
      .should('have.text', newItem.emptyNameFieldReminder)
      .and('have.css', 'color', errorMessageColor);
  })

  it('TC_00.002.05 | Create Pipeline Project with an already existing name of a project', () => {

    cy.log('Precondition: create Pipeline project');
    dashboardPage.clickNewItemMenuLink()
      .typeNewItemName(randomItemName)
      .selectPipelineProject()
      .clickOKButton();
    header.clickJenkinsLogo();

    cy.log('Create project with an existing name');
    dashboardPage.clickNewItemMenuLink();

    newJobPage.clearItemNameField()
      .typeNewItemName(randomItemName)
      .getItemNameInvalidErrorMessage()
      .should('have.text', `${newItem.duplicateNotAllowedMessage} ‘${randomItemName}’`)
      .and('have.css', 'color', errorMessageColor);

    newJobPage.getOKButton().should('be.disabled');
  })

  it('TC_00.002.14 | Create Pipeline Project', () => {
    dashboardPage.clickCreateJobLink();
    newJobPage.typeNewItemName(project.name)
      .selectPipelineProject()
      .clickOKButton()
      .clickSaveButton();
    header.clickJenkinsLogo();

    dashboardPage
      .getProjectName()
      .should('be.visible')
      .and('contain.text', project.name);
    dashboardPage
      .getJobTable()
      .should('contain.text', project.name)
      .and('be.visible');
  });

  it('TC_00.002.15 | The url of the configure page contains new project name', () => {
    dashboardPage.clickNewItemMenuLink();
    newJobPage
      .typeNewItemName(project.name)
      .selectPipelineProject()
      .clickOKButton()

      .getBreadcrumbsListItem().should('have.text', 'Configuration')
    newJobPage  
      .getUrlConfigurePageField().should('include', project.name)
  })

  it ('TC_02.004.02 | Pipeline > Pipeline Configuration >Enable/disable the project with the help of Enable/Disable toggle', () => { 
   
    dashboardPage.clickCreateJobLink();
    newJobPage
      .typeNewItemName(project.name)
      .selectPipelineProject()
      .clickOKButton()
      .verifyToggleWork()
      .clickOnDesabledToggle();
    cy.wait(500);
    newJobPage.clickSaveButton();
    pipelinePage
      .getStatusDisаbledText().should('exist')
      .and('have.css', 'color', 'rgb(254, 130, 10)');     

}) 
});