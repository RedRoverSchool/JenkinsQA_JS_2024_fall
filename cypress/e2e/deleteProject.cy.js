/// <reference types="cypress" />
describe('US_001|Delete the project', ()=>{
    beforeEach(() => {cy.visit('http://localhost:8080/login?from=%2F')
        cy.get('input[id="j_username"]').type('admin')
        cy.get('input[id="j_password"]').type('Password123')
        cy.get('button').contains('Sign in').click()})

    it('TC-001-1-A|Create a project', ()=>{
        cy.get('span').contains('New Item').click()
        cy.wait(5000)
        cy.get('input[name="name"]').clear()
        cy.get('input[name="name"]').type('NewPrj')
        cy.get('span.label').contains('Freestyle project').click()
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Save').click()
        cy.url().should('include', 'NewPrj')
      
    })
    it('TC-001-1-A|Delete a project', ()=>{
        cy.get('span').contains('NewPrj').scrollIntoView()
        cy.get('span').contains('NewPrj').realHover()
        cy.get('button[data-href="http://localhost:8080/job/NewPrj/"]').click()
        cy.get('button[href="/job/NewPrj/doDelete"]').click()

        cy.get('button.jenkins-button.jenkins-button--primary ').click()
        cy.get('span').contains('NewPrj').should('not.exist')
      
    })

})