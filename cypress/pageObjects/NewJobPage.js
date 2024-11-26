import ProjectConfigure from "./ProjectConfigurePage";
import OrgFolderConfugure from "./OrgFolderConfigure";

class NewJobPage {
  getPrjNameField = () => cy.get(".jenkins-input");
  getFreeStlPrjType = () => cy.get(".label").contains("Freestyle project");
  getOKBtn = () => cy.get("#ok-button");
  getItemNameInvalidErrorMessage = () => cy.get("#itemname-invalid");
  getOrgFolderPrjType = () => cy.get(".jenkins_branch_OrganizationFolder");

  addNewProjName(prjName) {
    this.getPrjNameField().type(prjName);
    return this;
  }
  pickFreeStlPrj() {
    this.getFreeStlPrjType().click();
    return this;
  }
  okBtnClick() {
    this.getOKBtn().click();
    return new ProjectConfigure();
  }
  okBtnClickForOrgFolder() {
    this.getOKBtn().click();
    return new OrgFolderConfugure();
  }
  pickOrgFolder() {
    this.getOrgFolderPrjType().click();
    return this;
  }
}
export default NewJobPage;
