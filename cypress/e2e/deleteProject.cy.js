/// <reference types="cypress"/>
describe('US_001|Delete the project', ()=>{
    const LOCAL_PORT = Cypress.env('local.port');
    const LOCAL_HOST = Cypress.env('local.host');

    it('TC-001-1-A|Create a project', ()=>{
        cy.get('span').contains('New Item').click()
        cy.wait(5000)
        cy.get('input[name="name"]').clear()
        cy.get('input[name="name"]').type('NewPrj')
        cy.get('span.label').contains('Freestyle project').click()
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Save').click()
        cy.url().should('include', 'NewPrj')
        cy.get('#jenkins-head-icon').click()
    
        cy.get('span').contains('NewPrj').scrollIntoView()
        cy.get('span').contains('NewPrj').realHover()
        cy.get(`button[data-href="http://${LOCAL_HOST}:${LOCAL_PORT}/job/NewPrj/"]`).click()
        cy.get('button[href="/job/NewPrj/doDelete"]').click()

        cy.get('button.jenkins-button.jenkins-button--primary ').click()
        cy.get('span').contains('NewPrj').should('not.exist')
      
    })

})
