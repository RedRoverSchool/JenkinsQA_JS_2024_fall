import JobPage from "./JobPage";

class ProjectConfigure
{
    getPrjDescriptionField = ()=>  cy.get('textarea[name="description"]')
    getSaveBtn = () => cy.get('button[formnovalidate="formNoValidate"]')
    



    addProjectDescription(projectDescription)
    {
        this.getPrjDescriptionField().type(projectDescription)
        return this
    }

    clickSaveButton() {
        this.getSaveBtn().click()
        return new JobPage
    }
}
export default ProjectConfigure