/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

import DashboardPage from "../pageObjects/DashboardPage";
import ManageJenkinsPage from "../pageObjects/ManageJenkinsPage";

import messages from "../fixtures/messages.json";
import searchResultsData from "../fixtures/searchResultsData.json"
import ConfigurePage from "../pageObjects/ConfigurePage";

const dashboardPage = new DashboardPage();
const manageJenkinsPage = new ManageJenkinsPage();
const configurePage = new ConfigurePage();

const randomSearchWord = faker.animal.type() + faker.finance.accountNumber(3)   
const listOfPossibleSearchResults = ["System", "Tools", "Security", "Credentials", "Credential Providers"]


describe('US_09.001 | Manage Jenkins > Search settings', () =>{

    it('TC_09.001.02 | Verify "No results" is shown if no settings match the search criteria', () => {
        dashboardPage.clickManageJenkins()
        manageJenkinsPage.typeSearchWord(randomSearchWord)
        manageJenkinsPage.getNoResultsErrorMessage()
                         .should('be.visible')
                         .and('have.text', messages.searchSettings.noResultsError)
    })

    it('TC_09.001.03 | Verify search suggestion dropdown displays all matches available', () => {
        dashboardPage.clickManageJenkins();
        manageJenkinsPage.typeSearchWord("t")
                         .getSearchResultList()
                         .should('have.length', listOfPossibleSearchResults.length);
        
        listOfPossibleSearchResults.forEach((dropDownItem) => {
        manageJenkinsPage.getSearchResultList().should('contain', dropDownItem);
        });  
    })

    it('TC_09.001.04 | Search is case-insensitive', () => {
        const assertTools = "'contain', 'Tools'"

        dashboardPage.clickManageJenkins()
        manageJenkinsPage.getSettingsSearchField()
        manageJenkinsPage.typeSearchWord(searchResultsData.text.lowCase)
        manageJenkinsPage.assertSearchResult('Tools')
        manageJenkinsPage.clearSearchField()
        manageJenkinsPage.typeSearchWord(searchResultsData.text.upperCase)
        manageJenkinsPage.assertSearchResult('Tools')
        manageJenkinsPage.clearSearchField()
        manageJenkinsPage.typeSearchWord(searchResultsData.text.mixedCase)
        manageJenkinsPage.assertSearchResult('Tools')
        manageJenkinsPage.clearSearchField()
    })
    it('TC_09.001.05 |The search field is cleared by pressing the "x" button', () => {
        dashboardPage.clickManageJenkins()
        manageJenkinsPage.getSettingsSearchField()
        manageJenkinsPage.typeSearchWord(randomSearchWord)
            .getXButtonSearchField()
            .should('have.css', 'opacity', '0')
            .and('have.value', '')
    });
    it('TC_09.001_6 | Verify go to required page by click on required item on search suggestion dropdown.', () => {
        dashboardPage.clickManageJenkins();
       
        let menuItems = [];
        manageJenkinsPage.getMenuItems()
          .each(($el) => {
                menuItems.push($el.text().trim());
          })
          .then(() => {
            cy.wrap(menuItems)
              .then((array) => {       
                    array.forEach((dropDownItem) => {
                        if (dropDownItem !== 'Reload Configuration from Disk') {
                            manageJenkinsPage.typeSearchWord(dropDownItem)    
                                             .clickSearchResult(dropDownItem);
                            cy.contains(`${dropDownItem}`).should('exist');
                            configurePage.clickBreadcrumbsManageJenkins(); 
                        }                  
                    });                
              });       
            });    
           }); 
   
    it('TC_09.002.07 | Verify the search setting tooltip displays on hover', () => {
        dashboardPage.clickManageJenkins();
        const hoverOnSearchShortcut = () => {
            cy.get('.jenkins-search__shortcut')
                .trigger('mouseover')
                .wait(1000);
        };

        hoverOnSearchShortcut();

        const getTooltipElement = () => cy.get('div[tooltip="Press / on your keyboard to focus"]', { timeout: 10000 });

        getTooltipElement()
            .should('be.visible')
    });

});   