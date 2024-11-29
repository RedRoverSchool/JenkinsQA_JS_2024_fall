/// <reference types = "cypress" />

import genData from "../fixtures/genData";
import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import OrganizationFolderPage from "../pageObjects/OrganizationFolderPage";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const organizationFolderPage = new OrganizationFolderPage();

describe("US_06.005 | Organization folder > Delete Organization Folder", () => {
  let project = genData.newProject();

  beforeEach(() => {
    dashboardPage.clickNewItemMenuLink();
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
});
