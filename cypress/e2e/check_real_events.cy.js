/// <reference types="cypress"/>
describe('Check RE', ()=>{
    it('Checks each in Jenkins', ()=>{
        // cy.visit('http://localhost:8080/login?from=%2F')
        // cy.get('input[id="j_username"]').type('admin')
        // cy.get('input[id="j_password"]').type('Password123')
        // cy.get('button').contains('Sign in').click()
      
        cy.get('a').contains('Dashboard').realHover()
       
    cy.wait(5000)
      
       cy.get('[href="/"] .jenkins-menu-dropdown-chevron')
       .should('be.visible').click()
     // cy.get('div#tasks div.task')
     cy.get('a.jenkins-dropdown__item ')

     .each(($els) => {
       // let eText = cy.wrap($els).invoke('text')
       let eText = $els.text().trim()
       cy.log(eText)
        if (eText == 'Manage Jenkins') {cy.wrap($els).click()}  
        
      })
    })
})