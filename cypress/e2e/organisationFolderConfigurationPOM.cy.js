/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";
import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import Header from "../pageObjects/Header";
import OrganizationFolderPage from "../pageObjects/OrganizationFolderPage";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const header = new Header();
const organizationFolderPage = new OrganizationFolderPage();

describe("US_06.001 | Organisation folder > Configuration", () => {
  let orgFolderName = faker.commerce.productName();
  const encodedOrgFolderName = encodeURIComponent(orgFolderName);
  let displayName = faker.commerce.productName();
  let description = faker.lorem.sentences();
//very long name, can be changed to : " Change Display Name and Description from empty values"
    it("TC_06.001.01 | A Jenkins administrator can change Display Name and Description from empty values by clicking Save button", () => {
        cy.log("Preconditions:");
        dashboardPage.clickNewItemMenuLink();
        newJobPage
        .typeNewItemName(orgFolderName)
        .selectOrganizationFolder()
        .clickOKButton();
        header.clickJenkinsLogo();

        cy.log("Steps:");
        dashboardPage.openProjectPage(orgFolderName);
        organizationFolderPage
        .clickConfigureLMenuOption()
        .typeDisplayName(displayName)
        .typeDescription(description)
        .clickSaveButton();

        organizationFolderPage
        .getDisplayName()
        .invoke("text")
        .then((text) => {
            expect(text.trim()).to.equal(displayName);
        });

        organizationFolderPage.getDescription().should("have.text", description);

        organizationFolderPage
        .getFolderName()
        .should("contain.text", `Folder name: ${orgFolderName}`);

        cy.url().should("match", new RegExp(`${encodedOrgFolderName}\/?$`));

        header.clickJenkinsLogo();
        dashboardPage.getItemName().contains(displayName).should("be.visible");
    });


});
