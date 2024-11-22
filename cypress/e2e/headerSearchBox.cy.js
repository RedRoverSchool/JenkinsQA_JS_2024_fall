
/// <reference types="cypress" />
import searchBoxData from "../fixtures/headerSearchBox.json"

describe('US_14.002 | Header > Search Box', () => {
  let searchTerm = 'pipeline'
  let newJobFolderName = 'conFolder'
  const dashboard = '#breadcrumbBar .model-link'

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

  it('TC_14.002-04 | Message that no matches found', () => {
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
    cy.get("*.hidden-sm").contains('admin').click();
    cy.get(".task-link-text").contains('Configure').click({ force: true });
    cy.get("[name='insensitiveSearch']").check({ force: true });
    cy.get("[name='Submit']").click();
    cy.get("#search-box").click();
    cy.get("#search-box").type("MA");
    cy.get(".yui-ac-bd").should('have.text', 'manage')
  })

  it('TC_14.002.10 | Verify that the warning message is displayed when no matches are found', () => {
    cy.get('input#search-box').type('no matches{Enter}');
    cy.get('.error').should('have.text', 'Nothing seems to match.');

  });

  it('TC_14.002-08-A |Case insensitive search', () => {
    cy.get('.login .model-link').should('be.visible').click()
    cy.url().should('include', '/user');
    cy.get('a[href$="/configure"]').click({ force: true });
    cy.get("label[class='attach-previous ']").should('contain', 'Insensitive search tool').and('exist')
    cy.get("input[name='insensitiveSearch']").should("exist")
      .uncheck({ force: true })
      .should("not.be.checked")
      .check({ force: true })
      .should("be.checked");
  });

  it('TC_14.002.01 | Auto-Completion Suggestion Selection', () => {
    cy.get('input[id="search-box"]').click().clear()
      .type('man')
    cy.get('li').contains('manage')
      .click()
    cy.get('li').contains('manage').should('be.visible')
  })

  it('TC_14.002.02 | Verify error message appears when no matches found', () => {
    cy.get('input#search-box').type(`${searchTerm}{enter}`)
    cy.get('li[style]')
      .should('not.be.visible')
    cy.get('#main-panel h1').contains(`${searchBoxData.textMessages.heading} '${searchTerm}'`)
    cy.get('div.error')
      .should('have.text', searchBoxData.textMessages.error)
      .and('have.css', 'color', searchBoxData.cssRequirements.error)
  })

  it('TC_14.002.13 | Header > Search Box  | Verify auto-fill suggestions contain the search term', () => {
    let searchterm = 'con'
    // create a new organization folder
    cy.get('a[href*="newJob"].content-block__link').click()
    cy.get('input#name').type(newJobFolderName)
    cy.get('li[class*="OrganizationFolder"]').click()
    cy.get('button#ok-button').click()
    cy.get('button[formnovalidate="formNoValidate"]').click()
    cy.get('li:first-child a.model-link').click()

    cy.get('input#search-box').type(searchterm)
    cy.get('li[style]:not([style="display: none;"])').each(($el) => {
      cy.wrap($el).invoke('text').should('contain', searchterm)
    })
  })

  it('TC_14.002.12 | Verify that Dashboard page in Jenkins has a search box on its top right', () => {
    cy.get('.main-search__input').should('be.visible').and('have.attr', 'placeholder');
  })

  it('TC_14.002.11 | Verify that Dashboard page has a Search box on its top right', () => {
    cy.get(dashboard).should('be.visible')
    cy.get('header').should("exist")
    cy.get('#search-box').should("exist")
  })
});

/// <reference types="cypress" />

describe('US_14.002 | Header > Search Box', () => {

  it('TC_14.002-01-A | Header > Search Box | Dashboard page in Jenkins has a search box on its top right', () => {
    cy.get('#search-box').then($searchBar => {
      const rect = $searchBar[0].getBoundingClientRect();
      const windowWidth = Cypress.config('viewportWidth');
      expect(rect.top).to.be.closeTo(0, 10);
      expect(windowWidth - rect.right).to.be.closeTo(0, 347);
    });
  });
});