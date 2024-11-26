/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";
import DashboardPage from "../pageObjects/DashboardPage";

const dashboardPage = new DashboardPage();

let prjName = faker.commerce.productName();
let encodedProjectName = encodeURIComponent(prjName);
let displayName = faker.commerce.productName();
let description = faker.lorem.sentences();

describe("US_06.001 | Organisation folder > Configuration", () => {
  it("TC_06.001.01 | A Jenkins administrator can change Display Name and Description from empty values by clicking Save button", () => {
    cy.log("Preconditions:");
    dashboardPage
      .clickNewItemMenuLink()
      .addNewProjName(prjName)
      .pickOrgFolder()
      .okBtnClickForOrgFolder()
      .clickDashboardBtn();

    cy.log("Steps:");
    dashboardPage
      .clickYourOrgFolderOnDashboardard(encodedProjectName)
      .clickConfigureNavBar()
      .typeDisplayName(displayName)
      .typeDescription(description)
      .clickSaveBtn()
      .checkDescription(description)
      .checkDisplayName(displayName)
      .checkFolderName(prjName)
      .checkUrlEndsWithFolderName(encodedProjectName)
      .clickDashboardBtn()
      .checkProjectName(encodedProjectName, displayName);
  });
});
