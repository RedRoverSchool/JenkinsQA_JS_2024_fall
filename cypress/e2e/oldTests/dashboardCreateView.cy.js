/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';
const itemName = faker.commerce.productName();
const viewName = faker.word.noun();

describe('US_16.002 | Dashboard > Create View', () => {
    const btnNewItem = '[href="/view/all/newJob"]'
    const btnSubmit = '[name="Submit"]'
    const btnNewView = '[href="/newView"]'
    const selectFreeStyleProject = '.hudson_model_FreeStyleProject'
    const selectMyView = '[for="hudson.model.MyView"]'

    it('TC_16.002.06 | Dashboard > Create View | Create "My View" from Dashboard', () => {
        
        // creating new item
        cy.get(btnNewItem).click()
        cy.get('#name').type(itemName)
        cy.get(selectFreeStyleProject).click()
        cy.get('#ok-button').click()
        cy.get(btnSubmit).click()
        cy.visit('http://localhost:8080/')

        // creating new 'My View'
        cy.get(btnNewView).click()
        cy.get('#name').type(viewName)
        cy.get(selectMyView).click()
        cy.get('#ok').click()

        // assertions
        cy.url().should('eq', `http://localhost:8080/view/${viewName}/`)
        cy.get('.tabBar>.active').should('have.text', viewName)
    })

})