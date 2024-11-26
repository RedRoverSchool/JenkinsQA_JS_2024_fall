/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";

const newItemBtn = '[href$="/newJob"]';
const itemNameField = ".jenkins-input#name";
const organizationFolder = ".jenkins_branch_OrganizationFolder";
const okBtn = "#ok-button";
const dashboardBtn = '#breadcrumbs a[href="/"]';
const configureNavBar = 'a[href$="/configure"].task-link';
const displayNameInput = 'input[name="_.displayNameOrNull"]';
const descriptionInput = 'textarea[name="_.description"]';
const saveBtn = 'button[name="Submit"]';

let orgFolderName = faker.commerce.productName();
const encodedOrgFolderName = encodeURIComponent(orgFolderName);
const orgFolderOnDashboard = `td a[href$="${encodedOrgFolderName}/"]`;
let displayName = faker.commerce.productName();
let description = faker.lorem.sentences();

describe("US_06.001 | Organisation folder > Configuration", () => {
  
  it("TC_06.001.01 | A Jenkins administrator can change Display Name and Description from empty values by clicking Save button", () => {
    cy.log("Preconditions:");
    cy.get(newItemBtn).click();
    cy.get(itemNameField).type(orgFolderName);
    cy.get(organizationFolder).click();
    cy.get(okBtn).click();
    cy.get(dashboardBtn).click();

    cy.log("Steps:");
    cy.get(orgFolderOnDashboard).click();
    cy.get(configureNavBar).click();
    cy.get(displayNameInput).type(displayName);
    cy.get(descriptionInput).type(description);
    cy.get(saveBtn).click();

    cy.get("h1")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal(displayName);
      });
    cy.get("#view-message").should("have.text", description); // проверяем description

    cy.get("#main-panel").should(
      "contain.text",
      `Folder name: ${orgFolderName}`
    );
    cy.url().should("match", new RegExp(`${encodedOrgFolderName}\/?$`));

    cy.get(dashboardBtn).click();
    cy.get(orgFolderOnDashboard).should("have.text", displayName);
  });
});
