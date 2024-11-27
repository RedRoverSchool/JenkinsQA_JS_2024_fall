/// <reference types="cypress" />
import DashboardPage from "../pageObjects/DashboardPage";
import ManageJenkinsPage from "../pageObjects/ManageJenkinsPage";
import messages from "../fixtures/messages.json";

import { faker } from '@faker-js/faker';

const randomSearchWord = faker.animal.type() + faker.finance.accountNumber(3)

describe('US_09.001 | Manage Jenkins > Search settings', () =>{

    const dashboardPage = new DashboardPage()
    const manageJenkinsPage = new ManageJenkinsPage()

    it('TC_09.001.01 | "No results" searching', () => {
        cy.get('span.task-link-text').contains('Manage Jenkins')
        .click({force: true})
        cy.get('input.jenkins-search__input').should('be.visible')
        .click()
        .type('q')
        cy.get('p.jenkins-search__results__no-results-label').contains('No results').should('be.visible')
    })

    it('TC_09.001.02 | Verify "No results" is shown if no settings match the search criteria', () => {
        dashboardPage.clickManageJenkins()
        manageJenkinsPage.typeSearchWord(randomSearchWord)
        manageJenkinsPage.getNoResultsErrorMessage()
                         .should('be.visible')
                         .and('have.text', messages.searchSettings.noResultsError)
    })
})

