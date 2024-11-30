/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";
import newJobPageData from "../fixtures/newJobPageData.json"
import configurePageData from "../fixtures/configurePageData.json"

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();


describe('US_01.004 | FreestyleProject > Delete Project', () => {

    it.only('TC_01.004.04 | FreestyleProject > Delete Project|Delete a project from the Project Page', () => {
        //Create a project
        dashboardPage.clickNewItemMenuLink()
        newJobPage.typeNewItemName(newJobPageData.projectName)
            .selectFreestyleProject()
            .clickOKButton()
        freestyleProjectPage.typeJobDescription(configurePageData.projectDescription)
            .clickSaveButton()

        cy.url().should('include', 'Project%20Name')

        //Delete the project
        freestyleProjectPage.clickDeleteMenuItem()
            .clickYesButton()

        dashboardPage.getAllJobNames().should('not.exist', newJobPageData.projectName)
    })

    it('TC_01.004.06| Verify user able to delete a project from Project page', () => {
        //Create a project
        cy.get('span.task-link-text').contains('New Item').click({ force: true });
        cy.get('input[name="name"]').type('Pro2');
        cy.get('span.label').contains('Freestyle project').click();
        cy.get('button').contains('OK').click();
        cy.get('button').contains('Save').click();
        //Delete the project
        cy.get('.task .task-link-wrapper a[data-title="Delete Project"] > span:last-of-type').click()
        cy.get(".jenkins-dialog>div>[data-id='ok']").contains("Yes").click({ force: true });
        cy.get('#main-panel h1').should('have.text', "Welcome to Jenkins!");
    })

    it('TC_01.004.09 | Verify user able to delete a project from Project page', () => {
        //Create a project
        cy.get('span.task-link-text').contains('New Item').click({ force: true });
        cy.get('input[name="name"]').type('Pro3');
        cy.get('span.label').contains('Freestyle project').click();
        cy.get('button').contains('OK').click();
        cy.get('button').contains('Save').click();
        //Delete the project
        cy.get('.task .task-link-wrapper a[data-title="Delete Project"] > span:last-of-type').click()
        cy.get(".jenkins-dialog >div>[data-id='cancel']").contains("Cancel").click({ force: true });
        cy.get('#main-panel h1').should('have.text', "Pro3");
    })
})
