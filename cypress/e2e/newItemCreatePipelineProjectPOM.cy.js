/// <reference types="cypress" />

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";

import allKeys from "../fixtures/newJobPageData.json";
import {newItem} from "../fixtures/messages.json";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();

const {projectNameInvalid, errorMessageColor} = allKeys;

describe("US_00.002 | New Item > Create Pipeline Project", () => {

  it("TC_00.002.01 | Special characters are not allowed in the project name", () => {
    dashboardPage
      .clickNewItemMenuLink()
      .addNewProjectName(projectNameInvalid)
    newJobPage.getItemNameInvalidErrorMessage()
      .should("have.text", newItem.newItemNameInvalidMessage)
      .and("have.css", "color", errorMessageColor);
  });

});