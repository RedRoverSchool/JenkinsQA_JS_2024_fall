import JobPage from "./JobPage";

class ProjectConfigure
{
    getPrjDescriptionField = ()=>  cy.get('textarea[name="description"]')
    getSaveBtn = () => cy.get('button[formnovalidate="formNoValidate"]')
    



    addNewProjDescription()
    {
        this.getPrjDescriptionField().type('...some description...')
        return this
    }

    clickSaveBtn()
    {
        this.getSaveBtn().click()
        return new JobPage
    }
}
export default ProjectConfigure