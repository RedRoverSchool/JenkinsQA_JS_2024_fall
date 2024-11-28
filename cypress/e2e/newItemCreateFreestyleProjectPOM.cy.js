/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

import DashboardPage from '../pageObjects/DashboardPage';
import NewJobPage from '../pageObjects/NewJobPage';
import FreestyleProjectPage from '../pageObjects/FreestyleProjectPage';
import Header from '../pageObjects/Header';

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();
const header = new Header();

const folderName = faker.commerce.product();

describe('US_00.001 | New item > Create Freestyle Project', function () {

    it('TC_00.001.19 | New freestyle project is created if user enter projects name, choose project type and save it', () => {

        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(folderName)
            .selectFreestyleProject()
            .clickOKButton();
        freestyleProjectPage.clickSaveButton();

        cy.url().should('include', folderName);
        freestyleProjectPage.getJobHeadline()
            .should('be.visible')
            .and('have.text', folderName);

    });


    it('TC_00.001.10 | Create Freestyle Project using the "New Item" button', function () {
        
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(folderName)
            .selectFreestyleProject()
            .clickOKButton();

        freestyleProjectPage.clickSaveButton();
        header.clickJenkinsLogo();

        dashboardPage.getProjectName().should('contain', folderName);

    });

});