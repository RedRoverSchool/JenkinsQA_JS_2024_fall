/// <reference types="cypress" />

class SearchResultsPage {

    getTitle = () => cy.get('div#main-panel h1');
    getNoMatchesErrorMessage = () => cy.get('.error');
    getConfigItem = () => cy.get('#item_config');
    getConfigureItem = () => cy.get('#item_configure');

}

export default SearchResultsPage;