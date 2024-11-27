/// <reference types="cypress" />

import Header from "../pageObjects/Header";
import JobPage from "../pageObjects/JobPage";
import SearchResuls from "../pageObjects/SearchResultsPage";
import DashboardPage from "../pageObjects/DashboardPage";
import UserConfigurePage from "../pageObjects/UserConfigurePage";

import headerData from "../fixtures/headerData.json";
import searchResultsData from "../fixtures/searchResultsData.json";
import messages from "../fixtures/messages.json";
import newJobPageData from "../fixtures/newJobPageData.json";
import configurePageData from "../fixtures/configurePageData.json"

const header = new Header();
const jobPage = new JobPage();
const dashboardPage = new DashboardPage();
const searchResults = new SearchResuls();
const userConfigurePage = new UserConfigurePage();

describe('US_14.002 | Header > Search Box', () => {

  it("TC_14.002.05 | User can select suggestion to auto-fill and complete the search", () => {
    dashboardPage.addNewProject()
                 .addNewProjectName(newJobPageData.projectName)
                 .selectFreestyleProject()
                 .clickOKButton()
                 .addProjectDescription(configurePageData.projectDescription)
                 .clickSaveButton();

    header.typeSearchTerm(newJobPageData.projectName)
          .clickFirstOptionFromACBox()
          .searchTerm();

    jobPage.getHeadlineIndex()
           .should('have.text', newJobPageData.projectName);
  });

  it('TC_14.002.06 | Multiple matches are displayed on the result page', () => {
    header.search('conf');

    searchResults.getConfigItem().should('contain.text', 'config');
    searchResults.getConfigureItem().should('contain.text', 'configure');
  });

  it('TC_14.002.07 | Verify the search box provides auto-completion', () => {

    header.typeSearchTerm(headerData.search.input.matchForCon);
    
    header.getSearchAutoCompletionBox()
          .filter(':visible')
          .should('have.length', headerData.search.autoCompletionItems.length)
          .each((item, index) => {
            cy.wrap(item).should('have.text', headerData.search.autoCompletionItems[index]);
          });
  });

  it('TC_14.002.09 | Verify that the selection of an auto-complete suggestion redirects to the relevant page', () => {

    header.typeSearchTerm(headerData.search.input.matchForLo)
          .clickFirstOptionFromACBox()
          .searchTerm();

    searchResults.getTitle()
                 .should('include.text', searchResultsData.title.logRecorders);

  });

  it("TC_14.002.03 | Verify that user can not see suggested results searched with with Upper Case characters with Insensitive mode being on", () => {
    header.clickUserDropdownLink()
          .clickUserConfigureItem();
    userConfigurePage.checkCheckBox()
                     .clickOnSaveBtn();
    header.typeSearchTerm(headerData.search.input.upperCaseMatchForManage);

    header.getSearchAutoCompletionBox()
          .should('have.text', headerData.search.searchSuggestions.manage);
  })

  it('TC_14.002.10 | Verify that the warning message is displayed when no matches are found', () => {

    header.search(headerData.search.input.noMatches);

    searchResults.getNoMatchesErrorMessage()
                 .should('have.text', messages.search.noMatchesError);

  });

  it('TC_14.002-08 | Case insensitive search', () => {
    header.clickUserDropdownLink();
    header.clickUserConfigureItem();

    userConfigurePage.getInsensitiveSearchLabel().should('contain', 'Insensitive search tool');
    userConfigurePage.getInsensitiveSearchCheckBox()
      .should('exist').and('be.checked');
  });

});