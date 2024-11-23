/// <reference types="cypress"/>

describe('US_01.001 | FreestyleProject > Add description', () => {

    const newItem = 'a[href="newJob"]'
    const itemNameField = '#name'
    const FreestyleProject = '.hudson_model_FreeStyleProject'
    const okBtn = '#ok-button'
    const descriptionField = '[name="description"]'
    const submitBtn = 'button[name="Submit"]'
    const editDescriptionBtn = '[id="description-link"]'

    beforeEach('Create freestyle project', () => {
        cy.get(newItem).click()
        cy.get(itemNameField).type("new_Freestyle_project")
        cy.get(FreestyleProject).click()
        cy.get(okBtn).click()
      })

    it('TC_01.001.06 | FreestyleProject > Add description | project creation', () => {
        cy.get(descriptionField).type('Some description')
        cy.get(submitBtn).click()
        cy.get(editDescriptionBtn).should('be.visible')
     })
  })
  