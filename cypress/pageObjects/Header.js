/// <reference types="cypress" />

import SearchResultsPage from "./SearchResultsPage";
import DashboardPage from './DashboardPage';
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
class Header {

    getSearchField = () => cy.get("#search-box");
    getSearchAutoCompletionBox = () => cy.get('div#search-box-completion li');
    getUserDropdownlink = () => cy.get('#page-header .jenkins-menu-dropdown-chevron');
    getDropdownConfigureItem = () => cy.get('.jenkins-dropdown > [href*="/configure"]');
    getJenkinsLogo = () => cy.get("a#jenkins-home-link");
    getBreadcrumps = () => cy.get(".jenkins-breadcrumbs");
    getSearchAutofillSuggestionList = () => cy.get('li[style]:not([style="display: none;"])');
    getUserNameLink = () => cy.get('[href^="/user"]');
    getUserDropdownMenu= () => cy.get(".jenkins-dropdown");  
    getUserDropdownIcon = () => cy.get(".jenkins-dropdown__item__icon");

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
    
    clickUserName () {
        this.getUserNameLink().click();
        return new UserPage()
    }
    
    verifyAutoCompletionVisible (searchTerm) {
        this.getSearchAutofillSuggestionList().each(($row) => {
            cy.wrap($row).invoke('text').should('contain', searchTerm)
          })
        return this    
    };
    
tabAndClickLogoutButton() {
        const getLogoutButton = 'a[href="/logout"]';
    
        for (let attempts = 0; attempts < 10; attempts++) {
          cy.realPress("Tab");
    
          cy.focused().then(($focusedElement) => {
            if ($focusedElement.is(getLogoutButton)) {
              cy.realPress("Enter");
              return;
            };
          });
        };
        return new LoginPage();
      }
};

export default Header;