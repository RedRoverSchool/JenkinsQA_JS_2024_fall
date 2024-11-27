/// <reference types="cypress" />

import DashboardPage from "./DashboardPage";

class ManageJenkinsPage{
    getSettingsSearchField = () => cy.get('#settings-search-bar');
    getNoResultsErrorMessage = () => cy.get('.jenkins-search__results__no-results-label');
    getSearchResultList = () => cy.get('.jenkins-search__results > *');

    typeSearchWord(word) {
        this.getSettingsSearchField().type(word);
        return this;
    };
}
export default ManageJenkinsPage
