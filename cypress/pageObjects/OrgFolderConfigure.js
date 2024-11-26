import DashboardPage from "./DashboardPage";
import OrgFolderStatus from "./OrgFolderStatus";

class OrgFolderConfugure {
  getSaveBtn = () => cy.get('button[name="Submit"]');
  getdashboardBtn = () => cy.get('#breadcrumbs a[href="/"]');
  getDisplayNameInput = () => cy.get('input[name="_.displayNameOrNull"]');
  getDescriptionInput = () => cy.get('textarea[name="_.description"]');

  clickDashboardBtn() {
    this.getdashboardBtn().click();
    return new DashboardPage();
  }

  typeDisplayName = (displayName) => {
    this.getDisplayNameInput().type(displayName);
    return this;
  };

  typeDescription = (description) => {
    this.getDescriptionInput().type(description);
    return this;
  };

  clickSaveBtn() {
    this.getSaveBtn().click();
    return new OrgFolderStatus();
  }
}
export default OrgFolderConfugure;
