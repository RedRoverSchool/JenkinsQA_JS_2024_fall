/// <reference types="cypress" />
import NewJobPage from "./NewJobPage";
import OrgFolderStatus from "./OrgFolderStatus";

class DashboardPage {
  getNewItemLink = () => cy.get('a[href="/view/all/newJob"]');

  clickNewItemMenuLink() {
    this.getNewItemLink().click({ force: true });
    return new NewJobPage();
  }

  addNewProj() {
    this.getNewItemLink().click();
    return new NewJobPage();
  }

  clickYourOrgFolderOnDashboardard = (encodedProjectName) => {
    cy.get(`td a[href$="${encodedProjectName}/"]`).click();
    return new OrgFolderStatus();
  };

  checkProjectName = (encodedProjectName, displayName) => {
    cy.get(`td a[href$="${encodedProjectName}/"]`).should(
      "have.text",
      displayName
    );
  };
}
export default DashboardPage;
