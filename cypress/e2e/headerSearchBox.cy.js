/// <reference types="cypress" />

describe("Header > Search Box", () => {
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

  it.only("Header > Search Box | Verify that user can not see suggested results searched with with Upper Case characters with Insensitive mode being on", () => {
    cy.get("*.hidden-sm").contains('admin').click()
    cy.get(".task-link-text").contains('Configure').click({force: true})
    cy.get("[name='insensitiveSearch']").check({force: true})
    cy.get("[name='Submit']").click()
    cy.get("#search-box").click();
    cy.get("#search-box").type("MA");
    cy.get(".yui-ac-bd").should('have.text', 'manage')
  })
});
