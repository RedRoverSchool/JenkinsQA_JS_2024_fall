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

  it('TC_14.002-04 | Message that no matches found', ()=>{
    let unicNameProject = "The most unique project name is 12-35658_312"
    cy.get('input[name="q"]').type(unicNameProject + '{enter}')
    cy.url().should('includes', '/search/')
    // Check color and text contetn
    cy.get('div#main-panel > h1').should('have.css', 'color', 'rgb(20, 20, 31)')
    cy.get('div#main-panel > h1').contains("Search for 'The most unique project name is 12-35658_312'")
    // Check color and text error massage
    cy.get('div#main-panel > div.error').should('have.css', 'color', 'rgb(230, 0, 31)')
    cy.get('div#main-panel > div.error').contains("Nothing seems to match.")
  })
  
  it('TC_14.002-06-A | If there are multiple matches, the result page displays all matches', () => {
        cy.get('#search-box').clear().type('conf{enter}'); 
        cy.url().should('include', '/search');
        cy.get('.yui-ac-content').its('length').should('be.greaterThan', 0);
        cy.get('#item_config').should('contain.text', 'config');
        cy.get('#item_configure').should('contain.text', 'configure');
  });

  it('TC_14.002.07 | Verify the search box provides auto-completion', () => {

    const autoCompletionItems = ['config', 'configure'];
    
    cy.get('input#search-box').type('con');
    cy.get('div#search-box-completion li')
      .filter(':visible')
      .should('have.length', autoCompletionItems.length)
      .each((item, index) => {
        cy.wrap(item).should('have.text', autoCompletionItems[index]);
      });

  });
  
  it('TC_14.002.09 | Verify that the selection of an auto-complete suggestion redirects to the relevant page', () => {
    
    cy.get('input#search-box').type('lo');
    cy.get('div#search-box-completion li').eq(0).click();
    cy.get('input#search-box').type('{Enter}');

    cy.get('div#main-panel h1').should('include.text', 'Log Recorders');

  });

  it("Header > Search Box | Verify that user can not see suggested results searched with with Upper Case characters with Insensitive mode being on", () => {
    cy.get("*.hidden-sm").contains('admin').click()
    cy.get(".task-link-text").contains('Configure').click({force: true})
    cy.get("[name='insensitiveSearch']").check({force: true})
    cy.get("[name='Submit']").click()
    cy.get("#search-box").click();
    cy.get("#search-box").type("MA");
    
    cy.get(".yui-ac-bd").should('have.text', 'manage')
  })
});

