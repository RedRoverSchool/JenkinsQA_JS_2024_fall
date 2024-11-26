/// <reference types="cypress" />

import SearchResultsPage from "./SearchResultsPage";

class Header {

    getSearchField = () => cy.get("#search-box");
    getSearchAutoCompletionBox = () => cy.get('div#search-box-completion li');
    getUserDropdownlink = () => cy.get('.login > .model-link > .jenkins-menu-dropdown-chevron') 
    getDropdownConfigureItem = () => cy.get ('.jenkins-dropdown > [href*="/configure"]')

    typeSearchTerm(term) {
        this.getSearchField().type(term);
        return this;
    };

    clickFirstOptionFromACBox() {
        this.getSearchAutoCompletionBox().first().click();
        return this;
    };

    searchTerm() {
        this.getSearchField().type('{enter}');
        return new SearchResultsPage();
    };

    search(input) {
        this.getSearchField().type(`${input}{enter}`);
        return new SearchResultsPage();
    };
    clickUserDropdownLink() {
        this.getUserDropdownlink().click({ force: true }) 
        return this;
    }
    clickUserConfigureItem() {
        this.getDropdownConfigureItem().click({ force: true })
        return this
    }
};
export default Header;