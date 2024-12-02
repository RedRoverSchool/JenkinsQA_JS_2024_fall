/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";
import Header from "../pageObjects/Header";

import genData from "../fixtures/genData";
import { faker } from "@faker-js/faker";
import messages from "../fixtures/messages.json";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();
const header = new Header();

describe("US_01.002 | FreestyleProject > Rename Project", () => {
  let project = genData.newProject();

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

  it("TC-01.002.06| Rename a project name from the Dashboard page", () => {
    dashboardPage.clickNewItemMenuLink();
    newJobPage.typeNewItemName(project.name).selectFreestyleProject();
    newJobPage.clickOKButton();
    freestyleProjectPage.clickSaveButton().clickDashboardBreadcrumbsLink();

    dashboardPage
      .clickJobTableDropdownChevron()
      .clickRenameProjectDropdownMenuItem();
    freestyleProjectPage.getNewNameField().click();
    freestyleProjectPage.clearRenameField().typeRenameField(project.newName);
    freestyleProjectPage.clickRenameButtonSubmit();
    freestyleProjectPage.getJobHeadline().should("have.text", project.newName);
  });

  it("TC_01.002.04 | Rename a project name from the Dashboard page", () => {
    //Preconditions, Create new item nameJob
    dashboardPage.clickNewItemMenuLink();
    newJobPage
      .typeNewItemName(project.name)
      .selectFreestyleProject()
      .clickOKButton();
    freestyleProjectPage.clickSaveButton().clickDashboardBreadcrumbsLink();
    //Navigate drop-down menu
    dashboardPage
      .clickJobTableDropdownChevron()
      .clickRenameProjectDropdownMenuItem();
    //Rename job
    freestyleProjectPage.typeNewName(project.newName).clickSaveButton();
    //Checks
    freestyleProjectPage.getJobHeadline().should("contain", project.newName);
    freestyleProjectPage.clickDashboardBreadcrumbsLink();
    dashboardPage.getJobTitleLink().should("contain", project.newName);
  });

  it("TC_01.002.10 | Receive an Error when the new name is invalid", () => {
    cy.log("Creating Freestyle Project");
    dashboardPage.clickNewItemMenuLink();
    newJobPage
      .typeNewItemName(project.name)
      .selectFreestyleProject()
      .clickOKButton();
    freestyleProjectPage
      .typeJobDescription(project.description)
      .clickSaveButton();
    header.clickJenkinsLogo();

    cy.log("Steps");
    dashboardPage.openDropdownForProject(project.name);

    dashboardPage.clickRenameFolderDropdownMenuItem();

    freestyleProjectPage.validateSpecialCharacters();
  });

  it("TC_01.002.11 | Rename a project name from the Project Page", () => {
    dashboardPage.clickNewItemMenuLink();
    newJobPage
      .typeNewItemName(project.name)
      .selectFreestyleProject()
      .clickOKButton()
      .clickSaveButton();
    freestyleProjectPage
      .clickRenameButton()
      .clearRenameField()
      .typeNewName(project.newName)
      .clickRenameButtonSubmit();

    freestyleProjectPage.getJobHeadline().should("have.text", project.newName);
  });

  it("TC_01.002-01 | User receives an Error when the new name is invalid", () => {
    let project1Name = faker.commerce.productName();
    let project2Name = faker.commerce.productName();

    cy.log("precondition 1: creating project1");
    dashboardPage.clickNewItemMenuLink();
    newJobPage
      .typeNewItemName(project1Name)
      .selectFreestyleProject()
      .clickOKButton();
    header.clickJenkinsLogo();

    cy.log("precondition 2: creating project2");
    dashboardPage.clickNewItemMenuLink();
    newJobPage
      .typeNewItemName(project2Name)
      .selectFreestyleProject()
      .clickOKButton();
    header.clickJenkinsLogo();

    cy.log("step1: check error for the same name");
    dashboardPage.openProjectPage(project1Name);
    freestyleProjectPage
      .clickRenameButton()
      .getWarningMessageOnRenamePage()
      .should("have.text", messages.renameItem.sameNameError);

    cy.log("step2: rename the project with the same name");
    freestyleProjectPage
      .clickRenameButtonSubmit()
      .getHeaderOnRename()
      .should("have.text", "Error");
    freestyleProjectPage
      .getErrorMessageParagraph()
      .should("have.text", messages.renameItem.sameNameError);

    cy.log("step3: rename the project with the name of the existing project");
    cy.go("back");
    freestyleProjectPage
      .clearRenameField()
      .typeRenameField(project2Name)
      .clickRenameButtonSubmit()
      .getHeaderOnRename()
      .should("have.text", "Error");
    cy.fixture("messages").then((messages) => {
      const message = messages.renameItem.itemNameIsAlreadyInUse.replace(
        "${project2Name}",
        project2Name
      );
      freestyleProjectPage
        .getErrorMessageParagraph()
        .should("have.text", message);
    });

    cy.log("step4: rename with an empty value");
    cy.go("back");
    freestyleProjectPage
      .clearRenameField()
      .clickRenameButtonSubmit()
      .getHeaderOnRename()
      .should("have.text", "Error");
    freestyleProjectPage
      .getErrorMessageParagraph()
      .should("have.text", messages.renameItem.emptyNameError);

    cy.log("step5: rename a project with special characters");
    cy.go("back");
    messages.renameItem.specialChars.split("").forEach((char) => {
      freestyleProjectPage
        .clearRenameField()
        .typeRenameField(project1Name + char)
        .clickRenameButtonSubmit()
        .getHeaderOnRename()
        .should("have.text", "Error");
      cy.fixture("messages").then((messages) => {
        const message = messages.renameItem.specialCharInNameError.replace(
          "${char}",
          char
        );
        freestyleProjectPage
          .getErrorMessageParagraph()
          .should("have.text", message);
      });
      cy.go("back");
    });

    cy.log("step6: rename with a value with a dot at the end");
    freestyleProjectPage
      .clearRenameField()
      .typeRenameField(project1Name + ".")
      .clickRenameButtonSubmit()
      .getHeaderOnRename()
      .should("have.text", "Error");
    freestyleProjectPage
      .getErrorMessageParagraph()
      .should("have.text", messages.renameItem.nameEndsWithDotError);
  });
});
