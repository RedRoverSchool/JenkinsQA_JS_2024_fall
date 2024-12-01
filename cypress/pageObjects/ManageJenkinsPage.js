/// <reference types="cypress" />

class ManageJenkinsPage {

    getSettingsSearchField = () => cy.get('#settings-search-bar');
    getNoResultsErrorMessage = () => cy.get('.jenkins-search__results__no-results-label');
    getSearchResultList = () => cy.get('.jenkins-search__results > *');
    getXButtonSearchField =()=>cy.get('.jenkins-search__shortcut');

    typeSearchWord(word) {
        this.getSettingsSearchField().type(word);
        return this;
    };

    clearSearchField() {
        this.getSettingsSearchField().clear();
        return this;
    }

    assertSearchResult(word) {
        this.getSearchResultList().should('contain', word)
        return this

    }
    clickXButtonSearchField() {
        this.getXButtonSearchField().click({ force: true });
        return this; 
      }
};

export default ManageJenkinsPage;