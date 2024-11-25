/// <reference types="cypress" />

import headerData from "../fixtures/headerData.json";
import messages from "../fixtures/messages.json";
import {project_name} from "../fixtures/pomFixtures/header.json";
import {leftSideBar, endPoint} from "../fixtures/dashboardPage.json"

import Header from "../pageObjects/Header";
import JobPage from "../pageObjects/JobPage";
import SearchResuls from "../pageObjects/SearchResultsPage";

describe('US_14.002 | Header > Search Box', () => {

  const header = new Header();
  const jobPage = new JobPage();
  const searchResults = new SearchResuls();

  let searchTerm = 'pipeline'
  let newJobFolderName = 'conFolder'
  const dashboard = '#breadcrumbBar .model-link'

  it("TC_14.002.05 | User can select suggestion to auto-fill and complete the search", () => {
    cy.get('a[href="/view/all/newJob"]').click();
    cy.get('.jenkins-input').type(project_name);
    cy.get('.label').contains('Freestyle project').click();
    cy.get('#ok-button').click();
    cy.get('textarea[name="description"]').type('...some description...')
    cy.get('button[formnovalidate="formNoValidate"]').click();
    cy.get('a[href="/"]').first().click();
    cy.get("#search-box").click();

   header
   .typeSearchTerm(project_name)
   .clickSearchOption()
   .searchTerm()

    jobPage.getHeadlineIndex().should('contain.text', project_name)
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

  it('TC_14.002-06-A | Multiple matches are displayed on the result page', () => {
    header.search('conf');

    searchResults.getConfigItem().should('contain.text', 'config');
    searchResults.getConfigureItem().should('contain.text', 'configure');
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

    header.search(headerData.search.input.noMatches);

    searchResults.getNoMatchesErrorMessage()
                 .should('have.text', messages.search.noMatchesError);

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
    cy.get('#main-panel h1').contains(`${headerData.textMessages.heading} '${searchTerm}'`)
    cy.get('div.error')
      .should('have.text', headerData.textMessages.error)
      .and('have.css', 'color', headerData.cssRequirements.error)
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

  it('TC_14.002.16 | Finds a build by its number', () => {
    cy.log('create first build')
    cy.contains('.task-link', 'New Item').click()
    cy.get('input#name').type(newJobFolderName)
    cy.get('li[class*="FreeStyleProject"]').click()
    cy.get('button#ok-button').click()
    cy.get('button[name="Submit"]').click()
    cy.contains(`a[href*="/job/${newJobFolderName}/build"]`, 'Build Now').click()
    cy.get('#breadcrumbs li:first-child').click()
    cy.log('create second build')
    cy.get(`td:last-child a[href*="job/${newJobFolderName}/build"]`).click()
    cy.get(`td:nth-child(3) a[href="job/${newJobFolderName}/"]`).click()
    cy.log('get all builds') 
    cy.get('a.build-link.display-name').then(($els)=>{
      return Cypress.$.makeArray($els).map($el => $el.innerText)
    }).as('arrayAllBuilds')
    cy.log('search by build number')
    cy.get('@arrayAllBuilds').then(($array) => {
      $array.forEach(build => {
        cy.get('input#search-box').type(`${newJobFolderName} ${build}`)
        cy.get('li[style]:not([style="display: none;"])')
            .should('be.visible')
            .and('contain', `${newJobFolderName} ${build}`)
        cy.get('input#search-box').type('{enter}')
        cy.get('.jenkins-build-caption h1').should('contain', build) 
        cy.url().should('contain', build.slice(1))
      })
    });
  })

  beforeEach(function () {
    cy.get("#side-panel .task").as("sideBarLink");
  });

  leftSideBar.forEach((pageName, el) => {
    it(`TC_14.002.17 | Verify that ${pageName} page in Jenkins has a search box on its top right`, () => {
      cy.get("@sideBarLink").eq(el).click();
      cy.url().should("contain", endPoint[el]);

      cy.get('[id="search-box"]').should("be.visible");
    });
  });
});

