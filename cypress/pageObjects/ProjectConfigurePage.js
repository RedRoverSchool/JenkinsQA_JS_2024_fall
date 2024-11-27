/// <reference types="cypress" />

import JobPage from "./JobPage";

class ProjectConfigure {

    getPrjDescriptionField = () => cy.get('textarea[name="description"]')
    getSaveBtn = () => cy.get('button[formnovalidate="formNoValidate"]')
    getMovebtn = () => cy.get('span').contains('Move')
    getProjectDesctination = () => cy.get('select[name="destination"]')
    getProjectInfoSection = () => cy.get('#main-panel')

    addProjectDescription(projectDescription) {
        this.getPrjDescriptionField().type(projectDescription)
        return this
    }

    clickSaveButton() {
        this.getSaveBtn().click()
        return new JobPage
    }

    clickOnMoveTask() {
        this.getMovebtn().click()
        return this
    }

    selectNewProjectDestination(movingDestination) {
        this.getProjectDesctination().select(movingDestination)
        return this
    }

};

export default ProjectConfigure;