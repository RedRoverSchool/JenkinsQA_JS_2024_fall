/// <reference types="cypress" />
import NewJobPage from "./NewJobPage";
import OrgFolderStatus from "./OrgFolderStatus";

class DashboardPage {
  getNewItemLink = ()=>  cy.get('a[href="/view/all/newJob"]');
  getCreateJobBtn = () =>  cy.get('a[href="newJob"]').contains("Create a job");
  getMainPanel = () => cy.get('div#main-panel');
  getJobTable = () => cy.get("table.jenkins-table.sortable");

  clickNewItemMenuLink() {
        this.getNewItemLink().click({ force: true });
        return new NewJobPage();
    }

  addNewProject() {
    this.getNewItemLink().click();
    return new NewJobPage();
  }
  
  clickCreateJobBtn()
    {
        this.getCreateJobBtn().click()
        return new NewJobPage()
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
