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

describe("US_06.005 | Organization folder > Delete Organization Folder", () => {
  let project = genData.newProject();

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
      .clickOKButton();

    organizationFolderPage
      .getJobHeadline()
      .should("not.contain.text", project.name);
  });

  it("TC_06.005.02 | Delete Organization Folder from breadcrumbs dropdown menu", () => {
    organizationFolderPage
      .selectBreadcrumbsFolderDropdownMenu()
      .clickBreadcrumbsFolderDropdownMenu()
      .clickDropdownMenuDeleteLink()
      .clickOKButton();

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
      .clickSubmitDeletingButton();

    dashboardPage
      .getJobHeadline()
      .should("not.contain.text", project.name);
    organizationFolderPage
      .getJobHeadline()
      .should("not.contain.text", project.name);
  });

  it.only('TC_06.005.04 | Delete Organization Folder', () =>{
    organizationFolderPage
      .clickSideMenuDeleteLink()
      .clickOKButton();
    dashboardPage
      .getJobHeadline()
      .and('not.contain', 'No jobs found');
  })

});
