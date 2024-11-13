/// <reference types="cypress" />
describe('example shop',() => {
  it('jenkins_test', () => {
    cy.get('.task-link-text').contains('New Item').click({force: true})
    cy.get('#name.jenkins-input').type('New Name1')
    cy.get('.desc').eq(0).click()
    cy.get('#ok-button').click()

  })
})