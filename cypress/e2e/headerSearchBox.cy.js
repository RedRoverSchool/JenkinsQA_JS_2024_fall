/// <reference types="cypress" />

describe('US_14.002 | Header > Search Box', () => {
  it("Header > Search Box | User can select suggestion to auto-fill and complete the search", () => {
    cy.get('a[href="/view/all/newJob"]').click();
    cy.get('.jenkins-input').type('testJob');
    cy.get('.label').contains('Freestyle project').click();
    cy.get('#ok-button').click();
    cy.get('textarea[name="description"]').type('...some description...')
    cy.get('button[formnovalidate="formNoValidate"]').click();
    cy.get('a[href="/"]').first().click();
    cy.get("#search-box").click();
    cy.get("#search-box").type("te");
    cy.get("#search-box-completion li").first().click();
    cy.get("#search-box").type('{enter}');
    cy.get(".jenkins-app-bar h1").should('contain.text', 'testJob')
  });
  
  it('TC_14.002-06-A | If there are multiple matches, the result page displays all matches', () => {
      cy.get('#search-box').clear().type('conf{enter}'); 
      cy.url().should('include', '/search');
      cy.get('.yui-ac-content').its('length').should('be.greaterThan', 0);
      cy.get('#item_config').should('contain.text', 'config');
      cy.get('#item_configure').should('contain.text', 'configure');
    })
});