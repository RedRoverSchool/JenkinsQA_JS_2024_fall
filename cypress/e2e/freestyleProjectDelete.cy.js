/// <reference types="cypress"/>

describe('Freestyle project Delete', () => {
  beforeEach('Create freestyle project', () => {
    cy.get('a[href="newJob"]').click()
    cy.get('#name').type("new_Freestyle_project")
    cy.get('.hudson_model_FreeStyleProject').click()
    cy.get('#ok-button').click()
    cy.get('button[name="Submit"]').click()
    cy.get('#jenkins-name-icon').click()
  })

  it('Freestyle project| Verify confirmation window appears before deletion.', function () {
    cy.get('tbody tr td a.jenkins-table__link').realHover({ position: "center" });
    cy.get('table#projectstatus button.jenkins-menu-dropdown-chevron').should('be.visible').click()
    cy.get('button.jenkins-dropdown__item').contains('Delete').click()
    cy.get('.jenkins-dialog__contents')
  .should('contain.text', 'Delete the Project ‘new_Freestyle_project’?')
   });



});
