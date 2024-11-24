/// <reference types="cypress" />

import JobPage from "./JobPage";
import SearchResultsPage from "./SearchResultsPage";

 class Header {

    getSearchField = () => cy.get("#search-box");
    getSearchOption = () => cy.get("#search-box-completion li");
    getSearchResultsContainer = () => cy.get('.yui-ac-content');
    getConfigItem = () => cy.get('#item_config');
    getConfigureItem = () => cy.get('#item_configure');
  

    typeSearchTerm(term) {
        this.getSearchField().type(term);
        return this;
    };
    enterSearchTerm(term) {
        this.getSearchField().type(`${term}{enter}`);
        return this;
      }
    clickSearchOption() {
        this.getSearchOption().first().click();
        return this;
    };

    searchTerm() {
        this.getSearchField().type('{enter}');
        return new JobPage();
    };

    search(input) {
        this.getSearchField().type(`${input}{enter}`);
        return new JobPage();
    };
    verifyResultsExist() {
      this.getSearchResultsContainer().its('length').should('be.greaterThan', 0);
      return new SearchResultsPage;
    }
  
    verifyConfigItemContains(text) {
      this.getConfigItem().should('contain.text', text);
      return new SearchResultsPage;
    }
  
    verifyConfigureItemContains(text) {
      this.getConfigureItem().should('contain.text', text);
      return new SearchResultsPage;
    }
}; 
export default Header;