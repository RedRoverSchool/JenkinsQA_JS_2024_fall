import ProjectConfigure from "./ProjectConfigurePage"
class NewJobPage
{
    getPrjNameField = ()=>  cy.get('.jenkins-input')
    getFreeStlPrjType = () =>  cy.get('.label').contains('Freestyle project')
    getOKBtn = () =>  cy.get('#ok-button')
    getItemNameInvalidErrorMessage = () => cy.get("#itemname-invalid")
    getUnsaveItemInvalidName = () => cy.get("#itemname-invalid").contains(/is an unsafe character/)
    getEmptyItemInvalidName = () => cy.get("#itemname-required")

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
    addUnsaveNameItem() {
        this.getPrjNameField().type("<")
        return this
    }

    addEmptyNameItem() {
        this.getPrjNameField().clear()
        return this;
    }
}
export default NewJobPage