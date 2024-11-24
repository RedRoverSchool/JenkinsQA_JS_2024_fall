/// <reference types="cypress" />

class SearchResultsPage {

    getNoMatchesErrorMessage = () => cy.get('.error');

}

export default SearchResultsPage;