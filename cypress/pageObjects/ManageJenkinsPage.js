/// <reference types="cypress" />

class ManageJenkinsPage {

    getSettingsSearchField = () => cy.get('#settings-search-bar');
    getNoResultsErrorMessage = () => cy.get('.jenkins-search__results__no-results-label');

    typeSearchWord(word) {
        this.getSettingsSearchField().type(word);
        return this;
    };

};

export default ManageJenkinsPage;