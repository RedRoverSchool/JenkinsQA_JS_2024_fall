/// <reference types="cypress" />
import Header from "../pageObjects/Header";

class SearchResultsPage extends Header{

    getTitle = () => cy.get('div#main-panel h1');
    getNoMatchesErrorMessage = () => cy.get('.error');
    getConfigItem = () => cy.get('#item_config');
    getConfigureItem = () => cy.get('#item_configure');
    getSearchResults = () => cy.get('[id^="item_"]');    

    retrieveSearchResults() {
        return this.getSearchResults().then(($items) => {
            return Cypress._.map($items, (item) => item.innerText.trim());
        });
    };

    fetchAutoCompletionSuggestions() {
        return this.getSearchResults().then(($items) => {
            return Cypress._.map($items, (item) => item.innerText.trim());
        });
    };    
};

export default SearchResultsPage;