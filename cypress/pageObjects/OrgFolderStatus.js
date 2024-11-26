import OrgFolderConfugure from "./OrgFolderConfigure";
import DashboardPage from "./DashboardPage";

class OrgFolderStatus {
  getConfigureNavBar = () => cy.get('a[href$="/configure"].task-link');
  getDescription = () => cy.get("#view-message");
  getDisplayName = () => cy.get("h1");
  getFolderName = () => cy.get("#main-panel");
  getdashboardBtn = () => cy.get('#breadcrumbs a[href="/"]');

  clickConfigureNavBar() {
    this.getConfigureNavBar().click();
    return new OrgFolderConfugure();
  }

  checkDescription = (description) => {
    this.getDescription().should("have.text", description);
    return this;
  };

  checkDisplayName = (displayName) => {
    this.getDisplayName()
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal(displayName);
      });
    return this;
  };

  checkFolderName = (prjName) => {
    this.getFolderName().should("contain.text", `Folder name: ${prjName}`);
    return this;
  };

  checkUrlEndsWithFolderName = (encodedProjectName) => {
    cy.url().should("match", new RegExp(`${encodedProjectName}\/?$`));
    return this;
  };

  clickDashboardBtn() {
    this.getdashboardBtn().click();
    return new DashboardPage();
  }
}
export default OrgFolderStatus;
