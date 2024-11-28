/// <reference types="cypress" />

import Header from "../pageObjects/Header";
import SearchResuls from "../pageObjects/SearchResultsPage";
import DashboardPage from "../pageObjects/DashboardPage";
import UserPage from "../pageObjects/UserPage";
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FolderPage from "../pageObjects/FolderPage";
import PipelinePage from "../pageObjects/PipelinePage"

import headerData from "../fixtures/headerData.json";
import searchResultsData from "../fixtures/searchResultsData.json";
import messages from "../fixtures/messages.json";
import newJobPageData from "../fixtures/newJobPageData.json";
import configurePageData from "../fixtures/configurePageData.json";

const header = new Header();
const newJobPage = new NewJobPage();
const dashboardPage = new DashboardPage();
const searchResults = new SearchResuls();
const userPage = new UserPage();
const freestyleProjectPage = new FreestyleProjectPage();
const folderPage = new FolderPage();
const pipelinePage = new PipelinePage();

describe('US_14.002 | Header > Search Box', () => {

  it("TC_14.002.05 | User can select suggestion to auto-fill and complete the search",() => {
    dashboardPage.clickNewItemMenuLink()
      .typeNewItemName(newJobPageData.projectName)
      .selectFreestyleProject()
      .clickOKButton();
    freestyleProjectPage.typeJobDescription(configurePageData.projectDescription)
      .clickSaveButton();
    header.typeSearchTerm(newJobPageData.projectName)
      .clickFirstOptionFromACBox()
      .searchTerm();

    freestyleProjectPage.getJobHeadline()
      .should('have.text', newJobPageData.projectName);
  });

  it("TC_14.002.06 | Multiple matches are displayed on the result page", () => {
    header.search("conf");

    searchResults.getConfigItem().should("contain.text", "config");
    searchResults.getConfigureItem().should("contain.text", "configure");
  });

  it("TC_14.002.07 | Verify the search box provides auto-completion", () => {
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
    userPage.checkCheckBox()
       .clickOnSaveBtn();

    header.typeSearchTerm(headerData.search.input.upperCaseMatchForManage);

    header.getSearchAutoCompletionBox()
      .should('have.text', headerData.search.searchSuggestions.manage);
  });

  it("TC_14.002.10 | Verify that the warning message is displayed when no matches are found", () => {
    header.search(headerData.search.input.noMatches);

    searchResults.getNoMatchesErrorMessage()
      .should('have.text', messages.search.noMatchesError);

  });

  it("TC_14.002-08 | Case insensitive search", () => {
    header.clickUserDropdownLink();
    header.clickUserConfigureItem();

    userPage.getInsensitiveSearchLabel().should('contain', 'Insensitive search tool');
    userPage.getInsensitiveSearchCheckBox()
      .should('exist').and('be.checked');
  });

  it("TC_14.002.15 | Verify suggestions in the search box", () => {
    dashboardPage.clickNewItemMenuLink();
    newJobPage
      .typeNewItemName("New Folder TC_14.002.15_A")
      .selectFolder()
      .clickOKButton();
    folderPage.clickSaveBtn()  
      .clickNewItemMenuOption();
    newJobPage
      .typeNewItemName("Project TC_14.002.15_A")
      .selectPipelineProject()
      .clickOKButton();
    pipelinePage.clickOnSaveBtn();
    header.getJenkinsLogo()
    header.typeSearchTerm("Pro")
      .clickFirstOptionFromACBox()
      .typeSearchTerm("{enter}");

    freestyleProjectPage.getJobHeadline().should("have.text", "Project TC_14.002.15_A");
  });
});
