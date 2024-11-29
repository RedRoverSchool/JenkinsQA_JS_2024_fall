/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import Header from '../pageObjects/Header';

import allKeys from "../fixtures/newJobPageData.json";
import { newItem } from "../fixtures/messages.json";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const header = new Header();

const { projectNameInvalid, errorMessageColor } = allKeys;

describe("US_00.002 | New Item > Create Pipeline Project", () => {

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
});