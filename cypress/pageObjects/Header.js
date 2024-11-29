/// <reference types="cypress" />

import SearchResultsPage from "./SearchResultsPage";
import DashboardPage from './DashboardPage';
class Header {

    getSearchField = () => cy.get("#search-box");
    getSearchAutoCompletionBox = () => cy.get('div#search-box-completion li');
    getUserDropdownlink = () => cy.get('#page-header .jenkins-menu-dropdown-chevron');
    getDropdownConfigureItem = () => cy.get('.jenkins-dropdown > [href*="/configure"]');
    getJenkinsLogo = () => cy.get("a#jenkins-home-link");
    getBreadcrumps = () => cy.get(".jenkins-breadcrumbs");
    getSearchAutofillSuggestionList = () => cy.get('li[style]:not([style="display: none;"]');

    typeSearchTerm (term) {
        this.getSearchField().type(term);
        return this;
    };

    clickFirstOptionFromACBox () {
        this.getSearchAutoCompletionBox().first().click();
        return this;
    };

    searchTerm () {
        this.getSearchField().type('{enter}');
        return new SearchResultsPage();
    };

    search (input) {
        this.getSearchField().type(`${input}{enter}`);
        return new SearchResultsPage();
    };

    clickUserDropdownLink () {
        this.getUserDropdownlink().realHover().click();
        return this;
    }

    clickUserConfigureItem () {
        this.getDropdownConfigureItem().click({ force: true });
        return this;
    }

    clickJenkinsLogo () {
        this.getJenkinsLogo().click();
        return new DashboardPage();
    }

    clickDashboardBtn() {
        this.getBreadcrumps().contains('Dashboard').click();
        return this;
    }
   
    verifyAutoCompletionNotVisible () {
        this.getSearchAutoCompletionBox().should('not.be.visible')
        return this
    };
    

};

export default Header;