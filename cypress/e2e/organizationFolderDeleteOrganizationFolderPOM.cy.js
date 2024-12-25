/// <reference types = "cypress" />

import genData from "../fixtures/genData";
import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import OrganizationFolderPage from "../pageObjects/OrganizationFolderPage";
import Header from "../pageObjects/Header";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const organizationFolderPage = new OrganizationFolderPage();
const header = new Header();

const LOCAL_PORT = Cypress.env("local.port");
const LOCAL_HOST = Cypress.env("local.host");

describe("US_06.005 | Organization folder > Delete Organization Folder", () => {
  let project = genData.newProject();
  const baseUrl = `http://${LOCAL_HOST}:${LOCAL_PORT}`;

  beforeEach(() => {
    dashboardPage
      .clickNewItemMenuLink();
    newJobPage
      .typeNewItemName(project.name)
      .selectOrganizationFolder()
      .clickOKButton();
    organizationFolderPage
      .clickSaveButton()
      .getJobHeadline()
      .should("contain.text", project.name);
  });

  it("TC_06.005.01 | Delete Organization Folder from a sidebar menu", () => {
    organizationFolderPage
      .clickSideMenuDeleteLink()
      .clickYesButton();

    organizationFolderPage
      .getJobHeadline()
      .should("not.contain.text", project.name);
  });

  it("TC_06.005.02 | Delete Organization Folder from breadcrumbs dropdown menu", () => {
    organizationFolderPage
      .selectBreadcrumbsFolderDropdownMenu()
      .clickBreadcrumbsFolderDropdownMenu()
      .clickDropdownMenuDeleteLink()
      .clickYesButton();

    organizationFolderPage
      .getJobHeadline()
      .should("not.contain.text", project.name);
  });

  it("TC_06.005.03 | Delete Organization Folder from project status table on Dashboard page", () => {
    header
      .clickJenkinsLogo();
    dashboardPage
      .clickJobTableDropdownChevron()
      .clickDeleteOrganizationFolderDropdownMenuItem()
      .clickYesButton()

    dashboardPage
      .getJobHeadline()
      .should("not.contain.text", project.name);
    organizationFolderPage
      .getJobHeadline()
      .should("not.contain.text", project.name);
  });

  it('TC_06.005.04 | Delete Organization Folder', () =>{
    organizationFolderPage
      .clickSideMenuDeleteLink()
      .clickYesButton();
    dashboardPage
      .getJobHeadline()
      .and('not.contain', 'No jobs found');
  })

  it('TC_06.005.05 | Delete Organization Folder from the Folder page via API', () =>{

    cy.getCrumbToken(baseUrl).then(({ crumb, crumbField }) => {
      cy.log('Deleting the Organization Folder via API');
      cy.request({
        method: 'POST',
        url: `${baseUrl}/job/${project.name}/doDelete`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          [crumbField]: crumb
        }
      }).then(deleteResponse => {
        expect(deleteResponse.status).to.eq(200);
      });
  
      cy.log('Verifying the Organization Folder is deleted');
      cy.request({
        method: 'GET',
        url: `${baseUrl}/job/${project.name}/`,
        failOnStatusCode: false
      }).then(getResponse => {
        expect(getResponse.status).to.eq(404);
      });
    });
  });
});
