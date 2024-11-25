/// <reference types="cypress" />
describe('US_13.003 | User > Configuration', ()=>{
    it('TC_13.003.01 | Edit the profile description from the account settings page by clicking on your username' , ()=>{
        cy.get('[href ="/user/admin"]').click()
        cy.get('#description-link').click()
        cy.get(".jenkins-input").clear()
        .type("My new description")
        cy.get('[name="Submit"]').click()
        cy.get('#description').should('have.text', "My new description")
    })

    it.only('TC_13.003.03 | Rename user', () => {
        cy.get('[href^="/user"]').click()
    })
})