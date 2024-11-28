/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";

import allKeys from "../fixtures/newJobPageData.json";
import {newItem} from "../fixtures/messages.json";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();

const {projectNameInvalid, errorMessageColor} = allKeys;

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
});