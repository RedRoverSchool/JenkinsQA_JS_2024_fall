/// <reference types="cypress" />

class SearchResultsPage {

    getNoMatchesErrorMessage = () => cy.get('.error');
    getConfigItem = () => cy.get('#item_config');
    getConfigureItem = () => cy.get('#item_configure');

}

export default SearchResultsPage;