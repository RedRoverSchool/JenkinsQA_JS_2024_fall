/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
const itemName = faker.commerce.productName();
const viewName = faker.word.noun();


describe('US_16.002 | Dashboard > Create View', ()=> {

    const dashboard = 'http://localhost:8080'
    const createNewJob = '[href="newJob"]'
    const selectFreeStyleProject = '.hudson_model_FreeStyleProject'
    const btnSubmit = '.jenkins-submit-button'
    const btnNewView = '.addTab'
    const selectListViewType = ':nth-child(2) > .jenkins-radio__label'

    it.skip('TC_16.002.05 | Dashboard > Create View | Create "List view" from Dashboard', ()=> {

        // Preconditions
        cy.get(createNewJob).click() 
        cy.get('#name').type(itemName)
        cy.get(selectFreeStyleProject).click() 
        cy.get('#ok-button').click()
        cy.get(btnSubmit).click()
        cy.visit(dashboard)


        // Steps
        cy.get(btnNewView).click()
        cy.get('#name').type(viewName)
        cy.get(selectListViewType).click()
        cy.get('#ok').click()
        cy.get(btnSubmit).click()

        // Expected results
        cy.url().should('eq', `http://localhost:8080/view/${viewName}/`)
        cy.get('.active > a').should('have.text', viewName)

    })
})