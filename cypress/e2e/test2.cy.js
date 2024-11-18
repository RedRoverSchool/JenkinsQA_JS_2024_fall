/// <reference types="cypress" />

describe('example shop',() => {
    it("Jenkins_test",() => {
        cy.get('.task-link-text').contains('New Item').click({force:true})
    })
    
  })
