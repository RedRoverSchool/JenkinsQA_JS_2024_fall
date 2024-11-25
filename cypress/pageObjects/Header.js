/// <reference types="cypress" />

import JobPage from "./JobPage";
import SearchResultsPage from "./SearchResultsPage";

class Header {

    getSearchField = () => cy.get("#search-box");
    getSearchOption = () => cy.get("#search-box-completion li");
    getSearchResultsContainer = () => cy.get('.yui-ac-content');

    typeSearchTerm(term) {
        this.getSearchField().type(term);
        return this;
    };
    
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
}; 
export default Header;