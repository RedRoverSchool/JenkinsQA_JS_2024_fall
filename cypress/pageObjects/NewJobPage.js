import ProjectConfigure from "./ProjectConfigurePage"
class NewJobPage
{
    getPrjNameField = ()=>  cy.get('.jenkins-input')
    getFreeStlPrjType = () =>  cy.get('.label').contains('Freestyle project')
    getOKBtn = () =>  cy.get('#ok-button')
    getItemNameInvalidErrorMessage = () => cy.get("#itemname-invalid")


    addNewProjName(prjName) {
        this.getPrjNameField().type(prjName)
        return this
    }
    pickFreeStlPrj() {
        this.getFreeStlPrjType().click()
        return this
    }
    okBtnClick()
    {
        this.getOKBtn().click()
        return new ProjectConfigure()
    }

}
export default NewJobPage