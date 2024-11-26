import ProjectConfigure from "./ProjectConfigurePage";
import OrgFolderConfugure from "./OrgFolderConfigure";

class NewJobPage {
  getPrjNameField = () => cy.get(".jenkins-input");
  getFreeStlPrjType = () => cy.get(".label").contains("Freestyle project");
  getOKBtn = () => cy.get("#ok-button");
  getItemNameInvalidErrorMessage = () => cy.get("#itemname-invalid");
  getOrgFolderPrjType = () => cy.get(".jenkins_branch_OrganizationFolder");


  addNewProjectName(prjName) {
        this.getPrjNameField().type(prjName)
        return this
    }
    selectFreestyleProject() {
        this.getFreeStlPrjType().click()
        return this
    }
    clickOKButton() {
        this.getOKBtn().click()
        return new ProjectConfigure()
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
